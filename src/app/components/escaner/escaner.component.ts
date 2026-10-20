import {
  Component, ElementRef, OnDestroy, signal,
  ViewChild, Output, EventEmitter
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { prepareZXingModule, readBarcodes } from 'zxing-wasm/reader';
import { CedulaParserService, DatosCedula } from '../../services/cedula-parser.service';

prepareZXingModule({
  overrides: {
    locateFile: (path: string) => {
      const base = (document.querySelector('base') as HTMLBaseElement)?.href ?? '/';
      return `${base}assets/${path}`;
    }
  }
});

type Estado    = 'inicio' | 'camara' | 'procesando' | 'resultado' | 'error';
type TipoError = 'sin-codigo' | 'codigo-invalido' | 'generico';

function extraerTexto(r: any): string | null {
  if (r?.text?.length) return r.text as string;
  if (r?.bytes?.length) {
    try { return new TextDecoder('iso-8859-1').decode(r.bytes as Uint8Array); } catch {}
    try { return String.fromCharCode(...(r.bytes as Uint8Array)); } catch {}
  }
  return null;
}

function primerTexto(resultados: any[]): string | null {
  for (const r of resultados) {
    const t = extraerTexto(r);
    if (t) return t;
  }
  return null;
}

// ── Opciones zxing ────────────────────────────────────────────────────────────
// tryDownscale:false evita doble reducción (ya escalamos nosotros antes).
// Tres binarizadores: LocalAverage (default), GlobalHistogram (fondo uniforme),
// FixedThreshold (umbral fijo — útil en cédulas con fondo crema parejo).

const BASE = { tryInvert: false, tryDownscale: false, textMode: 'Plain' as any };

const OPTS_RAPIDO_LA = { formats: ['PDF417'] as any, tryHarder: false, tryRotate: false, binarizer: 'LocalAverage'   as any, ...BASE };
const OPTS_RAPIDO_GH = { formats: ['PDF417'] as any, tryHarder: false, tryRotate: false, binarizer: 'GlobalHistogram' as any, ...BASE };
const OPTS_MEDIO_LA  = { formats: ['PDF417'] as any, tryHarder: true,  tryRotate: false, binarizer: 'LocalAverage'   as any, ...BASE };
const OPTS_MEDIO_GH  = { formats: ['PDF417'] as any, tryHarder: true,  tryRotate: false, binarizer: 'GlobalHistogram' as any, ...BASE };
const OPTS_MEDIO_FT  = { formats: ['PDF417'] as any, tryHarder: true,  tryRotate: false, binarizer: 'FixedThreshold'  as any, ...BASE };
const OPTS_FULL_LA   = { formats: ['PDF417'] as any, tryHarder: true,  tryRotate: true,  binarizer: 'LocalAverage'   as any, ...BASE };
const OPTS_FULL_GH   = { formats: ['PDF417'] as any, tryHarder: true,  tryRotate: true,  binarizer: 'GlobalHistogram' as any, ...BASE };
const OPTS_TODOS     = { formats: [] as any,          tryHarder: true,  tryRotate: true,  tryDownscale: false, textMode: 'Plain' as any };
const OPTS_ERRORES   = { formats: ['PDF417'] as any, tryHarder: true,  tryRotate: true,  returnErrors: true,  textMode: 'Plain' as any };

// ── Intervalo de escaneo adaptativo ──────────────────────────────────────────
// BarcodeDetector nativo tarda <5ms → podemos correr a ~30fps (33ms).
// zxing-wasm puede tardar 100-400ms → limitamos a 5fps (200ms) para no
// bloquear el hilo principal y que la UI siga respondiendo.
const GAP_NATIVE_MS = 33;   // ~30 fps — BarcodeDetector nativo
const GAP_WASM_MS   = 200;  // ~5 fps  — zxing-wasm

@Component({
  selector: 'app-escaner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './escaner.component.html',
  styleUrl: './escaner.component.scss'
})
export class EscanerComponent implements OnDestroy {
  @ViewChild('videoEl')       videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('archivoInput')  archivoRef!: ElementRef<HTMLInputElement>;
  @ViewChild('fotoInput')     fotoRef!: ElementRef<HTMLInputElement>;
  @Output() datosConfirmados = new EventEmitter<DatosCedula>();

  estado      = signal<Estado>('inicio');
  datos       = signal<DatosCedula | null>(null);
  tipoError   = signal<TipoError>('generico');
  preview     = signal<string | null>(null);
  verJson     = signal(false);
  detectado   = signal(false);
  mostrarHint = signal(false);
  motorActivo = signal<'nativo' | 'wasm' | null>(null);
  tema        = signal<'dark' | 'light'>('light');
  readonly esMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  private stream: MediaStream | null = null;
  private canvas = document.createElement('canvas');
  private ctx    = this.canvas.getContext('2d')!;

  private rafHandle: number | null = null;
  private isScanning   = false;
  private lastScanMs   = 0;
  private scanAttempts = 0;

  private nativeDetector: any = null;
  private nativeReady = false;

  constructor(private parser: CedulaParserService) {
    this.initNativeDetector();
    // Leer preferencia del sistema operativo
    // Tema inicia siempre en claro; el usuario puede cambiarlo con el botón.
  }

  toggleTema() {
    this.tema.set(this.tema() === 'dark' ? 'light' : 'dark');
  }

  // "Tomar foto" — abre la cámara nativa del dispositivo directamente.
  // La app no guarda nada: el blob vive solo en memoria durante el procesamiento.
  tomarFoto() { this.fotoRef.nativeElement.click(); }

  async onFotoTomada(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const file  = input.files?.[0];
    if (!file) return;
    input.value = '';
    if (this.preview()) URL.revokeObjectURL(this.preview()!);
    this.preview.set(URL.createObjectURL(file));
    this.estado.set('procesando');
    await this.procesarBlob(file);
  }

  // ── Inicialización BarcodeDetector ───────────────────────────────────────
  private async initNativeDetector() {
    if (!('BarcodeDetector' in window)) return;
    try {
      const BD = (window as any).BarcodeDetector;
      const supported: string[] = await BD.getSupportedFormats();
      // El formato se llama 'pdf_417' en Android Chrome
      const fmt = supported.find(f => f.toLowerCase().replace(/_/g, '') === 'pdf417');
      if (fmt) {
        this.nativeDetector = new BD({ formats: [fmt] });
        this.nativeReady    = true;
      }
    } catch {}
  }

  // ── Intervalo adaptativo ─────────────────────────────────────────────────
  private get gapMs(): number {
    return this.nativeReady ? GAP_NATIVE_MS : GAP_WASM_MS;
  }

  // ── CÁMARA ───────────────────────────────────────────────────────────────
  async activarCamara() {
    this.estado.set('camara');
    this.scanAttempts = 0;
    this.isScanning   = false;
    this.mostrarHint.set(false);
    this.detectado.set(false);
    this.motorActivo.set(null);
    await this.tick(80);
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width:  { ideal: 1920, min: 640 },
          height: { ideal: 1080, min: 480 }
        }
      });
      const video = this.videoRef.nativeElement;
      video.srcObject = this.stream;
      video.setAttribute('playsinline', '');
      video.muted = true;
      await video.play();
      await this.esperarVideo(video);
      this.motorActivo.set(this.nativeReady ? 'nativo' : 'wasm');
      this.arrancarLoop();
    } catch {
      this.tipoError.set('generico');
      this.estado.set('error');
    }
  }

  private async esperarVideo(v: HTMLVideoElement): Promise<void> {
    const t0 = Date.now();
    while ((!v.videoWidth || !v.videoHeight) && Date.now() - t0 < 5000) {
      await this.tick(80);
    }
  }

  // ── RAF LOOP ─────────────────────────────────────────────────────────────
  private arrancarLoop() {
    this.pararLoop();
    const tick = () => {
      if (this.estado() !== 'camara') return;
      const now = Date.now();
      if (!this.isScanning && now - this.lastScanMs >= this.gapMs) {
        this.isScanning = true;
        this.lastScanMs = now;
        this.escanearFrame();
      }
      this.rafHandle = requestAnimationFrame(tick);
    };
    this.rafHandle = requestAnimationFrame(tick);
  }

  private pararLoop() {
    if (this.rafHandle !== null) { cancelAnimationFrame(this.rafHandle); this.rafHandle = null; }
    this.isScanning = false;
  }

  // ── ESCANEAR FRAME ───────────────────────────────────────────────────────
  private async escanearFrame() {
    const video = this.videoRef?.nativeElement;
    if (!video || !video.videoWidth || this.estado() !== 'camara') {
      this.isScanning = false; return;
    }
    try {
      // ── Capa 1: BarcodeDetector nativo ───────────────────────────────────
      // Android Chrome: ~30fps, hardware-acelerado, mismo motor que el APK
      if (this.nativeReady && this.nativeDetector) {
        const hits: any[] = await this.nativeDetector.detect(video);
        const raw = hits.find(h => h.rawValue)?.rawValue ?? null;
        if (raw && this.estado() === 'camara') {
          this.pararLoop();
          await this.onDetectado(raw, video);
          return;
        }
        // Si el nativo no encontró nada, no correr zxing-wasm en el mismo frame
        // (evita bloquear el hilo en Android donde el nativo ya es suficiente)
        this.scanAttempts++;
        this.isScanning = false;
        return;
      }

      // ── Capa 2: zxing-wasm (iOS Safari, desktop, browsers sin BarcodeDetector)
      const vw = video.videoWidth, vh = video.videoHeight;
      const raw = await this.escanearConCrops(video, vw, vh);
      if (raw && this.estado() === 'camara') {
        this.pararLoop();
        await this.onDetectado(raw, video);
        return;
      }
      this.scanAttempts++;
      if (this.scanAttempts >= 12 && !this.mostrarHint()) this.mostrarHint.set(true);
    } catch {}
    this.isScanning = false;
  }

  // ── ESTRATEGIAS DE CROP PARA zxing-wasm ─────────────────────────────────
  private async escanearConCrops(
    source: HTMLVideoElement | HTMLImageElement | ImageBitmap,
    vw: number, vh: number,
    maxEffort = false
  ): Promise<string | null> {
    const MAX_W  = 1280;
    const hard   = maxEffort || this.scanAttempts >= 4;
    const rotate = maxEffort || this.scanAttempts >= 10;

    // A: franja inferior 55% (desde y=45%) — cédula centrada en pantalla
    {
      const sy = Math.floor(vh * 0.45);
      const sh = vh - sy;
      const sc = Math.min(1, MAX_W / vw);
      const dw = Math.floor(vw * sc), dh = Math.floor(sh * sc);
      this.canvas.width = dw; this.canvas.height = dh;
      this.ctx.drawImage(source as any, 0, sy, vw, sh, 0, 0, dw, dh);
      const id = this.ctx.getImageData(0, 0, dw, dh);
      const r1 = await readBarcodes(id, hard ? OPTS_MEDIO_LA : OPTS_RAPIDO_LA);
      const t1 = primerTexto(r1); if (t1) return t1;
      const r2 = await readBarcodes(id, hard ? OPTS_MEDIO_GH : OPTS_RAPIDO_GH);
      const t2 = primerTexto(r2); if (t2) return t2;
    }

    // B: frame completo a 1280px
    {
      const sc = Math.min(1, MAX_W / vw);
      const dw = Math.floor(vw * sc), dh = Math.floor(vh * sc);
      this.canvas.width = dw; this.canvas.height = dh;
      this.ctx.drawImage(source as any, 0, 0, vw, vh, 0, 0, dw, dh);
      const id = this.ctx.getImageData(0, 0, dw, dh);
      const opts = rotate ? OPTS_FULL_LA : hard ? OPTS_MEDIO_LA : OPTS_RAPIDO_LA;
      const r1 = await readBarcodes(id, opts);
      const t1 = primerTexto(r1); if (t1) return t1;
      if (hard) {
        const r2 = await readBarcodes(id, rotate ? OPTS_FULL_GH : OPTS_MEDIO_GH);
        const t2 = primerTexto(r2); if (t2) return t2;
      }
    }

    // C: franja inferior 30% con zoom 2× (difícil: barcodes pequeños/dañados)
    if (hard) {
      const sy = Math.floor(vh * 0.70);
      const sh = vh - sy;
      const dw = Math.min(vw * 2, 2048), dh = Math.floor(sh * (dw / vw));
      this.canvas.width = dw; this.canvas.height = dh;
      this.ctx.drawImage(source as any, 0, sy, vw, sh, 0, 0, dw, dh);
      const id = this.ctx.getImageData(0, 0, dw, dh);
      const r1 = await readBarcodes(id, OPTS_FULL_LA);
      const t1 = primerTexto(r1); if (t1) return t1;
      const r2 = await readBarcodes(id, OPTS_MEDIO_FT);
      const t2 = primerTexto(r2); if (t2) return t2;
    }

    return null;
  }

  // ── DETECTADO (flash verde + snapshot) ───────────────────────────────────
  private async onDetectado(raw: string, video: HTMLVideoElement) {
    this.detectado.set(true);
    const vw = video.videoWidth, vh = video.videoHeight;
    this.canvas.width = vw; this.canvas.height = vh;
    this.ctx.drawImage(video, 0, 0, vw, vh);
    this.pararCamara();
    await this.tick(420);
    this.detectado.set(false);
    this.canvas.toBlob(blob => {
      if (blob) {
        if (this.preview()) URL.revokeObjectURL(this.preview()!);
        this.preview.set(URL.createObjectURL(blob));
      }
      this.estado.set('procesando');
      this.procesarTexto(raw);
    }, 'image/jpeg', 0.95);
  }

  // ── CAPTURA MANUAL ───────────────────────────────────────────────────────
  async capturar() {
    this.pararLoop();
    const video = this.videoRef.nativeElement;
    const w = video.videoWidth, h = video.videoHeight;
    if (!w || !h) return;
    this.canvas.width = w; this.canvas.height = h;
    this.ctx.drawImage(video, 0, 0, w, h);
    this.pararCamara();
    this.canvas.toBlob(async blob => {
      if (!blob) { this.tipoError.set('generico'); this.estado.set('error'); return; }
      if (this.preview()) URL.revokeObjectURL(this.preview()!);
      this.preview.set(URL.createObjectURL(blob));
      this.estado.set('procesando');
      await this.procesarBlob(blob);
    }, 'image/jpeg', 0.97);
  }

  cancelarCamara() { this.pararCamara(); this.estado.set('inicio'); }

  private pararCamara() {
    this.pararLoop();
    this.motorActivo.set(null);
    if (this.stream) { this.stream.getTracks().forEach(t => t.stop()); this.stream = null; }
  }

  // ── ARCHIVO ──────────────────────────────────────────────────────────────
  cargarArchivo() { this.archivoRef.nativeElement.click(); }

  async onArchivoSeleccionado(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const file  = input.files?.[0];
    if (!file) return;
    input.value = '';
    if (this.preview()) URL.revokeObjectURL(this.preview()!);
    this.preview.set(URL.createObjectURL(file));
    this.estado.set('procesando');
    await this.procesarBlob(file);
  }

  // ── PROCESAMIENTO ────────────────────────────────────────────────────────
  private async procesarTexto(raw: string) {
    try {
      const datos = this.parser.desdePDF417(raw);
      if (!datos?.numeroCedula) {
        this.tipoError.set('codigo-invalido');
        this.estado.set('error');
        return;
      }
      this.verJson.set(false);
      this.datos.set(datos);
      this.estado.set('resultado');
    } catch {
      this.tipoError.set('generico');
      this.estado.set('error');
    }
  }

  private async procesarBlob(blob: Blob) {
    try {
      const raw = await this.leerBarcode(blob);
      if (!raw) { this.tipoError.set('sin-codigo'); this.estado.set('error'); return; }
      await this.procesarTexto(raw);
    } catch {
      this.tipoError.set('generico');
      this.estado.set('error');
    }
  }

  // ── LECTURA DE FOTO (upload / captura manual) ────────────────────────────
  private async leerBarcode(blob: Blob): Promise<string | null> {
    // 1. Intentar con BarcodeDetector nativo si está disponible
    //    (funciona con Blob/File directamente en Android Chrome)
    if (this.nativeReady && this.nativeDetector) {
      try {
        const hits: any[] = await this.nativeDetector.detect(await createImageBitmap(blob));
        const raw = hits.find(h => h.rawValue)?.rawValue ?? null;
        if (raw) return raw;
      } catch {}
    }

    // 2. zxing-wasm: blob completo, 3 binarizadores
    { const r = await readBarcodes(blob, OPTS_FULL_LA);   const t = primerTexto(r); if (t) return t; }
    { const r = await readBarcodes(blob, OPTS_FULL_GH);   const t = primerTexto(r); if (t) return t; }
    { const r = await readBarcodes(blob, OPTS_MEDIO_FT);  const t = primerTexto(r); if (t) return t; }
    { const r = await readBarcodes(blob, OPTS_TODOS);     const t = primerTexto(r); if (t) return t; }

    // 3. Crops orientados al barcode (maxEffort=true: todas las estrategias)
    const img = await createImageBitmap(blob);
    const ow = img.width, oh = img.height;
    { const t = await this.escanearConCrops(img as any, ow, oh, true); if (t) return t; }

    // 4. Rotación 90° (foto tomada en portrait con la cédula girada)
    {
      const w = oh, h = ow;
      this.canvas.width = w; this.canvas.height = h;
      this.ctx.save();
      this.ctx.translate(w / 2, h / 2);
      this.ctx.rotate(Math.PI / 2);
      this.ctx.drawImage(img, -ow / 2, -oh / 2, ow, oh);
      this.ctx.restore();
      const bmp = await createImageBitmap(this.canvas, 0, 0, w, h);
      const t = await this.escanearConCrops(bmp as any, w, h, true);
      if (t) return t;
    }

    // 5. Último recurso: returnErrors=true para cédulas con daño parcial
    {
      const r = await readBarcodes(blob, OPTS_ERRORES);
      for (const res of r) {
        const t = extraerTexto(res);
        if (t && t.length >= 8 && /\d/.test(t)) return t;
      }
    }

    return null;
  }

  // ── RESULTADO ────────────────────────────────────────────────────────────
  reiniciar() {
    this.pararCamara();
    if (this.preview()) { URL.revokeObjectURL(this.preview()!); this.preview.set(null); }
    this.datos.set(null);
    this.verJson.set(false);
    this.estado.set('inicio');
  }

  confirmar() {
    const d = this.datos();
    if (d) this.datosConfirmados.emit(d);
  }

  jsonDatos(): string {
    const d = this.datos();
    if (!d) return '{}';
    const { rawData: _, ...rest } = d;
    return JSON.stringify(rest, null, 2);
  }

  ngOnDestroy() { this.pararCamara(); }

  get iniciales(): string {
    const d = this.datos();
    if (!d) return '';
    return (d.primerNombre[0] ?? '') + (d.primerApellido[0] ?? '');
  }

  private tick(ms: number): Promise<void> { return new Promise(r => setTimeout(r, ms)); }
}
