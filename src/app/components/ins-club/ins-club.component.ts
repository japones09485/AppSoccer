import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from "../../services/api.service";
import { CommonModule } from '@angular/common';
import { Equipos, User, Categoria } from '../../interfaces/interfaces';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { environment } from "../../../environments/environment";
import { Modal } from 'bootstrap';
import { Router, RouterModule } from '@angular/router';



@Component({
  selector: 'app-ins-club',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgSelectModule,RouterModule],
  templateUrl: './ins-club.component.html',
  styleUrl: './ins-club.component.css'
})
export class InsClubComponent implements OnInit {

  EquipoForm!: FormGroup;
  frmGuardar = new FormData();
  operation = 'add';
  isLoading: boolean = false;
  categoriasDisponibles: any[] = []; // Debes llenar esto con loadCategorias()
  categoriasSeleccionadas: { [key: number]: boolean } = {};
  creando!: boolean;
  isEditing: boolean = false;


  constructor(private apiRest: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadCategorias();
  }

  initForm() {
    this.EquipoForm = this.fb.group({
      name: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      tel1: [''],
      tel2: [''],
      categorias:'',
      estado:0
    });

  }


  saveEquipo() {

    this.frmGuardar.append('data', JSON.stringify(this.EquipoForm.value));
    this.frmGuardar.append('operacion', this.operation);

    this.isLoading = true;
    this.apiRest.add_equipo(this.frmGuardar).subscribe((data: any) => {
      if (data.success) {

        Swal.fire(data.msj);
        this.isLoading = false;
        this.initForm();
        this.router.navigate(['/home']);
      }else{
          Swal.fire(data.msj);
      }
    });
  }

  loadCategorias() {
    this.apiRest.get_All_categorias_activas().subscribe((res: any) => {
      this.categoriasDisponibles = res.categoriasDisponibles.map((cat: any) => ({
        id: Number(cat.id),   // aquí convierto id a número
        nombre: cat.nombre
      }));


    });

  }

  uploadImage(ev: any, numFile: number) {
    const inputFile = ev.target as HTMLInputElement;
    if (inputFile.files && inputFile.files.length > 0) {
      // Agregar el archivo al formulario
      this.frmGuardar.append(`${numFile}`, inputFile.files[0]);

      // Obtener el label asociado y actualizar su texto
      const fileName = inputFile.files[0].name;
      const labelElement = document.getElementById(`labelFile${numFile}`);
      if (labelElement) {
        labelElement.textContent = fileName;
      }
    }
  }

  toggleCategoria(id: number) {
    this.categoriasSeleccionadas[id] = !this.categoriasSeleccionadas[id];
    this.actualizarFormArray();
  }

  actualizarFormArray() {
    const categoriasArray = this.EquipoForm.get('categorias') as FormArray;
    categoriasArray.clear();

    Object.keys(this.categoriasSeleccionadas).forEach(id => {
      if (this.categoriasSeleccionadas[parseInt(id)]) {
        // Opción A: Si el backend espera solo IDs (ej: [1, 2])
        categoriasArray.push(this.fb.control(parseInt(id))); // Envía el ID directamente

        // Opción B: Si necesitas mantener el formato {id: X}
        // categoriasArray.push(this.fb.group({ id: [parseInt(id)] }));
      }
    });
  }

  cancel() {
    this.creando = false;
    this.isEditing = false;
  }


}
