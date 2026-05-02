import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from "../../services/api.service";
import { CommonModule } from '@angular/common';
import { Equipos, User, Categoria, Jugadores } from '../../interfaces/interfaces';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { environment } from "../../../environments/environment";
import { Modal } from 'bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-equipo',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgSelectModule],
  templateUrl: './admin-equipo.component.html',
  styleUrl: './admin-equipo.component.css'
})
export class AdminEquipoComponent implements OnInit {

  usuario !: User;
  equipo !: any;
  categorias !: any;
  pathIm = environment.apiURL;
  categoriaSeleccionada: any = null;
  categoriaSeleccionadaT: any = null;
  jugadorSeleccionadoId: number | null = null;
  perfilUsuario: any;
  jugadoresDisponibles: any[] = [];
  jugadorSeleccionadoIdClub: number | null = null;
  jugadoresDisponiblesClub: any[] = [];
  categoriasEquipo: any[] = [];
  jugadoresEquipo: any[] = [];
  modalVerJugador!: Modal;
  modalVerJugadorTorneo!: Modal;
  Torneos: any;
  torneosFiltrados: any;
  categoriasDisponibles: any[] = [];
  IdTorneoSelect !: number;
  validInfo = true;
  validTecnico = false;
  validTorneos = false;
  EquipoSelect !: number;
  mostrarDescripcionCompleta = false;
  filtroEstado: string = '';
  direccionEquipo: any;
  creandoD = false;
  DireccionForm!: FormGroup;
  isLoading = false;
  frmGuardar = new FormData();

  ngOnInit(): void {
    // Inicializar el modal si existe en el DOM
    const modalElement = document.getElementById('modalVerJugador');


    if (modalElement) {
      this.modalVerJugador = new Modal(modalElement, {
        backdrop: true,
        keyboard: true
      });

    }

    const modalElement1 = document.getElementById('modalVerJugadorTorneo');
    if (modalElement1) {
      this.modalVerJugadorTorneo = new Modal(modalElement1, {
        backdrop: true,
        keyboard: true
      });

    }

    // Obtener usuario
    this.usuario = this.apiRest.getUsuario();
     this.perfilUsuario = this.usuario ? this.usuario.perfil : 0;
    

    this.apiRest.get_direccion_equipo(this.usuario.fk_equipo).subscribe((res: any) => {
      this.direccionEquipo = res.direccion;

    });


    // Obtener equipo del usuario
    this.apiRest.Equipo_User(this.usuario.id).subscribe((res: any) => {
      this.equipo = res.equipo;
      this.categorias = res.equipo.categorias;

      // Ahora que tenemos el equipo, obtener torneos
      this.apiRest.TorneosEquipo(this.equipo.id).subscribe((res: any) => {
        this.Torneos = res.torneos;
        this.torneosFiltrados = this.Torneos; // Inicialmente mostrar todos

      });
    });


    // Obtener dirreaccion del equipo



  }

  constructor(public apiRest: ApiService, private router: Router, private fb: FormBuilder) { }

  cerrarSesion() {
    this.apiRest.logOut();
    this.router.navigate(['/home']);
  }


  abrirModalSeleccion(categoria: any) {

    this.apiRest.get_All_jugadoresAct()
      .subscribe((res: any) => {
        this.jugadoresDisponibles = res.jugadores.map((j: any) => ({
          ...j,
          busqueda: `${j.nombre} ${j.identificacion}`
        }));
      });

    this.categoriaSeleccionada = categoria;
    this.jugadorSeleccionadoId = null;

  } 

  abrirModalSeleccionJEquipo(torneo: any) {

    this.IdTorneoSelect = torneo.IdTorneo;

    this.apiRest.get_jugadores_categoriasId(torneo.categoria, this.IdTorneoSelect)
      .subscribe((res: any) => {



        this.jugadoresDisponiblesClub = res.jugadoresDisponibles.map((j: any) => ({
          ...j,
          busqueda: `${j.nombre} ${j.identificacion}`
        }));


      });


    this.categoriaSeleccionadaT = torneo.categoria;
    this.jugadorSeleccionadoIdClub = null;

  }



