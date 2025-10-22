import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import { Equipos, Torneos, Grupos, Calendario, Canchas, Juez, nameFases, User } from '../../../interfaces/interfaces';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { environment } from "../../../../environments/environment";
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FiltroPorNombrePipe } from '../../../filtro-por-nombre.pipe';
import { Modal } from 'bootstrap';
import { EnsureArrayPipe } from '../../../pipes/ensure-array.pipe';




@Component({
  selector: 'app-info-torneo',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, FiltroPorNombrePipe, RouterModule, EnsureArrayPipe],
  templateUrl: './info-torneo.component.html',
  styleUrl: './info-torneo.component.css'
})
export class InfoTorneoComponent implements OnInit {
  usuario !: User;
  torneos: Torneos[] = [];
  equipos: Equipos[] = [];
  equiposTorneo: Equipos[] = [];
  grupos: Grupos[] = [];
  jueces: Juez[] = [];
  Delegados: User[] = [];
  nameFases: nameFases[] = [];
  goleadores: any[] = [];
  torneoSelect!: Torneos;
  creando = false;
  pathIm = environment.apiURL;
  idTorneo!: number;
  controlEdad = false;
  AddEquipoG !: boolean;
  mdNamefases!: boolean;
  mdNameGrupo!: boolean;
  newPartido!: boolean;
  AddIdGrupo !: number;
  equipoSeleccionado!: number;
  filtroEquipo: string = '';
  VlInfo !: boolean;
  VlCalif !: boolean;
  VlParticipante!: boolean;
  formatoSeleccionado: string = 'ida';
  calendarioData: Record<string, Calendario[]> = {};

  isLoading: boolean = false;
  fechaSeleccionada: string = '';
  horaSeleccionada: string = '';
  canchaSeleccionada: number = 0;
  JuezSeleccionada: number = 0;
  DelegadoSeleocionada: number = 0;
  partidoSeleccionado: any = null;
  alertCalendary: string = '';
  isSuccess: boolean = false;
  categoriasDisponibles: any[] = [];
  canchas: any[] = [];
  resultadoEq1: any = '';
  resultadoEq2: any = '';
  equipo1: any;
  equipo2: any = 0;
  anotadoresEq1: (number | null)[] = [];
  anotadoresEq2: (number | null)[] = [];
  cantidadAmarillasEq1 = 0;
  cantidadAmarillasEq2 = 0;
  cantidadRojasEq1 = 0;
  cantidadRojasEq2 = 0;
  puntosJuegoLimpioEq1 = 0;
  puntosJuegoLimpioEq2 = 0;
  JuegoLimpioEq1 = 0;
  JuegoLimpioEq2 = 0;
  penaltisEq1 = '';
  penaltisEq2 = '';
  FaseEditar = 0;
  GrupoEditar: any;
  tarjetasAmarillasEq1: number[] = [];
  tarjetasAmarillasEq2: number[] = [];
  tarjetasRojasEq1: number[] = [];
  tarjetasRojasEq2: number[] = [];
  ResultadosEq1: any;
  ResultadosEq2: any;
  clafGeneral: any;
  numero_fases!: number;
  addAfase = false;
  GrupoActual = 0;
  FaseActual = 0;
  nombreGrupoActual = '';
  jugadoresEquipo: any[] = [];
  jugadoresInscritos: any[] = [];

  // Simulación de jugadores por equipo
  jugadoresEq1: any;
  jugadoresEq2: any;

  tipo1Efr!: any;
  tipo2Efr!: any;
  Equipo1gr!: any;
  Equipo2gr!: any;
  Posicion1gr!: any;
  Posicion2gr!: any;
  opcionesPuestos: { value: number, texto: string }[] = [];
  opcionesPuestosCL: { value: number, texto: string }[] = [];
  opcionesPuestosCL2: { value: number, texto: string }[] = [];
  calendarioPre: any;
  controlTipo1 = '';
  controlTipo2 = '';
  nombreFaseEdit = '';
  nombreGrupoEdit = '';
  Ampliacion = '';
  perfilUsuario: any;
  modalVerJugador!: Modal;
  idPartidoSelect!: number;
  mostrarDescripcionCompleta = false;
  EquiposTorneo: any;
  GrupoSelect: any;
  Nequipo1!: any;
  Nequipo2!: any;
  IdPreSelect!: number;
  estadoSwitch = true;
  ganadorW !: any;
  jugadoresEquipoPar: any[] = [];


  ordinales: string[] = [
    'Primero',
    'Segundo',
    'Tercero',
    'Cuarto',
    'Quinto',
    'Sexto',
    'Séptimo',
    'Octavo',
    'Noveno',
    'Décimo'
  ];

  opciones = [
    { label: 'Titular', value: 'titular' },
    { label: 'Suplente', value: 'suplente' }
  ];




  gruposPorFase: { [key: number]: any[] } = {}; // <- asegúrate de tener esto generado

