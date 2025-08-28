import { Component, OnInit } from '@angular/core';
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


  constructor(private apiRest: ApiService, private fb: FormBuilder,) {}

  ngOnInit(): void {

     this.initForm();

    this.apiRest.get_All_canchas()
    .subscribe((res:any)=>{

      this.canchas = res.canchas;
      
    });

  }

  initForm() {
    this.CanchaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['', Validators.required],
    
    });
  }

  addCancha(){
       this.creando = true;
  }

  editCancha(id:number){

    this.idEdit = id;
    this.operation = 'edit';
    this.apiRest.editCancha(id)
      .subscribe((res: any) => {
       
        this.canchaSelec = res.cancha
       
         this.CanchaForm.patchValue({
            nombre: this.canchaSelec.nombre,
            descripcion: this.canchaSelec.descripcion,
            estado: this.canchaSelec.estado
          });

    
        this.creando = true;
        this.editForm = true;

      });


  }


  saveCancha(){

      this.frmGuardar.append('data', JSON.stringify(this.CanchaForm.value));
        this.frmGuardar.append('operacion', this.operation);
        this.frmGuardar.append('idEdit', JSON.stringify(this.idEdit));
    
        this.isLoading = true;
        this.apiRest.add_cancha(this.frmGuardar).subscribe((data: any) => {
          if (data.success) {
            this.canchas = data.canchas;
            Swal.fire(data.msj);
            this.isLoading = false;
            this.initForm();
            this.creando = false;
            this.frmGuardar = new FormData(); // limpiar formulario
          }
        });

  }

  deleteCancha(id:number){

    Swal.fire({
          title: "Desea eliminar esta cancha?",
          showDenyButton: true,
          confirmButtonText: "Si"
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.apiRest.deleteCancha(id)
              .subscribe((res: any) => {
                this.canchas = res.canchas;
                Swal.fire(res.msj);
    
              });
          }
        });
    
  }

  cancel(){
     this.creando = false;
     this.isEditing = false;
  }

}
