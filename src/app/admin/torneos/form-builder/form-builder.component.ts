import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';

interface Campo {
  id?: number;
  fk_formulario?: number;
  tipo: string;
  orden: number;
  label: string;
  descripcion: string;
  opciones: string[];
  requerido: boolean;
  placeholder: string;
}

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-builder.component.html',
})
export class FormBuilderComponent implements OnInit, AfterViewInit {
  @Input() idFormulario!: number;
  @ViewChild('descTA') private descTA!: ElementRef<HTMLTextAreaElement>;

  formulario: any = null;
  cargando = true;
  guardando = false;
  campos: Campo[] = [];
  posMap: { [id: number]: number } = {};

  config = { titulo: '', descripcion: '', activo: 1 };
  imagenPreview: string | null = null;
  subiendoImagen = false;
  readonly urlBase = environment.apiURL;

  campoEdit: Partial<Campo> | null = null;
  editId: number | null = null;
  guardandoCampo = false;
  mostrarTipos = false;

  modoOrden = false;
  camposOrden: Campo[] = [];
  guardandoOrden = false;

  readonly tipos = [
    { key: 'info',     icon: 'fa-info-circle',    label: 'Información',      sub: 'Texto o aviso sin respuesta'     },
    { key: 'texto',    icon: 'fa-pencil',          label: 'Pregunta abierta', sub: 'El usuario escribe su respuesta' },
    { key: 'checkbox', icon: 'fa-check-square-o',  label: 'Opción múltiple',  sub: 'Puede marcar varias opciones'    },
    { key: 'radio',    icon: 'fa-dot-circle-o',    label: 'Selección única',  sub: 'Solo puede elegir una opción'    },
    { key: 'archivo',  icon: 'fa-paperclip',       label: 'Subir archivo',    sub: 'Imagen o documento adjunto'      },
    { key: 'terms',    icon: 'fa-handshake-o',     label: 'Aceptación',       sub: 'Checkbox de términos o aviso'    },
  ];

  constructor(private api: ApiService) {}

  ngOnInit() { this.cargar(); }

  ngAfterViewInit() {
    setTimeout(() => this.resizeDesc());
  }

  autoResize(el: HTMLTextAreaElement) {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }

  private resizeDesc() {
    if (this.descTA?.nativeElement) this.autoResize(this.descTA.nativeElement);
  }

  cargar() {
    this.cargando = true;
    this.api.get_formulario_by_id(this.idFormulario).subscribe({
      next: (res: any) => {
        this.cargando = false;
        this.formulario = res.formulario ?? null;
        if (this.formulario) {
          this.config.titulo      = this.formulario.titulo      ?? '';
          this.config.descripcion = this.formulario.descripcion ?? '';
          this.config.activo      = +(this.formulario.activo    ?? 0);
          this.imagenPreview      = this.formulario.imagen_cabecera
            ? this.urlBase + this.formulario.imagen_cabecera
            : null;
          this._setCampos(this.formulario.campos ?? []);
          setTimeout(() => this.resizeDesc());
        }
      },
      error: () => { this.cargando = false; }
    });
  }

  private _setCampos(lista: Campo[]) {
    this.campos = lista;
    this.posMap = {};
    lista.forEach((c, i) => { if (c.id) this.posMap[c.id] = i + 1; });
  }