  constructor(
    private apiRest: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private acRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.VlInfo = true;
    this.VlCalif = false;
    this.VlParticipante = false;
    this.isSuccess = false;



    this.usuario = this.apiRest.getUsuario();
    this.perfilUsuario = this.usuario ? this.usuario.perfil : 0;

    this.acRouter.params.subscribe(param => {
      this.idTorneo = param['idTorneo'];


      this.apiRest.getById_Torneo(this.idTorneo).subscribe((res: any) => {
        this.torneoSelect = res.torneo;

        this.torneoSelect.control_edad = res.torneo.control_edad === 'true';
        this.numero_fases = Number(this.torneoSelect.num_fases);


      });


      this.apiRest.GoleadorTorneo(this.idTorneo).subscribe((res: any) => {

        this.goleadores = res.goleadores;

      });



      this.apiRest.get_NameFases(this.idTorneo).subscribe((res: any) => {

        this.nameFases = res.nameFases;

      });


      this.apiRest.get_All_equipos().subscribe((res: any) => {
        this.equipos = res.equipos;
      });



      this.apiRest.get_All_equipos_torneo(this.idTorneo).subscribe((res: any) => {

        this.equiposTorneo = res.equiposTorneo;

      });



      this.apiRest.getById_Grupos(this.idTorneo).subscribe((res: any) => {
        this.grupos = res.grupos;

        for (let i = 1; i <= 7; i++) {
          this.gruposPorFase[i] = this.grupos.filter((g: any) => Number(g.fase) === i);
        }

        this.clafGeneral = res.general;
      });



      this.apiRest.get_Calendary(this.idTorneo).subscribe((res: any) => {
        this.calendarioData = res.calendarioData;

      });

      this.apiRest.get_Jueces_activos().subscribe((res: any) => {
        this.jueces = res.jueces;

      });

      this.apiRest.get_user_perfil(3).subscribe((res: any) => {
        this.Delegados = res.users;

      });


      this.apiRest.get_All_categorias_activas().subscribe((res: any) => {

        this.categoriasDisponibles = res.categoriasDisponibles.map((cat: any) => ({
          id: Number(cat.id),   // aquí convierto id a número
          nombre: cat.nombre
        }));


      });


      this.apiRest.getPrePartido(this.idTorneo).subscribe((res: any) => {
        this.calendarioPre = res.calendarioPre

      });

      this.apiRest.get_All_canchas()
        .subscribe((res: any) => {

          this.canchas = res.canchas;

        });
    });
  }


  inicio() {

    if (this.perfilUsuario == 1) {
      this.router.navigate(['/adminTemp']);
    } else if (this.perfilUsuario == 2) {
      this.router.navigate(['/AdminEq']);
    } else if (this.perfilUsuario == 3) {
      this.router.navigate(['/DelegaCh']);
    } else if (this.perfilUsuario == 0) {
      this.router.navigate(['/home']);
    }


  }

  addEquipo(idGrupo: number) {
    this.AddIdGrupo = idGrupo;
    this.AddEquipoG = true;

    // Espera a que Angular actualice el DOM
    setTimeout(() => {
      const modalElement = document.getElementById('addModal');
      if (modalElement) {
        const modal = new Modal(modalElement);
        modal.show();
      } else {
        console.error('Modal element not found!');
      }
    }, 0);
  }

  addAfases(IdGrupo: number, Fase: number, nombreGrupo: string) {
    this.addAfase = true;
    this.GrupoActual = IdGrupo;
    this.FaseActual = Fase;
    this.nombreGrupoActual = nombreGrupo;

    this.Equipo1gr = null;
    this.Posicion1gr = null;
    this.Equipo2gr = null;
    this.Posicion2gr = null;
    // Espera a que Angular actualice el DOM
    setTimeout(() => {
      const modalElement = document.getElementById('addAfase');
      if (modalElement) {
        const modal = new Modal(modalElement);
        modal.show();
      } else {
        console.error('Modal element not found!');
      }
    }, 0);
  }

  gruposFase1(fase: number): Grupos[] {

    return this.grupos.filter(g => g.fase === fase);
  }



  actualizarOpciones() {
    const grupo = this.grupos.find(g => Number(g.id) == this.Equipo1gr);
    if (!grupo) {
      this.opcionesPuestos = [];
      return;
    }

    const cantidadEquipos = grupo.detalle?.length || 0;
    const limite = Math.min(cantidadEquipos, 10);

    this.opcionesPuestos = [];

    for (let i = 1; i <= limite; i++) {
      this.opcionesPuestos.push({
        value: i,
        texto: this.ordinales[i - 1] || `${i}°`
      });
    }

    // Si sigue vacío, llenar con valores por defecto
    if (this.opcionesPuestos.length === 0) {
      const defaultPuestos = ['Primero', 'Segundo', 'Tercero', 'Cuarto'];
      this.opcionesPuestos = defaultPuestos.map((texto, index) => ({
        value: index + 1,
        texto
      }));
    }
  }

  equiposFiltrados(): Equipos[] {
    return this.equipos.filter(eq =>
      eq.nombre.toLowerCase().includes(this.filtroEquipo.toLowerCase())


    );

  }


  guardarEquipo() {

    if (!this.equipoSeleccionado) {
      Swal.fire('Por favor seleccionar equipo.');
    } else {

      this.apiRest.AddEquipoGr(this.idTorneo, this.AddIdGrupo, this.equipoSeleccionado).subscribe((res: any) => {

        this.grupos = res.grupos;
        Swal.fire(res.msj);

      });
    }


  }

