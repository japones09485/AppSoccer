import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from "../../services/api.service";
import { CommonModule } from '@angular/common';
import { Equipos, User } from '../../interfaces/interfaces';
import { PaginacionComponent } from '../paginacion/paginacion.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule,FormsModule } from '@angular/forms';
import { environment } from "../../../environments/environment";
import { Modal } from 'bootstrap';



@Component({
  selector: 'app-users',
  imports: [CommonModule, ReactiveFormsModule,FormsModule,PaginacionComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})

export class UsersComponent implements OnInit {

  users: User[] = [];
  usersFiltrados: User[] = [];
  equipos: Equipos[] = [];
  userSelect !: User;
  creando !: boolean;
  pathIm = environment.apiURL;
  UserForm!: FormGroup;
  frmGuardar = new FormData();
  isLoading: boolean = false;
  isEditing: boolean = false;
  editForm: boolean = false;
  idEdit = 0;
  operation = 'add';
  isModalOpen: boolean = false;
  modalImage: string = '';
  imgVisi: String = '';
  EquivoVisi: String = '';
  UserLog !: User;
  categoriasDisponibles: any[] = [];
  filtroNombre: string = '';
  filtroUsuario: string = '';
  filtroPerfil: string = '';
  paginas = 0;

  constructor(private apiRest: ApiService,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    this.initForm();
    this.creando = false;

    this.apiRest.get_All_eq()
      .subscribe((res: any) => {
        this.equipos = res.equipos;

      });

    this.apiRest.get_All_categorias_activas().subscribe((res: any) => {
      this.categoriasDisponibles = res.categoriasDisponibles.map((cat: any) => ({
        id: Number(cat.id),   // aquí convierto id a número
        nombre: cat.nombre
      }));


    });


    this.apiRest.get_All_users()
      .subscribe((res: any) => {
        this.users = res.users;
        this.paginas = res.cant_paginas;
      });
  }

  sigPag(pag: number) {

    
      this.apiRest.get_All_users(pag).subscribe((res: any) => {
        this.users = res.users;
        this.paginas = res.cant_paginas;
      });

  }

  initForm() {
    this.UserForm = this.fb.group({
      name: ['', Validators.required],
      usuario: ['', [Validators.required, Validators.email]],
      estado: ['', Validators.required],
      perfil: ['', Validators.required],
      passw: ['', Validators.required],
      fk_equipo: [''],
      fk_categoria: [''],

    });
  }

  addUser() {
    this.creando = true;
  }


  saveUser() {

    this.frmGuardar.append('data', JSON.stringify(this.UserForm.value));
    this.frmGuardar.append('operacion', this.operation);
    this.frmGuardar.append('iduser', JSON.stringify(this.idEdit));



    this.isLoading = true;
    this.apiRest.add_user(this.frmGuardar)
      .subscribe((data: any) => {
        if (data.success == true) {
          this.users = data.users;
          Swal.fire(data.msj);
          this.isLoading = false;
          this.initForm();
          this.creando = false;

        }else{
          Swal.fire(data.msj);
            this.isLoading = false;
        }

      });
  }


  editUser(id: number) {
    this.idEdit = id;
    this.operation = 'edit';
    this.apiRest.editUser(id)
      .subscribe((res: any) => {
        this.userSelect = res.user;

        this.UserForm.setValue({
          name: this.userSelect.nombre,
          usuario: this.userSelect.usuario,
          estado: this.userSelect.estado,
          perfil: this.userSelect.perfil,
          passw: this.userSelect.password,
          fk_equipo: this.userSelect.fk_equipo,
          fk_categoria: this.userSelect.fk_categoria,

        });


        this.creando = true;
        this.editForm = true;

      });
  }

  MailContacto(id: number){
    Swal.fire({
      title: "Desea enviar notificacion de password?",
      showDenyButton: true,
      confirmButtonText: "Si"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.apiRest.MailContra(id)
          .subscribe((res: any) => {
           
            Swal.fire(res.msj);

          });
      }
    });
  }

  deleteUser(id: number) {
    Swal.fire({
      title: "Desea eliminar este usuario?",
      showDenyButton: true,
      confirmButtonText: "Si"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.apiRest.deleteUser(id)
          .subscribe((res: any) => {
            this.users = res.users;
            Swal.fire(res.msj);

          });
      }
    });
  }

  cancel() {
    this.creando = false;
    this.isEditing = false;
  }

  aplicarFiltros() {
    const nombre = this.filtroNombre.toLowerCase();
    const usuario = this.filtroUsuario.toLowerCase();
    const perfil = this.filtroPerfil;
    
    this.apiRest.get_All_usersFilt(nombre,usuario,perfil)
      .subscribe((res: any) => {
        this.users = res.users;
        this.paginas = res.cant_paginas;
      });

  }


}