  agregarJugadorSeleccionado() {
    const jugador = this.jugadoresDisponibles.find(j => j.id === this.jugadorSeleccionadoId);


    if (!this.jugadorSeleccionadoId) {
      Swal.fire('Faltan datos', 'Debes seleccionar un jugador y su número', 'warning');
      return;
    }

    Swal.fire({
      title: "¿Desea agregar a " + jugador.nombre + ", año de nacimiento " + new Date(jugador.fecha_nacimiento).getFullYear() + " a esta categoría?",
      showDenyButton: true,
      confirmButtonText: "Si"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {


        this.apiRest.agregar_jugador_categoria(this.categoriaSeleccionada.fk_equipo, this.categoriaSeleccionada.fk_categoria, jugador.id)
          .subscribe((res: any) => {
            if (res.success) {
              this.categoriasEquipo = res.categoriasEq;
            }

            Swal.fire(res.msj);
          })

      }
    });



  }

  agregarJugadorSeleccionadoT() {
    const jugador = this.jugadoresDisponiblesClub.find(j => j.id === this.jugadorSeleccionadoIdClub);
    console.log('jugadorSeleccionadoIdClub' + this.jugadorSeleccionadoIdClub);

    console.log(this.IdTorneoSelect);

    if (!this.jugadorSeleccionadoIdClub) {
      Swal.fire('Faltan datos', 'Debes seleccionar un jugador y su número', 'warning');
      return;
    }

    Swal.fire({
      title: "¿Desea agregar a " + jugador.nombre + ", a este torneo?",
      showDenyButton: true,
      confirmButtonText: "Si"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.apiRest.agregar_jugador_categoria_Club(this.IdTorneoSelect, this.usuario.fk_equipo, this.categoriaSeleccionadaT, jugador.id)
          .subscribe((res: any) => {

            Swal.fire(res.msj);

          })


      }
    });



  }

  VerJugador(categoria: any) {
    this.modalVerJugador?.show();
    this.categoriaSeleccionada = categoria;

    console.log(categoria);


    this.apiRest.jugadoresEquipo(categoria.fk_equipo, categoria.id).subscribe((res: any) => {
      this.jugadoresEquipo = res.jugadores;

    });

  }




  cerrarModalVerJugador(): void {
    this.modalVerJugador?.hide();

    // ✅ Seguridad extra por si quedó el backdrop pegado (opcional)
    setTimeout(() => {
      document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('padding-right');
    }, 300);
  }


  cerrarModalVerJugadorT(): void {
    this.modalVerJugadorTorneo?.hide(); // Nombre correcto

    // Limpieza extra (opcional)
    setTimeout(() => {
      document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('padding-right');
    }, 300);
  }




  VerJugadorTorneo(torneo: number) {

    this.modalVerJugadorTorneo?.show();
    this.IdTorneoSelect = torneo;
    this.apiRest.jugadoresEquipoTorneo(torneo, this.equipo.id).subscribe((res: any) => {

      this.jugadoresEquipo = res.jugadores;

    });

  }






  eliminarJugadorClub(jugador: number, categoria: number, equipo: number) {
    Swal.fire({
      title: "Desea eliminar este jugador de esta categoria del Club?",
      showDenyButton: true,
      confirmButtonText: "Si"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.apiRest.eliminarJugadorClub(jugador, categoria, equipo)
          .subscribe((res: any) => {

            Swal.fire(res.msj);
            const modalElement = document.getElementById('modalVerJugador');
            if (modalElement) {
              const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
              modal.hide();
            }

          });
      }
    });
  }


  eliminarJugadorTorneo(jugador: number, equipo: number) {
    Swal.fire({
      title: "Desea eliminar este jugador de este torneo?",
      showDenyButton: true,
      confirmButtonText: "Si"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.apiRest.eliminarJugadorTorneo(jugador, this.IdTorneoSelect, equipo)
          .subscribe((res: any) => {

            Swal.fire(res.msj);
            this.jugadoresEquipo = res.jugadores;

          });
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


  InfoTorneo(IdTorneo: number) {
    
    this.router.navigate(['/InfoT/' + IdTorneo]);

  }

  getNombreCategoria(idCategoria: string | undefined): string {


    const id = Number(idCategoria);
    if (!idCategoria || isNaN(id)) {
      return 'Sin categoría';
    }

    const categoria = this.categoriasDisponibles.find(cat => cat.id === id);
    return categoria ? categoria.nombre : 'Sin categoría';
  }

  validMenu(opcion: Number) {
    if (opcion == 1) {

      this.validInfo = true;
      this.validTecnico = false;
      this.validTorneos = false;

    } else if (opcion == 2) {

      this.validInfo = false;
      this.validTecnico = true;
      this.validTorneos = false;

    } else if (opcion == 3) {

      this.validInfo = false;
      this.validTecnico = false;
      this.validTorneos = true;

    }
  }

  onSeleccionarJugador() {
    // Si necesitas cargar más datos del jugador seleccionado, hazlo aquí
    const seleccionado = this.jugadoresDisponibles.find(j => j.id === this.jugadorSeleccionadoId);
    console.log('Jugador seleccionado:', seleccionado);
  }

  onSeleccionarJugadorClub() {
    // Si necesitas cargar más datos del jugador seleccionado, hazlo aquí
    const seleccionado = this.jugadoresDisponiblesClub.find(j => j.id === this.jugadorSeleccionadoIdClub);
    console.log('Jugador seleccionado:', seleccionado);
  }

  CarnetsEquipo(IdTorneo: number) {
    this.apiRest.CarnetsEquipo(IdTorneo, this.usuario.fk_equipo).subscribe((res: any) => {
      if (res.success && res.ur) {
        // Crear enlace temporal
        const a = document.createElement('a');
        a.href = res.ur;
        a.target = '_blank'; // abre en nueva pestaña
        a.download = 'carnets_equipo.pdf'; // fuerza descarga
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        Swal.fire(res.msj);
      }
    });
  }

  AddAllJugadores() {
    Swal.fire({
      title: "Desea agregar todos los jugadores de la categoria al torneo?",
      showDenyButton: true,
      confirmButtonText: "Si"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.apiRest.AddAllJugadores(this.IdTorneoSelect, this.usuario.fk_equipo)
          .subscribe((res: any) => {

            Swal.fire(res.msj);

          });
      }
    });
  }

  filtrarEstado(estado: number | string) {
    console.log('Estado seleccionado:', estado);

    // Si no se selecciona ningún estado, mostrar todos
    if (estado === '' || estado === null || estado === undefined) {
      this.torneosFiltrados = this.Torneos; // mostrar todos
    } else {
      // Filtrar por estado
      this.torneosFiltrados = this.Torneos.filter((torneo: any) => torneo.estado === estado.toString());
    }

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

  addTecnico() {

    this.creandoD = true;
    this.initFormDir();

  }

  cancel() {
    this.creandoD = false;
  }


  initFormDir() {
    this.DireccionForm = this.fb.group({
      nombre: ['', Validators.required],
      identificacion: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      tipo: ['', Validators.required]

    });
  }


  saveTecnico() {

    this.frmGuardar.append('data', JSON.stringify(this.DireccionForm.value));
    this.frmGuardar.append('IdEquipo', JSON.stringify(this.usuario.fk_equipo));

    this.isLoading = true;
    this.apiRest.saveTecnico(this.frmGuardar).subscribe((data: any) => {
      if (data.success) {
        this.direccionEquipo = data.direccion;
        Swal.fire(data.msj);
        this.isLoading = false;
        this.initFormDir();
        this.creandoD = false;
        this.frmGuardar = new FormData(); // limpiar formulario
      }
    });

  }

  deletedireccion(idDireccion: number) {


    Swal.fire({
      title: "Desea eliminar de la direccion tecnica?",
      showDenyButton: true,
      confirmButtonText: "Si"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.isLoading = true;

        this.apiRest.deletedireccion(idDireccion,this.usuario.fk_equipo)
          .subscribe((res: any) => {
            this.direccionEquipo = res.direccion;
            Swal.fire(res.msj);
            this.isLoading = false;

          });
      }
    });



  }

InfoJugadores(Idtorneo: number) {
  const url = `${window.location.origin}/#/jugadores/${Idtorneo}/${this.usuario.fk_equipo}`;
  window.open(url, '_blank');
}

esFechaPasada(fecha: string | Date): boolean {
  const fechaSeleccionada = new Date(fecha);
  const fechaActual = new Date();
  console.log(fechaActual);
  
  // Ponemos ambas fechas a las 00:00:00 para comparar solo el día
  fechaSeleccionada.setHours(0, 0, 0, 0);
  fechaActual.setHours(0, 0, 0, 0);

  // Si la fecha seleccionada es menor a la actual, retorna true
  if (fechaSeleccionada.getTime() < fechaActual.getTime()) {
    return true;
  } else {
    return false;
  }
}




}