  guardarHeader() {
    if (!this.config.titulo.trim()) {
      Swal.fire({ icon: 'warning', title: 'El título es obligatorio', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
      return;
    }
    this.guardando = true;
    this.api.update_formulario({
      id:           this.formulario.id,
      titulo:       this.config.titulo,
      descripcion:  this.config.descripcion,
      activo:       this.config.activo,
      link_pago:    this.formulario.link_pago    ?? '',
      whatsapp:     this.formulario.whatsapp     ?? '',
      categorias:   this.formulario.categorias   ?? '[]',
      valor_abono:  this.formulario.valor_abono  ?? '',
      incluir_hotel: this.formulario.incluir_hotel ?? 0,
    }).subscribe({
      next: (res: any) => {
        this.guardando = false;
        if (res.success) Swal.fire({ icon: 'success', title: 'Guardado', toast: true, position: 'top-end', showConfirmButton: false, timer: 1500 });
      },
      error: () => { this.guardando = false; }
    });
  }

  // ── Bloques ──────────────────────────────────────────────────────────────

  abrirTipo(key: string) {
    this.mostrarTipos = false;
    const maxOrden = this.campos.length > 0 ? Math.max(...this.campos.map(c => c.orden)) : 0;
    this.editId = null;
    this.campoEdit = {
      tipo: key, orden: maxOrden + 10,
      label: '', descripcion: '',
      opciones: (key === 'checkbox' || key === 'radio') ? [''] : [],
      requerido: false, placeholder: '',
    };
  }

  editarCampo(c: Campo) {
    this.mostrarTipos = false;
    this.editId = c.id ?? null;
    this.campoEdit = { ...c, opciones: [...(c.opciones ?? [])] };
  }

  cambiarTipo(key: string) {
    if (!this.campoEdit) return;
    const necesitaOpciones = key === 'checkbox' || key === 'radio';
    const teniaopciones = this.campoEdit.tipo === 'checkbox' || this.campoEdit.tipo === 'radio';
    this.campoEdit.tipo = key;
    if (necesitaOpciones && !teniaopciones) this.campoEdit.opciones = [''];
    if (!necesitaOpciones) this.campoEdit.opciones = [];
  }

  cancelar() { this.campoEdit = null; this.editId = null; }

  // ── Imagen cabecera ─────────────────────────────────────────────────────

  onImagenSeleccionada(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => { this.imagenPreview = e.target?.result as string; };
    reader.readAsDataURL(file);
    this.subiendoImagen = true;
    this.api.upload_imagen_cabecera(this.formulario.id, file).subscribe({
      next: (res: any) => {
        this.subiendoImagen = false;
        if (res.success) {
          this.formulario.imagen_cabecera = res.ruta;
          this.imagenPreview = this.urlBase + res.ruta;
          Swal.fire({ icon: 'success', title: 'Imagen guardada', toast: true, position: 'top-end', showConfirmButton: false, timer: 1800 });
        } else {
          Swal.fire({ icon: 'error', title: res.error ?? 'Error al subir imagen', toast: true, position: 'top-end', showConfirmButton: false, timer: 3000 });
          this.imagenPreview = null;
        }
      },
      error: () => { this.subiendoImagen = false; this.imagenPreview = null; }
    });
  }

  quitarImagen() {
    this.imagenPreview = null;
    this.formulario.imagen_cabecera = null;
    this.api.update_formulario({ ...this.formulario, imagen_cabecera: '' }).subscribe();
  }

  guardarCampo() {
    if (!this.campoEdit) return;
    if (this.campoEdit.tipo !== 'info' && !this.campoEdit.label?.trim()) {
      Swal.fire({ icon: 'warning', title: 'El enunciado es obligatorio', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
      return;
    }
    this.guardandoCampo = true;
    const payload = { ...this.campoEdit, fk_formulario: this.formulario.id };
    const obs = this.editId
      ? this.api.update_campo_formulario({ id: this.editId, ...payload })
      : this.api.add_campo_formulario(payload);

    obs.subscribe({
      next: (res: any) => {
        this.guardandoCampo = false;
        this._setCampos(res.campos ?? this.campos);
        this.campoEdit = null;
        this.editId = null;
      },
      error: () => { this.guardandoCampo = false; }
    });
  }

  eliminar(c: Campo) {
    Swal.fire({ title: '¿Eliminar este bloque?', icon: 'warning', showCancelButton: true, confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar' })
      .then(r => {
        if (!r.isConfirmed || !c.id) return;
        this.api.delete_campo_formulario(c.id, this.formulario.id).subscribe((res: any) => {
          if (res.success) this._setCampos(res.campos ?? this.campos);
        });
      });
  }

  // ── Orden inline en tarjeta ───────────────────────────────────────────────

  async onOrdenChange(campo: Campo, nuevaPos: number) {
    const posActual = this.campos.indexOf(campo) + 1;

    if (!nuevaPos || nuevaPos < 1 || nuevaPos > this.campos.length || nuevaPos === posActual) {
      this.posMap[campo.id!] = posActual;
      return;
    }

    const ocupante  = this.campos[nuevaPos - 1];
    const etiqueta1 = campo.label?.trim()    || this.tipoMeta(campo.tipo).label;
    const etiqueta2 = ocupante.label?.trim() || this.tipoMeta(ocupante.tipo).label;

    const r = await Swal.fire({
      title: 'Intercambiar posiciones',
      html: `<b>"${etiqueta1}"</b> pasará a la posición <b>${nuevaPos}</b><br><b>"${etiqueta2}"</b> pasará a la posición <b>${posActual}</b>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, intercambiar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#16a34a',
    });

    if (!r.isConfirmed) {
      this.posMap[campo.id!] = posActual;
      return;
    }

    this.api.swap_campo_orden(campo.id!, ocupante.id!, this.formulario.id)
      .subscribe((res: any) => {
        if (res.success) this._setCampos(res.campos ?? this.campos);
        else this.posMap[campo.id!] = posActual;
      });
  }

  mover(campo: Campo, dir: 'up' | 'down') {
    const idx = this.campos.findIndex(c => c.id === campo.id);
    const si = dir === 'up' ? idx - 1 : idx + 1;
    if (si < 0 || si >= this.campos.length) return;
    const other = this.campos[si];
    this.api.swap_campo_orden(campo.id!, other.id!, this.formulario.id)
      .subscribe((res: any) => { if (res.success) this._setCampos(res.campos ?? this.campos); });
  }

  // ── Modo reordenar ────────────────────────────────────────────────────────

  entrarModoOrden() {
    this.campoEdit = null;
    this.editId = null;
    this.camposOrden = [...this.campos];
    this.modoOrden = true;
  }

  salirModoOrden() {
    this.modoOrden = false;
    this.camposOrden = [];
  }

  moverOrden(idx: number, dir: 'up' | 'down') {
    const to = dir === 'up' ? idx - 1 : idx + 1;
    if (to < 0 || to >= this.camposOrden.length) return;
    const tmp = this.camposOrden[idx];
    this.camposOrden[idx] = this.camposOrden[to];
    this.camposOrden[to] = tmp;
  }

  guardarOrden() {
    this.guardandoOrden = true;
    const payload = this.camposOrden.map((c, i) => ({ id: c.id!, orden: i + 1 }));
    this.api.guardar_orden_campos(this.formulario.id, payload).subscribe({
      next: (res: any) => {
        this.guardandoOrden = false;
        if (res.success) {
          this._setCampos(res.campos ?? this.camposOrden);
          this.modoOrden = false;
          this.camposOrden = [];
        }
      },
      error: () => { this.guardandoOrden = false; }
    });
  }

  agregarOpcion() {
    if (!this.campoEdit) return;
    if (!this.campoEdit.opciones) this.campoEdit.opciones = [];
    this.campoEdit.opciones.push('');
  }

  quitarOpcion(i: number) { this.campoEdit?.opciones?.splice(i, 1); }

  tipoMeta(key: string) { return this.tipos.find(t => t.key === key) ?? this.tipos[1]; }

  trackById(_: number, c: any) { return c.id ?? _; }
  trackByIdx(i: number)        { return i; }
}
