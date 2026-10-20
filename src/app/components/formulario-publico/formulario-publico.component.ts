import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-formulario-publico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-publico.component.html',
})
export class FormularioPublicoComponent implements OnInit {
  cargando = true;
  formulario: any = null;
  campos: any[] = [];
  enviando = false;
  enviado = false;
  error = '';

  readonly urlBase = environment.apiURL;
  email = '';
  respuestas: { [campoId: number]: any } = {};
  archivos:   { [campoId: number]: File }   = {};
  previews:   { [campoId: number]: string } = {};

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('idFormulario'));
    this.api.get_formulario_publico(id).subscribe({
      next: (res: any) => {
        this.cargando = false;
        if (res.success && res.formulario) {
          this.formulario = { ...res.formulario, activo: +res.formulario.activo };
          this.campos = res.formulario.campos ?? [];
        } else {
          this.error = 'Formulario no encontrado.';
        }
      },
      error: () => {
        this.cargando = false;
        this.error = 'No se pudo cargar el formulario.';
      }
    });
  }

  isChecked(campoId: number, opcion: string): boolean {
    const val = this.respuestas[campoId];
    return Array.isArray(val) && val.includes(opcion);
  }

  toggleCheckbox(campoId: number, opcion: string) {
    if (!Array.isArray(this.respuestas[campoId])) this.respuestas[campoId] = [];
    const arr: string[] = this.respuestas[campoId];
    const idx = arr.indexOf(opcion);
    if (idx >= 0) arr.splice(idx, 1);
    else arr.push(opcion);
  }

  onArchivoChange(ev: any, campoId: number) {
    const file: File = ev.target.files?.[0];
    if (!file) return;
    this.archivos[campoId]   = file;
    this.respuestas[campoId] = { nombre: file.name };
    delete this.previews[campoId];
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => { this.previews[campoId] = reader.result as string; };
      reader.readAsDataURL(file);
    }
  }

  quitarArchivo(campoId: number) {
    delete this.archivos[campoId];
    delete this.respuestas[campoId];
    delete this.previews[campoId];
  }

  isImagenNombre(nombre: string): boolean {
    const ext = nombre.split('.').pop()?.toLowerCase() ?? '';
    return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'].includes(ext);
  }

  camposValidos(): boolean {
    if (!this.email.trim()) return false;
    for (const c of this.campos) {
      if (c.tipo === 'info') continue;
      if (c.requerido) {
        const val = this.respuestas[c.id];
        if (val === undefined || val === null || val === '') return false;
        if (Array.isArray(val) && val.length === 0) return false;
      }
    }
    return true;
  }

  enviar() {
    this.error = '';
    if (!this.camposValidos()) {
      this.error = 'Por favor completa todos los campos obligatorios.';
      return;
    }
    this.enviando = true;
    this.api.guardar_respuesta_publica(
      this.formulario.id,
      this.email.trim(),
      JSON.stringify(this.respuestas),
      this.archivos
    ).subscribe({
      next: (res: any) => {
        this.enviando = false;
        if (res.success) {
          this.router.navigate(['/formulario-ok']);
        } else {
          this.error = res.error ?? 'Error al enviar el formulario.';
        }
      },
      error: () => {
        this.enviando = false;
        this.error = 'Error de conexión. Intenta de nuevo.';
      }
    });
  }
}
