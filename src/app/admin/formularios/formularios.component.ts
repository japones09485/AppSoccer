import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-formularios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formularios.component.html',
})
export class FormulariosComponent implements OnInit {
  formularios: any[] = [];
  cargando = true;

  creando = false;
  nuevoNombre = '';
  guardando = false;

  modalCopiar = false;
  origenSeleccionado: any = null;
  nombreCopia = '';
  copiando = false;

  // ── Resultados ─────────────────────────────────────────────────────────────
  modalResultados = false;
  formularioResultados: any = null;
  camposResultados: any[] = [];
  respuestasResultados: any[] = [];
  cargandoResultados = false;
  respuestaDetalle: any = null;
  imagenAmpliada: string | null = null;

  readonly urlBase = environment.apiURL;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() { this.cargar(); }

  cargar() {
    this.cargando = true;
    this.api.get_all_formularios().subscribe({
      next: (res: any) => {
        this.cargando = false;
        this.formularios = (res.formularios ?? []).map((f: any) => ({ ...f, activo: +f.activo }));
      },
      error: () => { this.cargando = false; }
    });
  }

  crear() {
    if (!this.nuevoNombre.trim()) {
      Swal.fire({ icon: 'warning', title: 'Escribe un nombre', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
      return;
    }
    const duplicado = this.formularios.some(f => f.titulo.trim().toLowerCase() === this.nuevoNombre.trim().toLowerCase());
    if (duplicado) {
      Swal.fire({ icon: 'warning', title: 'Ya existe un formulario con ese nombre', toast: true, position: 'top-end', showConfirmButton: false, timer: 2500 });
      return;
    }
    this.guardando = true;
    this.api.crear_formulario({ titulo: this.nuevoNombre.trim() }).subscribe({
      next: (res: any) => {
        this.guardando = false;
        if (res.success && res.formulario) {
          this.creando = false;
          this.nuevoNombre = '';
          this.router.navigate(['/Formulario', res.formulario.id]);
        }
      },
      error: () => { this.guardando = false; }
    });
  }

  editar(id: number) { this.router.navigate(['/Formulario', id]); }

  toggleActivo(f: any) {
    const nuevoEstado = +f.activo ? 0 : 1;
    this.api.toggle_activo_formulario(f.id, nuevoEstado).subscribe((res: any) => {
      if (res.success) f.activo = res.activo;
    });
  }

  copiarLink(f: any) {
    const url = `${window.location.origin}/f/${f.id}`;
    navigator.clipboard.writeText(url).then(() => {
      Swal.fire({ icon: 'success', title: '¡Link copiado!', text: url, toast: true, position: 'top-end', showConfirmButton: false, timer: 3000 });
    });
  }

  eliminar(f: any) {
    Swal.fire({
      title: `¿Eliminar "${f.titulo}"?`,
      text: 'Se eliminarán todos sus bloques. Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc2626',
    }).then(r => {
      if (!r.isConfirmed) return;
      this.api.delete_formulario(f.id).subscribe((res: any) => {
        if (res.success) {
          this.formularios = this.formularios.filter(x => x.id !== f.id);
        } else {
          Swal.fire({ icon: 'error', title: 'No se puede eliminar', text: res.error ?? 'Error desconocido', confirmButtonColor: '#dc2626' });
        }
      });
    });
  }

  // ── Modal copiar ──────────────────────────────────────────────────────────

  abrirModalCopiar() {
    this.origenSeleccionado = null;
    this.nombreCopia = '';
    this.modalCopiar = true;
  }

  cerrarModalCopiar() {
    this.modalCopiar = false;
    this.origenSeleccionado = null;
    this.nombreCopia = '';
  }

  seleccionarOrigen(f: any) {
    this.origenSeleccionado = f;
    this.nombreCopia = 'Copia de ' + f.titulo;
  }

  confirmarCopia() {
    if (!this.origenSeleccionado) {
      Swal.fire({ icon: 'warning', title: 'Selecciona un formulario para copiar', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
      return;
    }
    const nombre = this.nombreCopia.trim();
    if (!nombre) {
      Swal.fire({ icon: 'warning', title: 'Escribe un nombre para el nuevo formulario', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
      return;
    }
    const duplicado = this.formularios.some(f => f.titulo.trim().toLowerCase() === nombre.toLowerCase());
    if (duplicado) {
      Swal.fire({ icon: 'warning', title: 'Ya existe un formulario con ese nombre', toast: true, position: 'top-end', showConfirmButton: false, timer: 2500 });
      return;
    }
    this.copiando = true;
    this.api.clonar_formulario(this.origenSeleccionado.id, nombre).subscribe({
      next: (res: any) => {
        this.copiando = false;
        if (res.success && res.formulario) {
          this.formularios = [res.formulario, ...this.formularios];
          this.cerrarModalCopiar();
          Swal.fire({ icon: 'success', title: '¡Formulario copiado!', text: `"${nombre}" creado como borrador.`, toast: true, position: 'top-end', showConfirmButton: false, timer: 3000 });
        }
      },
      error: () => { this.copiando = false; }
    });
  }

  // ── Modal resultados ──────────────────────────────────────────────────────

  verResultados(f: any) {
    this.formularioResultados = f;
    this.camposResultados = [];
    this.respuestasResultados = [];
    this.respuestaDetalle = null;
    this.imagenAmpliada = null;
    this.cargandoResultados = true;
    this.modalResultados = true;
    this.api.get_respuestas_formulario(f.id).subscribe({
      next: (res: any) => {
        this.cargandoResultados = false;
        if (res.success) {
          this.camposResultados = res.campos ?? [];
          this.respuestasResultados = res.respuestas ?? [];
        }
      },
      error: () => { this.cargandoResultados = false; }
    });
  }

  cerrarResultados() {
    this.modalResultados = false;
    this.formularioResultados = null;
    this.respuestaDetalle = null;
    this.imagenAmpliada = null;
  }

  verDetalle(r: any) { this.respuestaDetalle = r; this.imagenAmpliada = null; }
  volverListado()    { this.respuestaDetalle = null; this.imagenAmpliada = null; }

  eliminarRespuesta(r: any) {
    Swal.fire({
      title: '¿Eliminar esta respuesta?',
      text: `Se eliminará la inscripción de ${r.email}. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc2626',
    }).then(res => {
      if (!res.isConfirmed) return;
      this.api.delete_respuesta_formulario(r.id).subscribe((resp: any) => {
        if (resp.success) {
          this.respuestasResultados = this.respuestasResultados.filter(x => x.id !== r.id);
          if (this.formularioResultados) {
            this.formularioResultados = { ...this.formularioResultados, num_respuestas: (this.formularioResultados.num_respuestas ?? 1) - 1 };
          }
        }
      });
    });
  }

  abrirImagen(url: string) { this.imagenAmpliada = url; }
  cerrarImagen()           { this.imagenAmpliada = null; }

  formatValor(valor: any): string {
    if (valor === undefined || valor === null || valor === '') return '—';
    if (Array.isArray(valor)) return valor.length ? valor.join(', ') : '—';
    if (typeof valor === 'object' && valor.nombre) return valor.nombre;
    if (valor === true || valor === 'true') return '✓ Aceptado';
    return String(valor);
  }

  getRuta(valor: any): string | null {
    if (typeof valor === 'object' && valor?.ruta) return this.urlBase + valor.ruta;
    return null;
  }

  getImgSrc(valor: any): string | null {
    if (typeof valor !== 'object' || !valor) return null;
    if (valor.ruta)   return this.urlBase + valor.ruta;
    if (valor.base64) return valor.base64 as string;
    return null;
  }

  isImage(valor: any): boolean {
    if (!valor?.nombre) return false;
    const ext = valor.nombre.split('.').pop()?.toLowerCase() ?? '';
    return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'].includes(ext);
  }

  // ── PDF con diseño SoccerMelgar ──────────────────────────────────────────

  async descargarPDF(r: any) {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
    const pw = 210, ml = 15, mr = 15, cw = pw - ml - mr;

    // Precargar logo y balón
    const base = window.location.origin;
    const [logoImg, balonImg] = await Promise.all([
      this._fetchImgBase64(`${base}/assets/img/logo.png`),
      this._fetchImgBase64(`${base}/assets/img/balon.png`),
    ]);

    // ── HEADER ───────────────────────────────────────────────────────────────
    const hh = 50;

    // Fondo verde oscuro
    doc.setFillColor(20, 83, 45);
    doc.rect(0, 0, pw, hh, 'F');

    // Stripes decorativas lado derecho
    doc.setFillColor(22, 101, 52);
    for (let i = 0; i < 16; i++) {
      doc.rect(pw - 78 + i * 5.5, 0, 3, hh, 'F');
    }

    // Logo SoccerMelgar (izquierda)
    if (logoImg) {
      doc.addImage(logoImg.data, 'PNG', ml, 5, 38, 38, undefined, 'FAST');
    }

    // Balón (extremo derecho, centrado en header)
    if (balonImg) {
      doc.addImage(balonImg.data, 'PNG', pw - mr - 22, (hh - 20) / 2, 20, 20, undefined, 'FAST');
    }

    // Textos header — a la derecha del logo
    const tx = logoImg ? ml + 42 : ml;
    const titleMaxW = pw - tx - mr - (balonImg ? 26 : 4);

    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(134, 239, 172);
    doc.text('FORMULARIO DE INSCRIPCIÓN', tx, 14);

    doc.setFontSize(12.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    const tLines = doc.splitTextToSize(this.formularioResultados?.titulo ?? 'Formulario', titleMaxW);
    doc.text(tLines, tx, 23);

    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(187, 247, 208);
    doc.text('Más que fútbol · soccermelgar.com', tx, hh - 6);

    // ── BANDA INFO ────────────────────────────────────────────────────────────
    let y = hh;
    doc.setFillColor(240, 253, 244);
    doc.rect(0, y, pw, 19, 'F');
    doc.setFillColor(22, 163, 74);
    doc.rect(0, y, 3.5, 19, 'F');

    const ix = ml + 6;
    doc.setFontSize(8); doc.setFont('helvetica', 'bold'); doc.setTextColor(22, 101, 52);
    doc.text('Correo:', ix, y + 7);
    doc.setFont('helvetica', 'normal'); doc.setTextColor(15, 23, 42);
    doc.text(r.email ?? '', ix + 20, y + 7);

    doc.setFont('helvetica', 'bold'); doc.setTextColor(22, 101, 52);
    doc.text('Fecha:', ix, y + 15);
    doc.setFont('helvetica', 'normal'); doc.setTextColor(15, 23, 42);
    doc.text(r.created_at ?? '', ix + 20, y + 15);

    y += 24;

    // ── Separador ─────────────────────────────────────────────────────────────
    doc.setDrawColor(22, 163, 74);
    doc.setLineWidth(0.5);
    doc.line(ml, y, pw - mr, y);
    y += 8;

    // ── CAMPOS ────────────────────────────────────────────────────────────────
    for (const c of this.camposResultados) {

      // Bloque info (aviso)
      if (c.tipo === 'info') {
        if (y > 268) { doc.addPage(); y = this._paginaContinuacion(doc, pw, ml, this.formularioResultados?.titulo, logoImg); }
        doc.setFillColor(239, 246, 255);
        doc.rect(ml, y - 2, cw, 10, 'F');
        doc.setFillColor(59, 130, 246);
        doc.rect(ml, y - 2, 2.5, 10, 'F');
        doc.setFontSize(8); doc.setFont('helvetica', 'italic'); doc.setTextColor(37, 99, 235);
        const iLines = doc.splitTextToSize(c.label ?? '', cw - 6);
        doc.text(iLines, ml + 5, y + 4);
        y += iLines.length * 5 + 7;
        continue;
      }

      if (y > 263) { doc.addPage(); y = this._paginaContinuacion(doc, pw, ml, this.formularioResultados?.titulo, logoImg); }

      const label = (c.label?.trim() || c.tipo).toUpperCase();
      const valor = r.respuestas?.[c.id];

      // Label verde
      doc.setFontSize(7.5); doc.setFont('helvetica', 'bold'); doc.setTextColor(22, 101, 52);
      const lLines = doc.splitTextToSize(label, cw);
      doc.text(lLines, ml, y); y += lLines.length * 4.5 + 1;

      // Valor
      doc.setFont('helvetica', 'normal'); doc.setTextColor(15, 23, 42); doc.setFontSize(9.5);

      if (c.tipo === 'archivo' && (valor?.ruta || valor?.base64)) {
        const imgUrl = valor.ruta ? (this.urlBase + valor.ruta) : null;
        const imgData = imgUrl ? await this._fetchImgBase64(imgUrl) : null;
        if (imgData) {
          if (y + 58 > 270) { doc.addPage(); y = this._paginaContinuacion(doc, pw, ml, this.formularioResultados?.titulo, logoImg); }
          const imgW = Math.min(cw, 90);
          doc.addImage(imgData.data, imgData.fmt, ml, y, imgW, 56, undefined, 'FAST');
          doc.setDrawColor(200, 200, 200); doc.setLineWidth(0.2);
          doc.rect(ml, y, imgW, 56, 'S');
          y += 60;
        } else {
          doc.text(`Archivo: ${valor?.nombre ?? '—'}`, ml, y); y += 6;
        }
      } else {
        const display = this.formatValor(valor);
        const vLines = doc.splitTextToSize(display, cw);
        doc.text(vLines, ml, y); y += vLines.length * 5.5;
      }

      // Línea divisoria sutil
      doc.setDrawColor(220, 252, 231); doc.setLineWidth(0.2);
      doc.line(ml, y + 2, pw - mr, y + 2);
      y += 7;
    }

    doc.save(`respuesta_${r.email}.pdf`);
  }

  private _paginaContinuacion(doc: any, pw: number, ml: number, titulo: string, logoImg: any): number {
    // Barra verde fina en página siguiente
    doc.setFillColor(20, 83, 45);
    doc.rect(0, 0, pw, 12, 'F');
    if (logoImg) {
      doc.addImage(logoImg.data, 'PNG', ml, 1, 10, 10, undefined, 'FAST');
    }
    doc.setTextColor(187, 247, 208);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.text(titulo ?? '', ml + (logoImg ? 13 : 0), 7.5);
    doc.setTextColor(0);
    return 18;
  }

  private async _fetchImgBase64(url: string): Promise<{ data: string; fmt: string } | null> {
    try {
      const resp = await fetch(url);
      if (!resp.ok) return null;
      const blob = await resp.blob();
      const ext  = url.split('.').pop()?.toLowerCase() ?? 'jpg';
      const fmt  = ext === 'png' ? 'PNG' : 'JPEG';
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload  = () => resolve({ data: reader.result as string, fmt });
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(blob);
      });
    } catch { return null; }
  }

  async exportarExcel() {
    if (!this.respuestasResultados.length) return;

    Swal.fire({ title: 'Generando Excel…', text: 'Descargando imágenes, espera un momento.', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

    try {
      const ExcelJSModule = await import('exceljs');
      const ExcelJS = (ExcelJSModule as any).default ?? ExcelJSModule;
      const campos  = this.camposResultados.filter(c => c.tipo !== 'info');

      const wb = new ExcelJS.Workbook();
      const ws = wb.addWorksheet('Respuestas');

      // ── Columnas ──────────────────────────────────────────────────────────────
      const IMG_W_PX = 160;   // píxeles de ancho de imagen en Excel
      const IMG_H_PX = 110;   // píxeles de alto

      ws.columns = [
        { header: 'Email', key: 'email', width: 32 },
        { header: 'Fecha', key: 'fecha', width: 20 },
        ...campos.map(c => ({
          header: c.label?.trim() || `Campo ${c.id}`,
          key: `c_${c.id}`,
          width: c.tipo === 'archivo' ? 22 : 28,
        })),
      ];

      // ── Cabecera verde ────────────────────────────────────────────────────────
      ws.getRow(1).eachCell((cell: any) => {
        cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF059669' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      });
      ws.getRow(1).height = 22;

      // ── Filas de datos (orden cronológico: más antiguo primero) ───────────────
      const respuestasOrdenadas = [...this.respuestasResultados].sort((a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      for (let ri = 0; ri < respuestasOrdenadas.length; ri++) {
        const r        = respuestasOrdenadas[ri];
        const rowIndex = ri + 2;   // fila 1 = cabecera

        const rowData: Record<string, any> = { email: r.email, fecha: r.created_at };
        for (const c of campos) {
          if (c.tipo !== 'archivo') rowData[`c_${c.id}`] = this.formatValor(r.respuestas?.[c.id]);
        }
        const row = ws.addRow(rowData);
        row.alignment = { vertical: 'middle', wrapText: true };

        // ── Campos de archivo ────────────────────────────────────────────────────
        for (let ci = 0; ci < campos.length; ci++) {
          const c        = campos[ci];
          if (c.tipo !== 'archivo') continue;

          const valor    = r.respuestas?.[c.id];
          const colIndex = ci + 3;   // email=1, fecha=2, campos desde col 3

          if (!valor) { row.getCell(colIndex).value = '—'; continue; }

          if (this.isImage(valor)) {
            let base64Str: string | null = null;
            const extRaw  = (valor.nombre as string)?.split('.').pop()?.toLowerCase() ?? 'jpg';
            const extension: 'jpeg' | 'png' | 'gif' =
              extRaw === 'png' ? 'png' : extRaw === 'gif' ? 'gif' : 'jpeg';

            if (valor.base64) {
              const comma = (valor.base64 as string).indexOf(',');
              if (comma !== -1) base64Str = (valor.base64 as string).substring(comma + 1);
            } else if (valor.ruta) {
              try {
                const res: any = await firstValueFrom(this.api.get_archivo_base64(valor.ruta));
                if (res?.ok && res.base64) base64Str = res.base64 as string;
                else console.warn('get_archivo_base64 falló:', res);
              } catch (e) {
                console.error('Error al pedir base64:', e);
              }
            }

            if (base64Str) {
              try {
                const imgId = wb.addImage({ base64: base64Str, extension });
                row.height = IMG_H_PX;
                ws.addImage(imgId, {
                  tl: { col: colIndex - 1, row: rowIndex - 1 } as any,
                  ext: { width: IMG_W_PX, height: IMG_H_PX },
                  editAs: 'oneCell',
                } as any);
              } catch (e) {
                console.error('Error al incrustar imagen en Excel:', e);
                row.getCell(colIndex).value = valor.nombre ?? '—';
              }
            } else {
              row.getCell(colIndex).value = valor.nombre ?? '(imagen no disponible)';
            }

          } else {
            // PDF u otro: hipervínculo
            if (valor.ruta) {
              row.getCell(colIndex).value = { text: valor.nombre ?? valor.ruta, hyperlink: this.urlBase + valor.ruta };
              row.getCell(colIndex).font  = { color: { argb: 'FF2563EB' }, underline: true };
            } else {
              row.getCell(colIndex).value = valor.nombre ?? '—';
            }
          }
        }
      }

      // ── Descargar ──────────────────────────────────────────────────────────────
      const buffer = await wb.xlsx.writeBuffer();
      const blob   = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url    = URL.createObjectURL(blob);
      const a      = document.createElement('a');
      a.href       = url;
      a.download   = `respuestas_${this.formularioResultados?.titulo ?? 'formulario'}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);

      Swal.close();
    } catch (err: any) {
      Swal.fire({ icon: 'error', title: 'Error al generar Excel', text: err?.message ?? String(err) });
    }
  }
}
