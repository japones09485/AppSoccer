import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from "../../services/api.service"
import { environment } from "../../../environments/environment";
import { CommonModule } from '@angular/common';
import { Juez } from '../../interfaces/interfaces';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-jueces',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './jueces.component.html',
  styleUrl: './jueces.component.css'
})
export class JuecesComponent implements OnInit {
  jueces: Juez[] = [];
  juez!: Juez;
  creando = false;
  pathIm = environment.apiURL;
  JuezForm!: FormGroup;
  frmGuardar = new FormData();
  isLoading: boolean = false;
  isEditing: boolean = false;
  editForm: boolean = false;
  idEdit = 0;
  operation = 'add';
  juezSeleccionado!: Juez;


constructor(private apiRest: ApiService, private fb: FormBuilder,) { }

  ngOnInit(): void {

    this.initForm();
    this.apiRest.get_All_jueces()
    .subscribe((res:any)=>{

      this.jueces = res.jueces;
      
    });


  }

    initForm() {
    this.JuezForm = this.fb.group({
      nombre: ['', Validators.required],
      identificacion: ['', Validators.required],
      email: ['', Validators.required],
      estado: ['', Validators.required],
    
    });
  }


  addJuez(){
    this.creando = true;
  }

  editJuez(IdJuez:number){
  this.idEdit = IdJuez;
      this.operation = 'edit';
      this.apiRest.editJuez(IdJuez)
        .subscribe((res: any) => {
        
          this.juezSeleccionado = res.juez
        
          this.JuezForm.patchValue({
              nombre: this.juezSeleccionado.nombre,
              identificacion: this.juezSeleccionado.identificacion,
              email: this.juezSeleccionado.email,
              estado: this.juezSeleccionado.estado
            });

      
          this.creando = true;
          this.editForm = true;

        });
  }

  deleteJuez(IdJuez:number){
     Swal.fire({
              title: "Desea eliminar este juez?",
              showDenyButton: true,
              confirmButtonText: "Si"
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                this.apiRest.deleteJuez(IdJuez)
                  .subscribe((res: any) => {
                    this.jueces = res.jueces;
                    Swal.fire(res.msj);
        
                  });
              }
            });
  }

  saveJuez(){
    this.frmGuardar.append('data', JSON.stringify(this.JuezForm.value));
            this.frmGuardar.append('operacion', this.operation);
            this.frmGuardar.append('idEdit', JSON.stringify(this.idEdit));
        
            this.isLoading = true;
            this.apiRest.saveJuez(this.frmGuardar).subscribe((data: any) => {
              if (data.success) {
                this.jueces = data.jueces;
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


}
