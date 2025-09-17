import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from "../../services/api.service";
import { CommonModule } from '@angular/common';
import { Jugadores, User } from '../../interfaces/interfaces';
import { PaginacionComponent } from '../paginacion/paginacion.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { environment } from "../../../environments/environment";
import { Modal } from 'bootstrap';
import { Router } from '@angular/router';



@Component({
  selector: 'app-jugadores',
  imports: [CommonModule, ReactiveFormsModule, FormsModule,PaginacionComponent],
  templateUrl: './jugadores.component.html',
  styleUrl: './jugadores.component.css'
})
export class JugadoresComponent implements OnInit {

  jugadores: Jugadores[] = [];
  jugadorSelect !: Jugadores;
  creando !: boolean;
  pathIm = environment.apiURL;
  JugadorForm!: FormGroup;
  frmGuardar = new FormData();
  isLoading: boolean = false;
  isEditing: boolean = false;
  editForm: boolean = false;
  idEdit = 0;
  operation = 'add';
  isModalOpen: boolean = false;
  modalImage: string = '';
  imgVisi: String = '';
  JugadorVisi: String = '';
  EdadJugador!: number;
  UserLog !: User;
  tipoDoc = 0;
  labedoc1 = 'Foto Jugador';
  labedoc2 = 'Adjunto adicional';
  labedoc3 = 'Adjunto adicional';
  labedoc4 = 'Adjunto adicional';
  labedoc5 = 'Adjunto adicional';
  filtroNombre: string = '';
  filtroIdentificacion: string = '';
  filtroCorreo: string = '';
  jugadoresFiltrados: any[] = [];
  p = 1;
  paginas = 0;


  constructor(private apiRest: ApiService, private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.UserLog = this.apiRest.getUser();
    console.log(this.UserLog.perfil);
    
    this.initForm();
    this.creando = false;

    this.apiRest.get_All_jugadores().subscribe((res: any) => {
      this.jugadores = res.jugadores;
      this.paginas = res.cant_paginas;

    
    });
  }

  initForm() {
    this.JugadorForm = this.fb.group({
      name: ['', Validators.required],
      identificacion: ['', Validators.required],
      genero: ['', Validators.required],
      fch_nacimiento: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      posicion: ['', Validators.required],
      estado: ['', Validators.required],
      TipoDoc: ['', Validators.required],
      nomMadre: [''],
      telMadre: [''],
      nomPadre: [''],
      telPadre: ['']
    });
  }

  sigPag(pag: number) {

    
      this.apiRest.get_All_jugadores(pag).subscribe((res: any) => {
        this.jugadores = res.jugadores;
        this.paginas = res.cant_paginas;
      });

  }

  addJugador() {
    this.initForm();
    this.creando = true;
  }

