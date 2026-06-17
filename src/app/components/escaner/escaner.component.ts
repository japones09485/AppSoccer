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

@Component({
  selector: 'app-escaner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './escaner.component.html',
  styleUrl: './escaner.component.scss'
})
export class EscanerComponent implements OnDestroy {
  @ViewChild('videoEl')      videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('archivoInput') archivoRef!: ElementRef<HTMLInputElement>;
  @Output() datosConfirmados = new EventEmitter<DatosCedula>();

  estado    = signal<Estado>('inicio');
  datos     = signal<DatosCedula | null>(null);
  tipoError = signal<TipoError>('generico');
  preview   = signal<string | null>(null);
  verJson   = signal(false);

  private stream: MediaStream | null = null;
  private canvas = document.createElement('canvas');
  private ctx    = this.canvas.getContext('2d')!;

  constructor(private parser: CedulaParserService) {}

  // ── OPCIÓN 1: TOMAR FOTO ──────────────────────────────────────
  async activarCamara() {
    this.estado.set('camara');
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
    } catch (e: any) {
      console.error('[Escaner] Error cámara:', e);
      this.tipoError.set('generico');
      this.estado.set('error');
    }
  }

  async capturar() {
    const video = this.videoRef.nativeElement;
    const w = video.videoWidth, h = video.videoHeight;
    if (!w || !h) return;

    this.canvas.width = w; this.canvas.height = h;
    this.ctx.drawImage(video, 0, 0, w, h);
    this.pararCamara();

    this.canvas.toBlob(async (blob) => {
      if (!blob) { this.tipoError.set('generico'); this.estado.set('error'); return; }
      if (this.preview()) URL.revokeObjectURL(this.preview()!);
      this.preview.set(URL.createObjectURL(blob));
      this.estado.set('procesando');
      await this.procesarBlob(blob);
    }, 'image/jpeg', 0.97);
  }

  cancelarCamara() {
    this.pararCamara();
    this.estado.set('inicio');
  }

  private pararCamara() {
    if (this.stream) { this.stream.getTracks().forEach(t => t.stop()); this.stream = null; }
  }

  // ── OPCIÓN 2: CARGAR FOTO ─────────────────────────────────────
  cargarArchivo() { this.archivoRef.nativeElement.click(); }

  async onArchivoSeleccionado(event: Event) {
    const input = event.target as HTMLInputElement;
    const file  = input.files?.[0];
    if (!file) return;
    input.value = '';

    if (this.preview()) URL.revokeObjectURL(this.preview()!);
    this.preview.set(URL.createObjectURL(file));
    this.estado.set('procesando');
    await this.procesarBlob(file);
  }

  // ── PROCESAMIENTO ─────────────────────────────────────────────
  private async procesarBlob(blob: Blob) {
    try {
      const raw = await this.leerBarcode(blob);
      if (!raw) { this.tipoError.set('sin-codigo'); this.estado.set('error'); return; }

      const datos = this.parser.desdePDF417(raw);
      if (!datos || !datos.numeroCedula) {
        this.tipoError.set('codigo-invalido'); this.estado.set('error'); return;
      }

      this.verJson.set(false);
      this.datos.set(datos);
      this.estado.set('resultado');
    } catch (e) {
      console.error('[Escaner] procesarBlob:', e);
      this.tipoError.set('generico');
      this.estado.set('error');
    }
  }

  private async leerBarcode(blob: Blob): Promise<string | null> {
    const opts = { formats: ['PDF417'] as any, tryHarder: true, tryRotate: true };

    // Intento 1: blob completo (tryRotate prueba 0°/90°/180°/270° internamente)
    const r1 = await readBarcodes(blob, opts);
    const t1  = r1.find(r => r.text)?.text ?? null;
    if (t1) return t1;

    const img = await createImageBitmap(blob);
    const ow = img.width, oh = img.height;

    // Intentos 2-7: orientación 0° y 90° × 3 recortes.
    // El stream de video captura en dimensiones raw del sensor (landscape),
    // aunque el teléfono esté en portrait, dejando el PDF417 rotado 90°.
    for (const angulo of [0, 90]) {
      const w = angulo === 0 ? ow : oh;
      const h = angulo === 0 ? oh : ow;

      this.canvas.width = w; this.canvas.height = h;
      this.ctx.save();
      this.ctx.translate(w / 2, h / 2);
      this.ctx.rotate(angulo * Math.PI / 180);
      this.ctx.drawImage(img, -ow / 2, -oh / 2, ow, oh);
      this.ctx.restore();

      const frame = await createImageBitmap(this.canvas, 0, 0, w, h);

      for (const [sy, sh] of [
        [0, h],
        [0, Math.floor(h * 0.6)],
        [Math.floor(h * 0.4), Math.floor(h * 0.6)],
      ] as [number, number][]) {
        this.canvas.width = w; this.canvas.height = sh;
        this.ctx.drawImage(frame, 0, sy, w, sh, 0, 0, w, sh);
        const r = await readBarcodes(this.ctx.getImageData(0, 0, w, sh), opts);
        const t = r.find(x => x.text)?.text ?? null;
        if (t) return t;
      }
    }
    return null;
  }

  // ── ACCIONES DE RESULTADO ─────────────────────────────────────
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

  private tick(ms: number): Promise<void> {
    return new Promise(r => setTimeout(r, ms));
  }
}
