import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ciudades',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ciudades.component.html',
})
export class CiudadesComponent implements OnInit {

  departamentos: any[] = [];
  ciudades: any[] = [];

  fk_departamento: number | null = null;
  nombreCiudad: string = '';
  guardando = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.get_departamentos().subscribe((res: any) => {
      this.departamentos = (res.departamentos || [])
        .sort((a: any, b: any) => a.nombre.localeCompare(b.nombre, 'es'));
    });
  }

  onDepartamentoChange() {
    this.ciudades = [];
    if (!this.fk_departamento) return;
    this.api.get_ciudades_by_departamento(this.fk_departamento).subscribe((res: any) => {
      this.ciudades = (res.ciudades || [])
        .sort((a: any, b: any) => a.nombre.localeCompare(b.nombre, 'es'));
    });
  }

  guardar() {
    const nombre = this.nombreCiudad.trim();
    if (!this.fk_departamento || !nombre) {
      Swal.fire('Campos requeridos', 'Seleccione un departamento e ingrese el nombre de la ciudad.', 'warning');
      return;
    }
    this.guardando = true;
    this.api.add_ciudad({ fk_departamento: this.fk_departamento, nombre }).subscribe({
      next: (res: any) => {
        this.guardando = false;
        if (res.success) {
          Swal.fire('¡Guardado!', res.msj || 'Ciudad agregada correctamente.', 'success');
          this.nombreCiudad = '';
          this.onDepartamentoChange();
        } else {
          Swal.fire('Error', res.msj || 'No se pudo guardar.', 'error');
        }
      },
      error: () => {
        this.guardando = false;
        Swal.fire('Error', 'No se pudo conectar con el servidor.', 'error');
      }
    });
  }

  eliminarCiudad(id: number, nombre: string) {
    Swal.fire({
      title: `¿Eliminar "${nombre}"?`,
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc2626',
    }).then(result => {
      if (result.isConfirmed) {
        this.api.delete_ciudad(id).subscribe({
          next: (res: any) => {
            if (res.success) {
              Swal.fire('Eliminada', res.msj || 'Ciudad eliminada.', 'success');
              this.onDepartamentoChange();
            } else {
              Swal.fire('Error', res.msj || 'No se pudo eliminar.', 'error');
            }
          },
          error: () => Swal.fire('Error', 'No se pudo conectar con el servidor.', 'error')
        });
      }
    });
  }
}