  saveJugador() {



    this.JugadorForm.get('edad')?.setValue(this.EdadJugador);
    this.frmGuardar.append('data', JSON.stringify(this.JugadorForm.value));
    this.frmGuardar.append('operacion', this.operation);
    this.frmGuardar.append('usuario', String(this.UserLog.id));
    this.frmGuardar.append('idEdit', JSON.stringify(this.idEdit));

    this.isLoading = true;

    Swal.fire({
      title: "Aviso importante",
      html: `
          <div style="text-align: left; font-size: 13px;">
            <strong>Veracidad de la información:</strong> Al completar este formulario, usted se compromete a proporcionar información verídica, completa y actualizada. En caso de detectar información falsa o incorrecta, nos reservamos el derecho de tomar las acciones legales correspondientes, incluyendo la presentación de la información a las autoridades competentes, como la Policía.<br><br>
            
            <strong>Tratamiento de Datos Personales:</strong> Sus datos personales serán tratados de acuerdo con las leyes vigentes de protección de datos. Serán utilizados exclusivamente para la gestión y organización del evento o proceso correspondiente, almacenados de forma segura y no compartidos con terceros sin su consentimiento, salvo requerimiento legal.<br><br>
            
            Al enviar sus datos, usted autoriza el tratamiento conforme a lo indicado.<br><br>
            ¡Gracias por su colaboración y por ayudarnos a garantizar un proceso transparente y seguro!
          </div>
        `,
      showDenyButton: true,
      confirmButtonText: "Sí",
      denyButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiRest.add_jugador(this.frmGuardar)
          .subscribe((data: any) => {
            if (data.success == true) {
              this.jugadores = data.jugadores;
              Swal.fire(data.msj);
              this.isLoading = false;
              this.initForm();
              this.creando = false;
            } else {
              Swal.fire(data.msj);
              this.isLoading = false;
            }
          });
      }
    });




  }

  uploadImage(ev: any, numFile: number) {
    const inputFile = ev.target as HTMLInputElement;
    if (inputFile.files && inputFile.files.length > 0) {
      const file = inputFile.files[0];

      // Solo validar si el archivo es 1, 2 o 3
      if (numFile !== 4 && numFile !== 5) {
        const validTypes = ['image/jpeg', 'image/png'];
        if (!validTypes.includes(file.type)) {
          Swal.fire('Solo se permiten imagenes , archivos JPG o PNG');
          inputFile.value = ''; // Limpia el input
          return;
        }
      }

      // Agregar el archivo al formulario
      this.frmGuardar.append(`${numFile}`, file);

      // Obtener el label asociado y actualizar su texto
      const fileName = file.name;
      const labelElement = document.getElementById(`labelFile${numFile}`);
      if (labelElement) {
        labelElement.textContent = fileName;
      }
    }
  }



  cancel() {
    this.creando = false;
    this.isEditing = false;

  }

  deleteJugador(id: number) {


    Swal.fire({
      title: "Desea eliminar este jugador?",
      showDenyButton: true,
      confirmButtonText: "Si"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.apiRest.deleteJugador(id)
          .subscribe((res: any) => {
            this.jugadores = res.jugadores;
            Swal.fire(res.msj);

          });
      }
    });


  }

  editJugador(id: number) {
    this.idEdit = id;
    this.operation = 'edit';
    this.apiRest.editJugador(id)
      .subscribe((res: any) => {
        this.jugadorSelect = res.jugador;
        this.tipoDoc = Number(this.jugadorSelect.tipoDoc);

        this.JugadorForm.setValue({
          name: this.jugadorSelect.nombre,
          identificacion: this.jugadorSelect.identificacion,
          genero: this.jugadorSelect.genero,
          mail: this.jugadorSelect.email,
          posicion: this.jugadorSelect.posicion,
          fch_nacimiento: this.jugadorSelect.fecha_nacimiento,
          estado: this.jugadorSelect.estado,
          TipoDoc: this.jugadorSelect.tipoDoc,
          nomMadre: this.jugadorSelect.nombre_madre,
          telMadre: this.jugadorSelect.telefono_madre,
          nomPadre: this.jugadorSelect.nombre_padre,
          telPadre: this.jugadorSelect.telefono_padre

        });


        this.creando = true;
        this.editForm = true;

      });
  }


  openModal(path: String, equipo: String) {

    this.imgVisi = path;
    this.JugadorVisi = equipo;

    const modalElement = document.getElementById('exampleModal');

    // Verificar que el elemento existe
    if (modalElement) {
      const modal = new Modal(modalElement); // Solo se crea el modal si el elemento existe
      modal.show();
    } else {
      console.error('Modal element not found!');
    }
  }

  onFechaNacimientoChange(event: Event): void {
    this.EdadJugador = 0;
    const input = event.target as HTMLInputElement;
    const fechaNacimiento = input.value;
    if (fechaNacimiento) {
      const edad = this.calcularEdad(fechaNacimiento);
      this.EdadJugador = edad;

      // Aquí puedes guardar la edad en una variable, formControl o mostrarla
    }
  }

  calcularEdad(fechaNacimiento: string): number {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }

    return edad;
  }

  getFilename(filePath: any) {
    return filePath?.split('/').pop() || 'archivo';
  }


  updateDocumento(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = parseInt(selectElement.value, 10);
    //activamos doicumentos
    this.tipoDoc = selectedValue;


    if (selectedValue == 1) {
      // Registro civil
      this.labedoc2 = 'Foto del Registro civil';
      this.labedoc3 = 'Adjunto adicional';
      this.labedoc4 = 'Adjunto adicional';

    } else if (selectedValue == 2) {
      //Tarjeta Identidad
      this.labedoc2 = 'Foto Tarjeta Identidad Frontal';
      this.labedoc3 = 'Foto Tarjeta Identidad Trasera';
      this.labedoc4 = 'Foto de registro civil';
      this.labedoc5 = 'Adjunto en pdf';


    } else if (selectedValue == 3) {
      //Cedula de ciudadania
      this.labedoc2 = 'Foto Cedula de ciudadania Frontal';
      this.labedoc3 = 'Foto Cedula de ciudadania Trasera';
      this.labedoc4 = 'Adjunto adicional';

    } else if (selectedValue == 4) {
      //Cedula extranjeria
      this.labedoc2 = 'Foto Cedula de extranjeria Frontal';
      this.labedoc3 = 'Foto Cedula de extranjeria Trasera';
      this.labedoc4 = 'Adjunto adicional';
    } else if (selectedValue == 5) {
      //Pasaporte
      this.labedoc2 = 'Foto Pasaporte';
      this.labedoc3 = 'Adjunto adicional';
      this.labedoc4 = 'Adjunto adicional';

    }

  }

  aplicarFiltros() {
    const nombre = this.filtroNombre.toLowerCase();
    const identificacion = this.filtroIdentificacion.toLowerCase();
    const correo = this.filtroCorreo.toLowerCase();

    this.apiRest.get_All_jugadoresFilt(nombre,identificacion,correo).subscribe((res: any) => {
      this.jugadores = res.jugadores;
      this.paginas = res.cant_paginas;
    });

    
  }

  Inicio() {
    this.router.navigate(['/DelegaCh']);
  }



}
