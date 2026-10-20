import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import Swal from 'sweetalert2';
import { ApiService } from "../../services/api.service"
import { Canchas } from '../../interfaces/interfaces';
import { environment } from "../../../environments/environment";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-canchas',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './canchas.component.html',
  styleUrl: './canchas.component.css'
})
export class CanchasComponent implements OnInit {
  canchas: Canchas[] = [];
  canchaSelec!: Canchas;
  creando = false;
  pathIm = environment.apiURL;
  CanchaForm!: FormGroup;
  frmGuardar = new FormData();
  isLoading: boolean = false;
  isEditing: boolean = false;
  editForm: boolean = false;
  idEdit = 0;
  operation = 'add';

  private readonly destroyRef = inject(DestroyRef);

  constructor(private apiRest: ApiService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.apiRest.get_All_canchas()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => { this.canchas = res.canchas; },
        error: () => Swal.fire('Error al cargar las canchas')
      });
  }

  initForm() {
    this.CanchaForm = this.fb.group({
      nombre:      ['', Validators.required],
      descripcion: ['', Validators.required],
      estado:      ['', Validators.required],
    });
  }

  addCancha() { this.creando = true; }

  editCancha(id: number) {
    this.idEdit = id;
    this.operation = 'edit';
    this.apiRest.editCancha(id).subscribe({
      next: (res: any) => {
        this.canchaSelec = res.cancha;
        this.CanchaForm.patchValue({
          nombre:      this.canchaSelec.nombre,
          descripcion: this.canchaSelec.descripcion,
          estado:      this.canchaSelec.estado
        });
        this.creando = true;
        this.editForm = true;
      },
      error: () => Swal.fire('Error al cargar la cancha')
    });
  }

  saveCancha() {
    if (this.CanchaForm.invalid) {
      this.CanchaForm.markAllAsTouched();
      return;
    }
    this.frmGuardar.append('data',      JSON.stringify(this.CanchaForm.value));
    this.frmGuardar.append('operacion', this.operation);
    this.frmGuardar.append('idEdit',    JSON.stringify(this.idEdit));

    this.isLoading = true;
    this.apiRest.add_cancha(this.frmGuardar).subscribe({
      next: (data: any) => {
        this.isLoading = false;
        if (data.success) {
          this.canchas = data.canchas;
          Swal.fire(data.msj);
          this.initForm();
          this.creando = false;
          this.frmGuardar = new FormData();
        } else {
          Swal.fire(data.msj || 'Error al guardar la cancha');
        }
      },
      error: () => {
        this.isLoading = false;
        Swal.fire('Error de conexión. Intenta de nuevo.');
      }
    });
  }

  deleteCancha(id: number) {
    Swal.fire({
      title: '¿Desea eliminar esta cancha?',
      showDenyButton: true,
      confirmButtonText: 'Sí'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiRest.deleteCancha(id).subscribe({
          next: (res: any) => {
            this.canchas = res.canchas;
            Swal.fire(res.msj);
          },
          error: () => Swal.fire('Error al eliminar')
        });
      }
    });
  }

  cancel() {
    this.creando = false;
    this.isEditing = false;
    this.editForm = false;
    this.operation = 'add';
    this.idEdit = 0;
    this.frmGuardar = new FormData();
    this.initForm();
  }
}
