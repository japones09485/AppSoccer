import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from "../../services/api.service"
import { Categorias } from '../../interfaces/interfaces';
import { environment } from "../../../environments/environment";
import { CommonModule } from '@angular/common';
import { FiltroPorNombrePipe } from '../../pipes/filtroPorNombre'; 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule,FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categorias',
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent implements OnInit {
categorias: Categorias[] = [];
categoriasFiltrados: Categorias[] = [];
categoriaSelec!: Categorias;
creando = false;
pathIm = environment.apiURL;
CategoriaForm!: FormGroup;
frmGuardar = new FormData();
isLoading: boolean = false;
isEditing: boolean = false;
editForm: boolean = false;
idEdit = 0;
operation = 'add';
controlEdad = '';
filtroNombre: string = '';

  constructor(private apiRest: ApiService, private fb: FormBuilder,) {}

  ngOnInit(): void {

     this.initForm();

    this.apiRest.get_All_categorias()
    .subscribe((res:any)=>{

      this.categorias = res.categoriasDisponibles;
      this.categoriasFiltrados = [...this.categorias];
      
    });

  }

  initForm() {
    this.CategoriaForm = this.fb.group({
      nombre: ['', Validators.required],
      controlEdad: ['', Validators.required],
      edadMin: [''],
      estado:  ['', Validators.required]
    
    });
  }

  addCategoria(){
       this.creando = true;
  }

  editCategoria(id:number){

    this.idEdit = id;
    this.operation = 'edit';
    this.apiRest.editCategoria(id)
      .subscribe((res: any) => {
       
        this.categoriaSelec = res.categoria
        this.controlEdad = this.categoriaSelec.control_edad;

         this.CategoriaForm.patchValue({
            nombre: this.categoriaSelec.nombre,
            edadMin: this.categoriaSelec.edad_min,
            controlEdad: this.categoriaSelec.control_edad,
            estado: this.categoriaSelec.estado
          });

    
        this.creando = true;
        this.editForm = true;

      });


  }

  deleteCategoria(id:number){

  }

  saveCategoria(){

      this.frmGuardar.append('data', JSON.stringify(this.CategoriaForm.value));
        this.frmGuardar.append('operacion', this.operation);
        this.frmGuardar.append('idEdit', JSON.stringify(this.idEdit));
    
        this.isLoading = true;
        this.apiRest.add_categoria(this.frmGuardar).subscribe((data: any) => {
          if (data.success) {
            this.categorias = data.categoriasDisponibles;
            Swal.fire(data.msj);
            this.isLoading = false;
            this.initForm();
            this.creando = false;
            this.frmGuardar = new FormData(); // limpiar formulario
          }
        });

  }

  cancel(){
     this.creando = false;
     this.isEditing = false;
  }

  aplicarFiltros() {
    const nombre = this.filtroNombre.toLowerCase();
    console.log(nombre);
    
    this.categoriasFiltrados = this.categorias.filter(cat => {
      return !nombre || cat.nombre?.toLowerCase().includes(nombre);
    });
  }


}