  guardarPrePartido() {

    // Si todo está correcto, continuar con la lógica de guardado
    const prePartido = {
      tipo1Efr: this.tipo1Efr,
      GrupoEq1: this.Equipo1gr,
      posicionEq1: this.Posicion1gr,
      tipo2Efr: this.tipo2Efr,
      GrupoEq2: this.Equipo2gr,
      posicionEq2: this.Posicion2gr,
      idGrupo: this.GrupoActual,
      idTorneo: this.idTorneo,
      fase: this.FaseActual
    };

    Swal.fire({
      title: "¿Desea agregar este enfrentamiento al grupo " + this.GrupoActual + "?",
      showDenyButton: true,
      confirmButtonText: "Sí",
      denyButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiRest.guardarPrePartido(prePartido).subscribe((res: any) => {
          Swal.fire(res.msj);

          if (res.success === true) {
            // Resetear los campos a null en lugar de 0 para evitar conflictos de validación
            this.Equipo1gr = null;
            this.Posicion1gr = null;
            this.Equipo2gr = null;
            this.Posicion2gr = null;
            this.controlTipo1 = '';
            this.controlTipo2 = '';
            this.tipo1Efr = '';
            this.tipo2Efr = '';
            this.calendarioPre = res.calendarioPre;
          }
        });
      }
    });
  }

  deleteEqGr(idGrupo: number, idEquipo: number) {

    Swal.fire({
      title: "Desea eliminar este equipo?",
      showDenyButton: true,
      confirmButtonText: "Si"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.apiRest.deleteEqGr(idGrupo, idEquipo, this.idTorneo).subscribe((res: any) => {

          this.grupos = res.grupos;
          Swal.fire(res.msj);

        });
      }
    });

  }

  opMenu(opc: number) {

    if (opc == 1) {

      this.VlInfo = true;
      this.VlCalif = false;
      this.VlParticipante = false;

    } else if (opc == 2) {

      this.VlCalif = true;
      this.VlInfo = false;
      this.VlParticipante = false;

    } else if (opc == 3) {

      this.VlInfo = false;
      this.VlCalif = false;
      this.VlParticipante = true;

    }



  }

  calendarioPartidos(tipoCalendary: string) {

    Swal.fire({
      title: "Desea generar calendario Fase 1?  Se eliminaran los calendarios anteriores no validados.",
      showDenyButton: true,
      confirmButtonText: "Si"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.isLoading = true;
        this.apiRest.calendarioPartidos(this.idTorneo, tipoCalendary).subscribe((res: any) => {

          if (res.success == true) {
            this.calendarioData = res.calendarioData;
            this.torneoSelect = res.torneo;
            this.isLoading = false;
          } else if (res.success == false) {
            this.isLoading = false;
            Swal.fire({
              icon: "error",
              title: "Mensaje de usuario",
              html: res.msj, // Usa html en vez de text

            });
          }

        });
      }
    });
  }

  UpdateClanedary(idCalendary: number, Fecha: string, Hora: string, Cancha: string, Juez: number) {

    this.alertCalendary = '';
    if (!Fecha || !Hora) {
      Swal.fire('Debe configurar hora y fecha.');

    } else {
      this.isLoading = true;
      this.apiRest.UpdateClanedary(this.idTorneo, idCalendary, Fecha, Hora, Cancha, Juez).subscribe((res: any) => {
        this.isLoading = false;
        this.isSuccess = true;
        this.fechaSeleccionada = '';
        this.horaSeleccionada = '';
        this.canchaSeleccionada = 0;
        Swal.fire(res.msj);
        this.calendarioData = res.calendarioData;

      });
    }


  }


  getNombreCategoria(idCategoria: string | undefined): string {
    const id = Number(idCategoria);
    if (!idCategoria || isNaN(id)) {
      return 'Sin categoría';
    }

    const categoria = this.categoriasDisponibles.find(cat => cat.id === id);
    return categoria ? categoria.nombre : 'Sin categoría';
  }


  getNombreCancha(idCancha: string | null | undefined): string {

    const id = Number(idCancha);

    if (!idCancha || isNaN(id)) {
      return 'Sin cancha';
    }

    const cancha = this.canchas.find(cat => cat.id == id);


    return cancha ? cancha.nombre : 'Sin cancha';
  }


  generarSelectsAnotadores(SelecEquipo: number, equipo: string, categoria: number) {

    this.apiRest.jugadoresEquipoTorneo(this.torneoSelect.id, equipo).subscribe((res: any) => {

      if (SelecEquipo == 1) {
        this.equipo1 = equipo;
        this.jugadoresEq1 = res.jugadores;

      } else if (SelecEquipo == 2) {
        this.equipo2 = equipo;
        this.jugadoresEq2 = res.jugadores;
      }

    });



    // Crea arreglos del tamaño de goles para mostrar selects

    this.anotadoresEq1 = Array.from({ length: this.resultadoEq1 }, () => null);
    this.anotadoresEq2 = Array.from({ length: this.resultadoEq2 }, () => null);

  }




  generarTarjetas(equipo: 'eq1' | 'eq2', tipo: 'amarilla' | 'roja') {
    const cantidad = equipo === 'eq1'
      ? (tipo === 'amarilla' ? this.cantidadAmarillasEq1 : this.cantidadRojasEq1)
      : (tipo === 'amarilla' ? this.cantidadAmarillasEq2 : this.cantidadRojasEq2);

    const nuevaLista = Array(cantidad).fill(null);

    if (equipo === 'eq1') {
      if (tipo === 'amarilla') this.tarjetasAmarillasEq1 = nuevaLista;
      else this.tarjetasRojasEq1 = nuevaLista;
    } else {
      if (tipo === 'amarilla') this.tarjetasAmarillasEq2 = nuevaLista;
      else this.tarjetasRojasEq2 = nuevaLista;
    }
  }

  resetearFormularioResul() {
    this.resultadoEq1 = '';
    this.resultadoEq2 = '';
    this.anotadoresEq1 = [];
    this.anotadoresEq2 = [];
    this.tarjetasAmarillasEq1 = [];
    this.tarjetasAmarillasEq2 = [];
    this.tarjetasRojasEq1 = [];
    this.tarjetasRojasEq2 = [];
    this.cantidadAmarillasEq1 = 0;
    this.cantidadAmarillasEq2 = 0;
    this.cantidadRojasEq1 = 0;
    this.cantidadRojasEq2 = 0;
    this.puntosJuegoLimpioEq1 = 0;
    this.puntosJuegoLimpioEq2 = 0;
    this.JuegoLimpioEq1 = 0;
    this.JuegoLimpioEq2 = 0;
    this.Ampliacion = '';
    this.penaltisEq1 = '';
    this.penaltisEq2 = '';
    this.estadoSwitch = true

  }



  trackByIndex(index: number, item: any): number {
    return index;
  }


  guardarResultadoP(partidoId: number, idTorneo: number, grupo: string): void {


    if (this.estadoSwitch) {
      const errores: string[] = [];


      if (
        isNaN(this.resultadoEq1) || this.resultadoEq1 === '' || this.resultadoEq1 < 0 ||
        isNaN(this.resultadoEq2) || this.resultadoEq2 === '' || this.resultadoEq2 < 0
      ) {
        errores.push('Debe ingresar un resultado valido');
      }


      // Validación de goles y anotadores
      if (this.resultadoEq1 > 0) {
        if (this.anotadoresEq1.length !== this.resultadoEq1 || this.anotadoresEq1.some(id => !id)) {
          errores.push('Debes seleccionar todos los anotadores del equipo 1.');
        }
      }

      if (this.resultadoEq2 > 0) {
        if (this.anotadoresEq2.length !== this.resultadoEq2 || this.anotadoresEq2.some(id => !id)) {
          errores.push('Debes seleccionar todos los anotadores del equipo 2.');
        }
      }

      // Validación de tarjetas
      if (this.cantidadAmarillasEq1 > 0 && this.tarjetasAmarillasEq1.some(id => !id)) {
        errores.push('Faltan jugadores para tarjetas amarillas del equipo 1.');
      }

      if (this.cantidadRojasEq1 > 0 && this.tarjetasRojasEq1.some(id => !id)) {
        errores.push('Faltan jugadores para tarjetas rojas del equipo 1.');
      }

      if (this.cantidadAmarillasEq2 > 0 && this.tarjetasAmarillasEq2.some(id => !id)) {
        errores.push('Faltan jugadores para tarjetas amarillas del equipo 2.');
      }

      if (this.Ampliacion == 'S' && this.penaltisEq1 == '' && this.penaltisEq2 == '') {
        errores.push('Al activar ampliaciòn por penaltis debe ingresar los resultados.');
      }

      // Mostrar errores si hay y detener
      if (errores.length > 0) {

        this.resetearFormularioResul();
        Swal.fire({
          icon: 'error',
          title: 'Errores encontrados',
          html: errores.join('<br>')
        });
        return;
      }

      // Determinar resultado por equipo
      let resEq1: 'G' | 'P' | 'E';
      let resEq2: 'G' | 'P' | 'E';

      if (this.resultadoEq1 > this.resultadoEq2) {
        resEq1 = 'G';
        resEq2 = 'P';
      } else if (this.resultadoEq2 > this.resultadoEq1) {
        resEq1 = 'P';
        resEq2 = 'G';
      } else {
        resEq1 = resEq2 = 'E';
      }

      //calucular juego limpio

      var puntosTAmarilla1 = this.cantidadAmarillasEq1 * 100;
      var puntosTAmarilla2 = this.cantidadAmarillasEq2 * 100;
      var puntosTRoja1 = this.cantidadRojasEq1 * 200;
      var puntosTRoja2 = this.cantidadRojasEq2 * 200;


      var toEq1 = puntosTAmarilla1 + puntosTRoja1 + Number(this.JuegoLimpioEq1);
      var toEq2 = puntosTAmarilla2 + puntosTRoja2 + Number(this.JuegoLimpioEq2);

      // Construir los datos finales
      const resultado = {
        partidoId,
        idTorneo,
        grupo,
        tipo: 'N',
        equipo1: {
          idEquipo: this.equipo1,
          goles: this.resultadoEq1,
          anotadores: this.anotadoresEq1,
          amarillas: this.tarjetasAmarillasEq1,
          rojas: this.tarjetasRojasEq1,
          ampliacionP: this.Ampliacion,
          penaltisEq1: this.penaltisEq1,
          juegoLimpio: toEq1,
          res: resEq1
        },
        equipo2: {
          idEquipo: this.equipo2,
          goles: this.resultadoEq2,
          anotadores: this.anotadoresEq2,
          amarillas: this.tarjetasAmarillasEq2,
          rojas: this.tarjetasRojasEq2,
          ampliacionP: this.Ampliacion,
          penaltisEq2: this.penaltisEq2,
          juegoLimpio: toEq2,
          res: resEq2
        }
      };


      this.resetearFormularioResul();

      Swal.fire({
        title: "¿Deseas insertar el resultado del partido?",
        text: "Una vez guardado, no podrás modificarlo.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, guardar",
        cancelButtonText: "Cancelar",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.apiRest.guardarResultadoP(resultado).subscribe((res: any) => {

            Swal.fire(res.msj);
            this.calendarioData = res.calendarioData;

          });
        }
      });

    } else {

      if (!this.ganadorW) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Debes seleccionar un ganador para W.'
        });
        return;
      }

      // Determinar ganador y perdedor
      let resEq1: 'G' | 'P';
      let resEq2: 'G' | 'P';
      let golesEq1 = 0;
      let golesEq2 = 0;

      if (this.ganadorW == this.equipo1) {
        resEq1 = 'G';
        resEq2 = 'P';
        golesEq1 = 1; // 🟢 Gol al ganador
      } else {
        resEq1 = 'P';
        resEq2 = 'G';
        golesEq2 = 1; // 🟢 Gol al ganador
      }

      // Construir resultado W
      const resultado = {
        partidoId,
        idTorneo,
        grupo,
        tipo: 'W', // ⚡ para que backend sepa que es walkover
        equipo1: {
          idEquipo: this.equipo1,
          goles: golesEq1,
          anotadores: [],
          amarillas: [],
          rojas: [],
          ampliacionP: 'N',
          penaltisEq1: 0,
          juegoLimpio: 0,
          res: resEq1
        },
        equipo2: {
          idEquipo: this.equipo2,
          goles: golesEq2,
          anotadores: [],
          amarillas: [],
          rojas: [],
          ampliacionP: 'N',
          penaltisEq2: 0,
          juegoLimpio: 0,
          res: resEq2
        }
      };

      Swal.fire({
        title: "¿Deseas guardar el resultado por W?",
        text: "Una vez guardado, no podrás modificarlo.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, guardar",
        cancelButtonText: "Cancelar",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.apiRest.guardarResultadoP(resultado).subscribe((res: any) => {
            Swal.fire(res.msj);
            this.calendarioData = res.calendarioData;
          });
        }
      });


    }


  }

  ValidarResultado(IdPartido: number, estado: number, idTorneo: string, fase: number) {

    if (estado != 2) {

      Swal.fire('Para validar el resultado debe ingresar primero el resultado.');

    } else if (estado == 2) {


      Swal.fire({
        title: "¿Deseas validar el resultado resultado del partido?",
        text: "Una vez guardado, no podrás modificarlo.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, guardar",
        cancelButtonText: "Cancelar",
        reverseButtons: true
      }).then((result) => {

        this.apiRest.ValidarResultado(IdPartido, idTorneo, fase).subscribe((res: any) => {
          Swal.fire(res.msj);
          this.calendarioData = res.calendarioData;
          this.grupos = res.grupos;
          this.clafGeneral = res.general;

        });
      });

    }


  }

  ReversarResultado(IdPartido: number, estado: number, idTorneo: string) {


    Swal.fire({
      title: "¿Deseas reversar el resultado del partido?",
      text: " Esto recalculara puntos goles y juego limpio.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    }).then((result) => {

      this.apiRest.ReversarResultado(IdPartido, idTorneo).subscribe((res: any) => {
        Swal.fire(res.msj);
        this.calendarioData = res.calendarioData;
        this.grupos = res.grupos;
        this.clafGeneral = res.general;

      });
    });


  }

  InscribirJugadoresPartido(partido: any) {

    const eq1 = partido.name_eq_1;
    const eq2 = partido.name_eq_2;

    Swal.fire({
      title: `¿Deseas inscribir jugadores a los equipos 
          <span style="color:#28a745; font-weight:bold;">${eq1}</span> 
          y 
          <span style="color:#dc3545; font-weight:bold;">${eq2}</span>?`,
      html: `<p style="font-size:14px; color:#6c757d;">
                Esto inscribirá todos los jugadores de la categoría al torneo.
              </p>`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "✅ Sí, inscribir",
      cancelButtonText: "❌ Cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.apiRest.InscribirJugadoresPartido(partido).subscribe((res: any) => {
          Swal.fire(res.msj);


        });

      }
    });

  }



  VerResultados(partido: any) {
    const equipo1Id = partido.fk_equipo1;
    const equipo2Id = partido.fk_equipo2;



    // Primero obtenemos jugadores del equipo A
    this.apiRest.jugadoresEquipo(equipo1Id, partido.fk_categoria_eq_1).subscribe((res1: any) => {
      const jugadores1 = res1.jugadores;

      // Luego, dentro del primer subscribe, obtenemos los del equipo B
      this.apiRest.jugadoresEquipo(equipo2Id, partido.fk_categoria_eq_2).subscribe((res2: any) => {
        const jugadores2 = res2.jugadores;

        // Función auxiliar para buscar nombre por ID
        const buscarNombre = (id: number, jugadores: any[]) => {


          const jugador = jugadores.find(j => Number(j.id) === id || Number(j.fk_jugador) === id);

          if (id == -1) {
            return jugador ? jugador.nombre : 'Autogol';
          } else {
            return jugador ? jugador.nombre : 'Desconocido';
          }

        };


        const equipoA = {
          id: equipo1Id,
          nombre: partido.name_eq_1,
          foto: partido.foto_eq1,
          categoria: partido.fk_categoria_eq_1,
          goles: (partido.goles || [])
            .filter((g: any) => g.fk_equipo === equipo1Id)
            .map((g: any) => buscarNombre(Number(g.fk_jugador), jugadores1)),
          amarillas: (partido.amarillas || [])
            .filter((a: any) => a.fk_equipo === equipo1Id)
            .map((a: any) => buscarNombre(Number(a.fk_jugador), jugadores1)),
          rojas: (partido.rojas || [])
            .filter((r: any) => r.fk_equipo === equipo1Id)
            .map((r: any) => buscarNombre(Number(r.fk_jugador), jugadores1)),
          resultado: {
            goles: Number(partido.resultado?.resul_equipo1 ?? 0),
            ampli_penaltis: partido.resultado.ampli_penaltis,
            juego_limpio: Number(partido.resultado?.pts_jl_limpio_equipo1 ?? 0)
          }
        };

        const equipoB = {
          id: equipo2Id,
          nombre: partido.name_eq_2,
          foto: partido.foto_eq2,
          categoria: partido.fk_categoria_eq_2,
          goles: (partido.goles || [])
            .filter((g: any) => g.fk_equipo === equipo2Id)
            .map((g: any) => buscarNombre(Number(g.fk_jugador), jugadores2)),
          amarillas: (partido.amarillas || [])
            .filter((a: any) => a.fk_equipo === equipo2Id)
            .map((a: any) => buscarNombre(Number(a.fk_jugador), jugadores2)),
          rojas: (partido.rojas || [])
            .filter((r: any) => r.fk_equipo === equipo2Id)
            .map((r: any) => buscarNombre(Number(r.fk_jugador), jugadores2)),
          resultado: {
            goles: Number(partido.resultado?.resul_equipo2 ?? 0),
            juego_limpio: Number(partido.resultado?.pts_jl_limpio_equipo2 ?? 0),
            ampli_penaltis: partido.resultado.ampli_penaltis,
          }
        };

        this.ResultadosEq1 = equipoA;
        console.log('japon ');

        console.log(this.ResultadosEq1.resultado.ampli_penaltis);

        this.ResultadosEq2 = equipoB;
      });
    });
  }


  validarFase(IdTorneo: number, numFase: number) {

    Swal.fire({
      title: "Desea generar partidos de la fase " + this.nameFase(numFase) + " ?",
      showDenyButton: true,
      confirmButtonText: "Si"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.isLoading = true;
        this.apiRest.validarFase(this.idTorneo, numFase).subscribe((res1: any) => {


          // this.calendarioData = res1.calendarioData;
          if (res1.success == true) {
            window.location.reload();

          } else {
            Swal.fire(res1.msj);
            this.isLoading = false;
          }


        });
      }
    });
  }

  validBoton(fase: any) {
    const faseNumber = Number(fase);

    switch (faseNumber) {
      case 1:
        if (this.torneoSelect.ValidF1 != 2) {
          return true;
        } else {
          return false;
        }

      case 2:
        if (this.torneoSelect.ValidF2 != 2) {
          return true;
        } else {
          return false;
        }


      default:
        return false; // Nunca debería llegar aquí por la validación previa
    }

  }


  deletecalenPr(id: number) {

    Swal.fire({
      title: "Desea eliminar este enfrentamiento?",
      showDenyButton: true,
      confirmButtonText: "Si"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.apiRest.deletecalenPr(id, this.idTorneo).subscribe((res: any) => {

          this.calendarioPre = res.calendarioPre
          Swal.fire(res.msj);

        });
      }
    });

  }

  CerrarFase(fase: number) {


    Swal.fire({
      title: "Desea cerrar la fase " + fase + " ?",
      showDenyButton: true,
      confirmButtonText: "Si"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.apiRest.CerrarFase(this.idTorneo, fase).subscribe((res: any) => {

          this.torneoSelect = res.torneo;
          Swal.fire({
            title: 'Mensaje',
            html: `<div style="font-size:14px; max-height:300px; overflow:auto;">${res.msj}</div>`,
            width: '900px'
          });

        });
      }
    });


  }

  getValidFase(torneo: Torneos | undefined, faseKey: string | number): number | undefined {

    var faseNum = Number(faseKey);
    const faseNum1 = faseNum + 1;

    if (!torneo) {
      return undefined;
    }
    const key = 'ValidF' + faseNum1;


    return (torneo as any)[key];
  }

  generarOpcionesDesdeQuinto(tipo: number): void {
    const nombresPuestos = [
      'Puesto 1',
      'Puesto 2',
      'Puesto 3',
      'Puesto 4',
      'Puesto 5',
      'Puesto 6',
      'Puesto 7',
      'Puesto 8',
      'Puesto 9',
      'Puesto 10',
      'Puesto 11',
      'Puesto 12',
      'Puesto 13',
      'Puesto 14',
      'Puesto 15',
      'Puesto 16',
      'Puesto 17',
      'Puesto 18',
      'Puesto 19',
      'Puesto 20',
      'Puesto 21',
      'Puesto 22',
      'Puesto 23',
      'Puesto 24'
    ];



    if (tipo == 1) {

      this.opcionesPuestosCL = nombresPuestos.map((texto, index) => ({
        value: index + 1,
        texto
      }));

    } else if (tipo == 2) {

      this.opcionesPuestosCL2 = nombresPuestos.map((texto, index) => ({
        value: index + 1,
        texto
      }));

    }

  }

  onControlTipo1(event: any): void {


    this.generarOpcionesDesdeQuinto(1);
    this.controlTipo1 = event.target.value;

  }

  onControlTipo2(event: any): void {


    this.generarOpcionesDesdeQuinto(2);
    this.controlTipo2 = event.target.value;

  }

  nameFase(fase: number) {
    const encontrado = this.nameFases.find(f => Number(f.fase) === fase);

    if (encontrado) {
      return encontrado.nombre;
    } else {
      return 'Fase';
    }
  }

  guardarNFase() {

    this.apiRest.guardarNFase(this.torneoSelect.id, this.FaseEditar, this.nombreFaseEdit).subscribe((res: any) => {
      this.nameFases = res.nameFases;
      Swal.fire(res.msj);
      this.nombreFaseEdit = '';

    });

  }


  guardarNGrupo() {

    this.apiRest.guardarNGrupo(this.GrupoEditar, this.nombreGrupoEdit).subscribe((res: any) => {
      this.nameFases = res.nameFases;

      if (res.success) {
        Swal.fire(res.msj);
        this.nombreGrupoEdit = '';
        this.ngOnInit();

      }

    });



  }


  editNameFase(fase: number) {

    this.FaseEditar = fase;
    this.mdNamefases = true;

    // Espera a que Angular actualice el DOM
    setTimeout(() => {
      const modalElement = document.getElementById('NamesFase');
      if (modalElement) {
        const modal = new Modal(modalElement);
        modal.show();
      } else {
        console.error('Modal element not found!');
      }
    }, 0);
  }


  editNameGrupo(grupo: any) {

    this.GrupoEditar = grupo;
    this.mdNameGrupo = true;

    // Espera a que Angular actualice el DOM
    setTimeout(() => {
      const modalElement = document.getElementById('NamesGrupo');
      if (modalElement) {
        const modal = new Modal(modalElement);
        modal.show();
      } else {
        console.error('Modal element not found!');
      }
    }, 0);
  }


  NuevoPartido(grupo: any) {

    this.GrupoSelect = grupo.value[0];

    this.apiRest.EquiposTorneo(this.torneoSelect.id).subscribe((res: any) => {
      this.EquiposTorneo = res.equipos

    });


    this.newPartido = true;

    // Espera a que Angular actualice el DOM
    setTimeout(() => {
      const modalElement = document.getElementById('NuevoPartido');
      if (modalElement) {
        const modal = new Modal(modalElement);
        modal.show();
      } else {
        console.error('Modal element not found!');
      }
    }, 0);

  }

  resetProgramacion() {
    this.canchaSeleccionada = 0;
    this.fechaSeleccionada = '';
    this.horaSeleccionada = '';
    this.JuezSeleccionada = 0;
    this.DelegadoSeleocionada = 0;

  }

  resetProgramacionPre(idPre: number) {
    this.IdPreSelect = idPre;
    this.canchaSeleccionada = 0;
    this.fechaSeleccionada = '';
    this.horaSeleccionada = '';
    this.JuezSeleccionada = 0;
    this.DelegadoSeleocionada = 0;

  }


  guardarNPartido() {
    // Validar que no estén vacíos
    if (!this.Nequipo1 || !this.Nequipo2) {
      Swal.fire('Debes seleccionar ambos equipos');
      return;
    }

    // Validar que no sean iguales
    if (this.Nequipo1 === this.Nequipo2) {
      Swal.fire('Los equipos no pueden ser el mismo');
      return;
    }

    // Si pasa las validaciones, llamar al API
    this.apiRest.guardarNPartido(this.GrupoSelect, this.Nequipo1, this.Nequipo2)
      .subscribe((res: any) => {
        if (res.success) {
          Swal.fire(res.msj);
          this.Nequipo1 = '';
          this.Nequipo2 = '';

          // 👇 Una vez guardado, consultar calendario
          this.apiRest.get_Calendary(this.idTorneo).subscribe((resp: any) => {
            this.calendarioData = resp.calendarioData;
          });
        }
      });
  }



  guardarProgramacion(idPartido: number) {
    // Validar campos
    if (
      !this.fechaSeleccionada ||
      !this.horaSeleccionada
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor complete todos los campos antes de guardar la programación.',
      });
      return;
    }

    // Confirmar con Swal
    Swal.fire({
      title: "¿Desea agregar esta programación?",
      showDenyButton: true,
      confirmButtonText: "Sí"
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;

        this.apiRest.guardarProgramacion(
          this.idTorneo,
          idPartido,
          this.fechaSeleccionada,
          this.horaSeleccionada,
          this.JuezSeleccionada,
          this.canchaSeleccionada,
          this.DelegadoSeleocionada
        ).subscribe((res1: any) => {
          if (res1.success === true) {
            Swal.fire(res1.msj);
            window.location.reload();
          }
          this.isLoading = false;

        });
      }
    });

  }

  guardarProgramacionPre() {
    if (
      !this.fechaSeleccionada ||
      !this.horaSeleccionada
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor complete todos los campos antes de guardar la programación.',
      });
      return;
    }

    // Confirmar con Swal
    Swal.fire({
      title: "¿Desea agregar esta programación?",
      showDenyButton: true,
      confirmButtonText: "Sí"
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;

        this.apiRest.guardarProgramacionPre(
          this.idTorneo,
          this.IdPreSelect,
          this.fechaSeleccionada,
          this.horaSeleccionada,
          this.JuezSeleccionada,
          this.canchaSeleccionada,
          this.DelegadoSeleocionada
        ).subscribe((res1: any) => {
          if (res1.success === true) {
            Swal.fire(res1.msj);
            this.resetProgramacion();

            this.apiRest.getPrePartido(this.idTorneo).subscribe((res: any) => {
              this.calendarioPre = res.calendarioPre

            });

          }
          this.isLoading = false;

        });
      }
    });
  }


  AnularPartido(idPartido: number, IdTorneo: number, estado: number) {

    Swal.fire({
      title: "¿Desea Anular este partido del torneo, tenga en cuenta que no se registrara resultados?",
      showDenyButton: true,
      confirmButtonText: "Sí"
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;

        this.apiRest.AnularPartido(
          idPartido, IdTorneo, estado
        ).subscribe((res1: any) => {

          if (res1.success === true) {
            Swal.fire(res1.msj);

            this.apiRest.get_Calendary(this.idTorneo).subscribe((res: any) => {
              this.calendarioData = res.calendarioData;
              this.router.navigate(['/InfoTorneo', this.idTorneo]);
            });
          } else {
            Swal.fire(res1.msj);
          }


        });

      }
    });

  }


  ActivarPartido(idPartido: number, IdTorneo: number, estado: number) {

    Swal.fire({
      title: "¿Desea Anular este partido del torneo, tenga en cuenta que no se registrara resultados?",
      showDenyButton: true,
      confirmButtonText: "Sí"
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;

        this.apiRest.AnularPartido(
          idPartido, IdTorneo, estado
        ).subscribe((res1: any) => {

          if (res1.success === true) {
            Swal.fire(res1.msj);

            this.apiRest.get_Calendary(this.idTorneo).subscribe((res: any) => {
              this.calendarioData = res.calendarioData;

            });
          }


        });

      }
    });

  }


  cerrarSesion() {
    this.apiRest.logOut();
    this.router.navigate(['/home']);
  }

  tipoResul() {
    console.log(this.Ampliacion);
  }


  VerTitulares(IdPartido: number) {

    this.idPartidoSelect = IdPartido;
    this.apiRest.jugadoresTorneoPartido(this.idTorneo, this.idPartidoSelect, this.usuario.fk_equipo).subscribe((res: any) => {
      this.jugadoresEquipo = res.jugadores.map((j: any) => ({
        ...j,
        seleccionado: false // para control en "Individual"
      }));


    });
  }


  guardarInscripcionJug() {
    // Validar que todos tengan rol

    const datos = this.jugadoresEquipo.map(j => ({
      id_jugador: j.id,
      rol: j.rol,
      num_jug: j.num_jug || ''
    }));


    this.apiRest.guardarInscripcionJug(this.idTorneo, this.idPartidoSelect, this.usuario.fk_equipo, datos).subscribe((res: any) => {
      Swal.fire(res.msj);
    });


  }


  guardarInscripcionAll(equipo: any[]) {
    // equipo es un arreglo de jugadores de ese equipo
    const idEquipo = equipo[0]?.fk_equipo;


    const jugadoresConRol = equipo.map(jugador => ({
      id_jugador: jugador.id,       // ajusta al nombre real en tu backend
      nombre: jugador.nombre,
      rol: jugador.rol || '',
      num_jug: jugador.num_jug || ''       // si no selecciona nada, lo dejamos vacío
    }));

    // También puedes obtener datos del equipo (ej: nombre, id)
    const datosEquipo = jugadoresConRol;


    this.apiRest.guardarInscripcionJug(this.idTorneo, this.idPartidoSelect, idEquipo, datosEquipo).subscribe((res: any) => {
      Swal.fire(res.msj);
    });




  }



  VerTitularesPartido(IdPartido: number) {
    this.idPartidoSelect = IdPartido;

    this.apiRest.jugadoresPartidoRol(this.idTorneo, this.idPartidoSelect)
      .subscribe((res: any) => {


        // Si el backend devuelve directamente un arreglo
        this.jugadoresInscritos = Array.isArray(res.JugadoresRol)
          ? res.JugadoresRol
          : Object.values(res.JugadoresRol || {});


        if (!this.jugadoresInscritos.length) {
          Swal.fire('No hay jugadores inscritos para este partido.');

        }
      });
  }

  cambiarEstadoW(partido: any) {
    this.equipo1 = partido.fk_equipo1;
    this.equipo2 = partido.fk_equipo2;

  }

  cambiarEstadoPart(equipoId: number, estadoActual: any): void {
    const msj = estadoActual
      ? '¿Desea excluir este equipo del torneo?'
      : '¿Desea incluir este equipo en el torneo?';

    Swal.fire({
      title: msj,
      showDenyButton: true,
      confirmButtonText: "Sí",
      denyButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;

        this.apiRest.cambiarEstadoPart(this.idTorneo, equipoId, estadoActual)
          .subscribe({
            next: (res: any) => {
              Swal.fire(res.msj);

              // Recargar equipos
              this.apiRest.get_All_equipos_torneo(this.idTorneo).subscribe({
                next: (res: any) => {
                  this.equiposTorneo = res.equiposTorneo;
                },
                error: (err) => {
                  console.error('Error al cargar equipos', err);
                },
                complete: () => {
                  this.isLoading = false;
                }
              });
            },
            error: (err) => {
              console.error('Error al cambiar estado', err);
              this.isLoading = false;
            }
          });
      }
    });
  }

  anularFase(fase: number) {
    Swal.fire({
      title: `¿Está seguro de reversar la fase ${fase}?`,
      text: 'Se eliminarán los calendarios y estadísticas de esta fase.',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: "Sí",
      denyButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;

        this.apiRest.anularFase(this.idTorneo, fase).subscribe({
          next: (res: any) => {
            Swal.fire(res.msj);
          },
          error: (err) => {
            console.error('Error al anular fase:', err);
            Swal.fire('Error al anular la fase');
          },
          complete: () => {
            this.isLoading = false;
            this.ngOnInit(); // recarga los datos al final
          }
        });
      }
    });
  }

  JugadoresParticipante(IdEquipo: number) {
    this.apiRest.jugadoresEquipoTorneo(this.torneoSelect.id, IdEquipo).subscribe((res: any) => {
      this.jugadoresEquipoPar = res.jugadores;

      if (this.jugadoresEquipoPar.length > 0) {
        this.jugadoresEquipoPar.shift();
      }

    });
  }

  RecalcularFase(fase: number) {


    this.isLoading = true;

    this.apiRest.RecalcularFase(this.torneoSelect.id, fase).subscribe((res: any) => {
      this.calendarioData = res.calendarioData;
      Swal.fire(res.msj);
      this.isLoading = false;
      this.ngOnInit();

    });


  }

  QuitarSancion(tipo: string, jugador: any) {

   
    let tipoTex = '';
    let msj = '';

    if (tipo === 'A') {
      tipoTex = 'Amarilla';
    } else if (tipo === 'R') {
      tipoTex = 'Roja';
    }


    this.apiRest.InfoTarjeta(this.torneoSelect.id, jugador.fk_jugador, tipo).subscribe((res: any) => {

      msj = res.msj;


      Swal.fire({
        title: msj,
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: "Sí",
        denyButtonText: "No"
      }).then((result) => {
        if (result.isConfirmed) {
          this.isLoading = true;


          this.apiRest.QuitarSancion(this.torneoSelect.id, jugador.fk_jugador, tipo).subscribe((res: any) => {
            
           Swal.fire(res.msj);
           this.VerTitularesPartido(this.idPartidoSelect);

          });
         
        } else if (result.isDenied) {
          Swal.fire('Cancelado', 'No se hicieron cambios', 'info');
        }
      });

    });


  }


}


