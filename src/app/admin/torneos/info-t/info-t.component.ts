import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ThemeService } from '../../../services/theme.service';
import {
  Equipos,
  Torneos,
  Grupos,
  Calendario,
  Canchas,
  Juez,
  nameFases,
  User,
} from '../../../interfaces/interfaces';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { FiltroPorNombrePipe } from '../../../filtro-por-nombre.pipe';
import { Modal } from 'bootstrap';
import { EnsureArrayPipe } from '../../../pipes/ensure-array.pipe';
declare var bootstrap: any;

@Component({
  selector: 'app-info-t',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FiltroPorNombrePipe,
    RouterModule,
    EnsureArrayPipe,
    NgSelectModule,
  ],
  templateUrl: './info-t.component.html',
  styleUrl: './info-t.component.css',
})
export class InfoTComponent implements OnInit {
  usuario!: User;
  torneos: Torneos[] = [];
  equipos: Equipos[] = [];
  equiposTorneo: Equipos[] = [];
  grupos: Grupos[] = [];
  jueces: Juez[] = [];
  Delegados: User[] = [];
  nameFases: nameFases[] = [];
  goleadores: any[] = [];
  vallamn: any[] = [];
  torneoSelect!: Torneos;
  creando = false;
  pathIm = environment.apiURL;
  idTorneo!: number;
  controlEdad = false;
  AddEquipoG!: boolean;
  mdNamefases!: boolean;
  mdNameGrupo!: boolean;
  newPartido!: boolean;
  AddIdGrupo!: number;
  equipoSeleccionado!: number;
  jugadoresDisponiblesClub: any[] = [];
  jugadoresInscritosTorneo: any[] = [];
  filtroInscripcion: string = '';
  inscribiendoJugadorId: number | null = null;
  filtroEquipo: string = '';
  VlInfo!: boolean;
  VlCalif!: boolean;
  VlParticipante!: boolean;
  formatoSeleccionado: string = 'ida';
  calendarioData: Record<string, Calendario[]> = {};
  imagenSeleccionada: string = '';
  isLoading: boolean = false;
  fechaSeleccionada: string = '';
  horaSeleccionada: string = '';
  canchaSeleccionada: number = 0;
  JuezSeleccionada: number = 0;
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
  clafGeneralF1: any;
  numero_fases!: number;
  addAfase = false;
  GrupoActual = 0;
  FaseActual = 0;
  nombreGrupoActual = '';
  jugadoresEquipo: any[] = [];
  jugadoresInscritos: any[] = [];
  DirectivosP: any[] = [];
  jugadorSeleccionadoIdClub: number | null = null;
  // Simulación de jugadores por equipo
  jugadoresEq1: any;
  jugadoresEq2: any;

  tipo1Efr!: any;
  tipo2Efr!: any;
  Equipo1gr!: any;
  Equipo2gr!: any;
  Posicion1gr!: any;
  Posicion2gr!: any;
  opcionesPuestos: { value: number; texto: string }[] = [];
  opcionesPuestosCL: { value: number; texto: string }[] = [];
  opcionesPuestosCL2: { value: number; texto: string }[] = [];
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
  ganadorW!: any;
  jugadoresEquipoPar: any[] = [];
  categoriaSeleccionadaT: any = null;
  direccion1!: any;
  entrenadores1!: any;
  entrenadores2!: any;
  delegado1!: any;
  delegado2!: any;
  asistente1!: any;
  asistente2!: any;
  nameEq1!: string;
  nameEq2!: string;
  idEq1!: number;
  idEq2!: number;
  idPartidoD!: number;
  contCabezaGR = 0;
  nameEqSelect: string = '';
  equipoSelect: any;
  equipoSelectJ: any;
  tarjetasEq1: any;
  tarjetasEq2: any;
  tabActiva: string = 'info';
  menuOpen: boolean = false;
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
    'Décimo',
  ];

  opciones = [
    { label: 'Titular', value: 'titular' },
    { label: 'Suplente', value: 'suplente' },
  ];

  viewModeF2: 'programacion' | 'resultados' = 'programacion';
  viewModeF3: 'programacion' | 'resultados' = 'programacion';
  viewModeF4: 'programacion' | 'resultados' = 'programacion';
  viewModeF5: 'programacion' | 'resultados' = 'programacion';
  viewModeF6: 'programacion' | 'resultados' = 'programacion';
  viewModeF7: 'programacion' | 'resultados' = 'programacion';

  gruposPorFase: { [key: number]: any[] } = {}; // <- asegúrate de tener esto generado
  modalInscritosAbierto = false;
  modalDireccionAbierto = false;
  modalProgramarAbierto = false;
  modalProgramarPartidoId: number | null = null;
  modalResultadoAbierto = false;
  partidoSeleccionadoResultado: any = null;
  filtroNombre: string = '';
  filtroEmail: string = '';
  DelegadoSeleccionada: number | null = null;

  constructor(
    private apiRest: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private acRouter: ActivatedRoute,
    public themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this.VlInfo = true;
    this.VlCalif = false;
    this.VlParticipante = false;
    this.isSuccess = false;

    this.usuario = this.apiRest.getUsuario()!;

    this.perfilUsuario = this.usuario ? this.usuario.perfil : 0;

    this.acRouter.params.subscribe((param) => {
      this.idTorneo = param['idTorneo'];
      this.cargarDatos();
    });
  }

  cargarDatos(): void {
    this.apiRest.getById_Torneo(this.idTorneo).subscribe((res: any) => {
      this.torneoSelect = res.torneo;
      this.torneoSelect.control_edad = res.torneo.control_edad === 'true';
      this.numero_fases = Number(this.torneoSelect.num_fases);
    });

    this.apiRest.GoleadorTorneo(this.idTorneo).subscribe((res: any) => {
      this.goleadores = res.goleadores;
    });

    this.apiRest.VallaMenosVencidaTorneo(this.idTorneo).subscribe((res: any) => {
      this.vallamn = res.vallas;
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
      this.clafGeneralF1 = res.generalFase1;
    });

    this.apiRest.get_Calendary(this.idTorneo).subscribe((res: any) => {
      this.calendarioData = res.calendarioData;
      this.contCabezaGR = res.contCabezaGR;
    });

    this.apiRest.get_All_jueces().subscribe((res: any) => {
      this.jueces = res.jueces;
    });

    this.apiRest.get_user_perfil(3).subscribe((res: any) => {
      this.Delegados = res.users;
    });

    this.apiRest.get_All_categorias_activas().subscribe((res: any) => {
      this.categoriasDisponibles = res.categoriasDisponibles.map((cat: any) => ({
        id: Number(cat.id),
        nombre: cat.nombre,
      }));
    });

    this.apiRest.getPrePartido(this.idTorneo).subscribe((res: any) => {
      this.calendarioPre = res.calendarioPre;
    });

    this.apiRest.get_All_canchas().subscribe((res: any) => {
      this.canchas = res.canchas;
    });
  }

  get todosLosPartidos(): Calendario[] {
    return Object.values(this.calendarioData).flat();
  }
  get totalPartidos(): number { return this.todosLosPartidos.length; }
  get partidosValidados(): number { return this.todosLosPartidos.filter(p => p.estado === 3).length; }
  get partidosProgramados(): number { return this.todosLosPartidos.filter(p => p.estado === 1).length; }
  get partidosRegistrados(): number { return this.todosLosPartidos.filter(p => p.estado === 2).length; }
  get partidosAnulados(): number { return this.todosLosPartidos.filter(p => p.estado === 4).length; }
  get partidosSinProg(): number { return this.todosLosPartidos.filter(p => p.estado === 0).length; }
  get porcentajeAvance(): number {
    if (!this.totalPartidos) return 0;
    return Math.round((this.partidosValidados / this.totalPartidos) * 100);
  }
  get proximosPartidos(): Calendario[] {
    return this.todosLosPartidos.filter(p => p.estado < 3).slice(0, 6);
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
    return this.grupos.filter((g) => g.fase === fase);
  }

  getGruposFase(fase: number): Grupos[] {
    return this.grupos.filter((g: any) => Number(g.fase) === fase);
  }

  getTotalEquiposFase(fase: number): number {
    return this.getGruposFase(fase).reduce((sum: number, g: any) => sum + (g.detalle?.length || 0), 0);
  }

  range(n: number): number[] {
    return Array.from({ length: Math.max(0, +n || 0) }, (_, i) => i);
  }

  actualizarOpciones() {
    const grupo = this.grupos.find((g) => Number(g.id) == this.Equipo1gr);
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
        texto: this.ordinales[i - 1] || `${i}°`,
      });
    }

    // Si sigue vacío, llenar con valores por defecto
    if (this.opcionesPuestos.length === 0) {
      const defaultPuestos = ['Primero', 'Segundo', 'Tercero', 'Cuarto'];
      this.opcionesPuestos = defaultPuestos.map((texto, index) => ({
        value: index + 1,
        texto,
      }));
    }
  }

  equiposFiltrados(): Equipos[] {
    return this.equipos.filter((eq) =>
      eq.nombre.toLowerCase().includes(this.filtroEquipo.toLowerCase()),
    );
  }

  guardarEquipo() {
    if (!this.equipoSeleccionado) {
      Swal.fire('Por favor seleccionar equipo.');
    } else {
      this.apiRest
        .AddEquipoGr(this.idTorneo, this.AddIdGrupo, this.equipoSeleccionado)
        .subscribe((res: any) => {
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
      fase: this.FaseActual,
    };

    Swal.fire({
      title:
        '¿Desea agregar este enfrentamiento al grupo ' + this.GrupoActual + '?',
      showDenyButton: true,
      confirmButtonText: 'Sí',
      denyButtonText: 'No',
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
      title: 'Desea eliminar este equipo?',
      showDenyButton: true,
      confirmButtonText: 'Si',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.apiRest
          .deleteEqGr(idGrupo, idEquipo, this.idTorneo)
          .subscribe((res: any) => {
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
      title:
        'Desea generar calendario Fase 1?  Se eliminaran los calendarios anteriores no validados.',
      showDenyButton: true,
      confirmButtonText: 'Si',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.isLoading = true;
        this.apiRest
          .calendarioPartidos(this.idTorneo, tipoCalendary)
          .subscribe((res: any) => {
            if (res.success == true) {
              this.calendarioData = res.calendarioData;
              this.torneoSelect = res.torneo;
              this.isLoading = false;
            } else if (res.success == false) {
              this.isLoading = false;
              Swal.fire({
                icon: 'error',
                title: 'Mensaje de usuario',
                html: res.msj, // Usa html en vez de text
              });
            }
          });
      }
    });
  }

  UpdateClanedary(
    idCalendary: number,
    Fecha: string,
    Hora: string,
    Cancha: string,
    Juez: number,
  ) {
    this.alertCalendary = '';
    if (!Fecha || !Hora) {
      Swal.fire('Debe configurar hora y fecha.');
    } else {
      this.isLoading = true;
      this.apiRest
        .UpdateClanedary(this.idTorneo, idCalendary, Fecha, Hora, Cancha, Juez)
        .subscribe((res: any) => {
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

    const categoria = this.categoriasDisponibles.find((cat) => cat.id === id);
    return categoria ? categoria.nombre : 'Sin categoría';
  }

  getNombreCancha(idCancha: string | null | undefined): string {
    const id = Number(idCancha);

    if (!idCancha || isNaN(id)) {
      return 'Sin cancha';
    }

    const cancha = this.canchas.find((cat) => cat.id == id);

    return cancha ? cancha.nombre : 'Sin cancha';
  }

  generarSelectsAnotadores(
    SelecEquipo: number,
    equipo: string,
    categoria: number,
  ) {
    this.apiRest
      .jugadoresEquipoTorneo(this.torneoSelect.id, equipo, this.idPartidoSelect)
      .subscribe((res: any) => {
        const sortNombre = (a: any, b: any) => a.nombre.localeCompare(b.nombre);
        if (SelecEquipo == 1) {
          this.equipo1 = equipo;
          this.jugadoresEq1 = (res.jugadores || []).sort(sortNombre);
          this.tarjetasEq1 = res.tarjetas;
        } else if (SelecEquipo == 2) {
          this.equipo2 = equipo;
          this.jugadoresEq2 = (res.jugadores || []).sort(sortNombre);
          this.tarjetasEq2 = res.tarjetas;
        }
      });

    // Crea arreglos del tamaño de goles para mostrar selects

    this.anotadoresEq1 = Array.from({ length: this.resultadoEq1 }, () => null);
    this.anotadoresEq2 = Array.from({ length: this.resultadoEq2 }, () => null);
  }

  generarTarjetas(equipo: 'eq1' | 'eq2', tipo: 'amarilla' | 'roja') {
    const cantidad =
      equipo === 'eq1'
        ? tipo === 'amarilla'
          ? this.cantidadAmarillasEq1
          : this.cantidadRojasEq1
        : tipo === 'amarilla'
          ? this.cantidadAmarillasEq2
          : this.cantidadRojasEq2;

    const nuevaLista = Array(cantidad).fill(null);

    if (equipo === 'eq1') {
      if (tipo === 'amarilla') this.tarjetasAmarillasEq1 = nuevaLista;
      else this.tarjetasRojasEq1 = nuevaLista;
    } else {
      if (tipo === 'amarilla') this.tarjetasAmarillasEq2 = nuevaLista;
      else this.tarjetasRojasEq2 = nuevaLista;
    }
  }

  resetearFormularioResul(IdPArtido?: any) {
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
    this.estadoSwitch = true;
    this.idPartidoSelect = IdPArtido;
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  getAnotador(equipo: number, index: number): any {
    const id = equipo === 1 ? this.anotadoresEq1[index] : this.anotadoresEq2[index];
    const jugadores = equipo === 1 ? this.jugadoresEq1 : this.jugadoresEq2;
    return jugadores?.find((j: any) => j.id === id) || null;
  }

  setAnotador(equipo: number, index: number, jugador: any) {
    if (jugador?.sancionR === 1) {
      Swal.fire({
        icon: 'error',
        title: '🟥 Jugador no disponible',
        html: `<b>${jugador.nombre}</b> tiene una <strong>tarjeta roja activa</strong> y no puede participar en este partido.`,
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#ef4444'
      });
      if (equipo === 1) {
        this.anotadoresEq1 = [...this.anotadoresEq1];
        this.anotadoresEq1[index] = null;
      } else {
        this.anotadoresEq2 = [...this.anotadoresEq2];
        this.anotadoresEq2[index] = null;
      }
      return;
    }
    if (equipo === 1) {
      this.anotadoresEq1[index] = jugador?.id ?? null;
    } else {
      this.anotadoresEq2[index] = jugador?.id ?? null;
    }
  }

  getTarjeta(tipo: 'amarillaEq1'|'amarillaEq2'|'rojaEq1'|'rojaEq2', index: number): any {
    const map: any = {
      amarillaEq1: [this.tarjetasAmarillasEq1, this.jugadoresEq1],
      amarillaEq2: [this.tarjetasAmarillasEq2, this.jugadoresEq2],
      rojaEq1:     [this.tarjetasRojasEq1,     this.jugadoresEq1],
      rojaEq2:     [this.tarjetasRojasEq2,     this.jugadoresEq2],
    };
    const [arr, jugadores] = map[tipo];
    return jugadores?.find((j: any) => j.id === arr[index]) || null;
  }

  setTarjeta(tipo: 'amarillaEq1'|'amarillaEq2'|'rojaEq1'|'rojaEq2', index: number, jugador: any) {
    const id = jugador?.id ?? null;
    if (tipo === 'amarillaEq1') this.tarjetasAmarillasEq1[index] = id;
    else if (tipo === 'amarillaEq2') this.tarjetasAmarillasEq2[index] = id;
    else if (tipo === 'rojaEq1')     this.tarjetasRojasEq1[index] = id;
    else if (tipo === 'rojaEq2')     this.tarjetasRojasEq2[index] = id;
  }

  guardarResultadoP(partidoId: number, idTorneo: number, grupo: string): void {
    if (this.estadoSwitch) {
      const errores: string[] = [];

      if (
        isNaN(this.resultadoEq1) ||
        this.resultadoEq1 === '' ||
        this.resultadoEq1 < 0 ||
        isNaN(this.resultadoEq2) ||
        this.resultadoEq2 === '' ||
        this.resultadoEq2 < 0
      ) {
        errores.push('Debe ingresar un resultado valido');
      }

      // Validación de goles y anotadores
      if (this.resultadoEq1 > 0) {
        if (
          this.anotadoresEq1.length !== this.resultadoEq1 ||
          this.anotadoresEq1.some((id) => !id)
        ) {
          errores.push('Debes seleccionar todos los anotadores del equipo 1.');
        }
      }

      if (this.resultadoEq2 > 0) {
        if (
          this.anotadoresEq2.length !== this.resultadoEq2 ||
          this.anotadoresEq2.some((id) => !id)
        ) {
          errores.push('Debes seleccionar todos los anotadores del equipo 2.');
        }
      }

      // Validación de tarjetas
      if (
        this.cantidadAmarillasEq1 > 0 &&
        this.tarjetasAmarillasEq1.some((id) => !id)
      ) {
        errores.push('Faltan jugadores para tarjetas amarillas del equipo 1.');
      }

      if (
        this.cantidadRojasEq1 > 0 &&
        this.tarjetasRojasEq1.some((id) => !id)
      ) {
        errores.push('Faltan jugadores para tarjetas rojas del equipo 1.');
      }

      if (
        this.cantidadAmarillasEq2 > 0 &&
        this.tarjetasAmarillasEq2.some((id) => !id)
      ) {
        errores.push('Faltan jugadores para tarjetas amarillas del equipo 2.');
      }

      if (
        this.cantidadRojasEq2 > 0 &&
        this.tarjetasRojasEq2.some((id) => !id)
      ) {
        errores.push('Faltan jugadores para tarjetas rojas del equipo 2.');
      }

      if (
        this.Ampliacion == 'S' &&
        this.penaltisEq1 == '' &&
        this.penaltisEq2 == ''
      ) {
        errores.push(
          'Al activar ampliaciòn por penaltis debe ingresar los resultados.',
        );
      }

      // Mostrar errores si hay y detener
      if (errores.length > 0) {
        Swal.fire({
          icon: 'error',
          title: 'Errores encontrados',
          html: errores.join('<br>'),
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
          res: resEq1,
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
          res: resEq2,
        },
      };

      this.resetearFormularioResul();

      Swal.fire({
        title: '¿Deseas insertar el resultado del partido?',
        text: 'Una vez guardado, no podrás modificarlo.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, guardar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.apiRest.guardarResultadoP(resultado).subscribe({
            next: (res: any) => {
              Swal.fire(res.msj);
              this.calendarioData = res.calendarioData;
            },
            error: () => {
              Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo guardar el resultado. Intenta de nuevo.' });
            }
          });
        }
      });
    } else {
      if (!this.ganadorW) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Debes seleccionar un ganador para W.',
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
          res: resEq1,
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
          res: resEq2,
        },
      };

      Swal.fire({
        title: '¿Deseas guardar el resultado por W?',
        text: 'Una vez guardado, no podrás modificarlo.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, guardar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.apiRest.guardarResultadoP(resultado).subscribe({
            next: (res: any) => {
              Swal.fire(res.msj);
              this.calendarioData = res.calendarioData;
            },
            error: () => {
              Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo guardar el resultado. Intenta de nuevo.' });
            }
          });
        }
      });
    }
  }

  ValidarResultado(
    IdPartido: number,
    estado: number,
    idTorneo: string,
    fase: number,
  ) {
    if (estado == 0) {
      Swal.fire(
        'Para validar el resultado debe ingresar primero el resultado.',
      );
    } else {
      Swal.fire({
        title: '¿Deseas validar el resultado del partido?',
        text: 'Una vez guardado, no podrás modificarlo.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, validar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Validando resultado...',
            text: 'Por favor espera',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            didOpen: () => Swal.showLoading(),
          });
          this.apiRest
            .ValidarResultado(IdPartido, idTorneo, fase)
            .subscribe({
              next: (res: any) => {
                this.calendarioData = res.calendarioData;
                this.grupos = res.grupos;
                this.clafGeneral = res.general;
                Swal.fire({
                  icon: 'success',
                  title: '¡Resultado validado!',
                  text: res.msj,
                  timer: 2000,
                  showConfirmButton: false,
                });
              },
              error: () => {
                Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo validar. Intenta de nuevo.' });
              },
            });
        }
      });
    }
  }

  ReversarResultado(IdPartido: number, estado: number, idTorneo: string) {
    Swal.fire({
      title: '¿Deseas reversar el resultado del partido?',
      text: 'Esto recalculará puntos, goles y juego limpio.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => {
      // Si NO confirma, no hacemos nada
      if (!result.isConfirmed) {
        return;
      }

      // Si confirma, ejecuta el servicio
      this.apiRest
        .ReversarResultado(IdPartido, idTorneo)
        .subscribe((res: any) => {
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
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#6c757d',
      confirmButtonText: '✅ Sí, inscribir',
      cancelButtonText: '❌ Cancelar',
      reverseButtons: true,
    }).then((result) => {
      // Si NO confirma, no hace nada
      if (!result.isConfirmed) {
        return;
      }

      // Si confirma, ejecuta el servicio
      this.apiRest.InscribirJugadoresPartido(partido).subscribe((res: any) => {
        Swal.fire(res.msj);
      });
    });
  }

  VerResultados(partido: any) {
    const equipo1Id = partido.fk_equipo1;
    const equipo2Id = partido.fk_equipo2;

    // Primero obtenemos jugadores del equipo A
    this.apiRest
      .jugadoresEquipo(equipo1Id, partido.fk_categoria_eq_1)
      .subscribe((res1: any) => {
        const jugadores1 = res1.jugadores;

        // Luego, dentro del primer subscribe, obtenemos los del equipo B
        this.apiRest
          .jugadoresEquipo(equipo2Id, partido.fk_categoria_eq_2)
          .subscribe((res2: any) => {
            const jugadores2 = res2.jugadores;

            // Función auxiliar para buscar nombre por ID
            const buscarNombre = (id: number, jugadores: any[]) => {
              const jugador = jugadores.find(
                (j) => Number(j.id) === id || Number(j.fk_jugador) === id,
              );

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
                .map((g: any) =>
                  buscarNombre(Number(g.fk_jugador), jugadores1),
                ),
              amarillas: (partido.amarillas || [])
                .filter((a: any) => Number(a.fk_equipo) === Number(equipo1Id))
                .map((a: any) =>
                  buscarNombre(Number(a.fk_jugador), jugadores1),
                ),
              rojas: (partido.rojas || [])
                .filter((r: any) => Number(r.fk_equipo) === Number(equipo1Id))
                .map((r: any) =>
                  buscarNombre(Number(r.fk_jugador), jugadores1),
                ),
              resultado: {
                goles: Number(partido.resultado?.resul_equipo1 ?? 0),
                ampli_penaltis: partido.resultado.ampli_penaltis,
                juego_limpio: Number(
                  partido.resultado?.pts_jl_limpio_equipo1 ?? 0,
                ),
              },
            };

            const equipoB = {
              id: equipo2Id,
              nombre: partido.name_eq_2,
              foto: partido.foto_eq2,
              categoria: partido.fk_categoria_eq_2,
              goles: (partido.goles || [])
                .filter((g: any) => g.fk_equipo === equipo2Id)
                .map((g: any) =>
                  buscarNombre(Number(g.fk_jugador), jugadores2),
                ),
              amarillas: (partido.amarillas || [])
                .filter((a: any) => Number(a.fk_equipo) === Number(equipo2Id))
                .map((a: any) =>
                  buscarNombre(Number(a.fk_jugador), jugadores2),
                ),
              rojas: (partido.rojas || [])
                .filter((r: any) => Number(r.fk_equipo) === Number(equipo2Id))
                .map((r: any) =>
                  buscarNombre(Number(r.fk_jugador), jugadores2),
                ),
              resultado: {
                goles: Number(partido.resultado?.resul_equipo2 ?? 0),
                juego_limpio: Number(
                  partido.resultado?.pts_jl_limpio_equipo2 ?? 0,
                ),
                ampli_penaltis: partido.resultado.ampli_penaltis,
              },
            };

            this.ResultadosEq1 = equipoA;

            this.ResultadosEq2 = equipoB;
          });
      });
  }

  validarFase(IdTorneo: number, numFase: number) {
    Swal.fire({
      title:
        'Desea generar partidos de la fase ' + this.nameFase(numFase) + ' ?',
      showDenyButton: true,
      confirmButtonText: 'Si',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.isLoading = true;
        this.apiRest
          .validarFase(this.idTorneo, numFase)
          .subscribe((res1: any) => {
            if (res1.success == true) {
              this.cargarDatos();
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
      title: 'Desea eliminar este enfrentamiento?',
      showDenyButton: true,
      confirmButtonText: 'Si',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.apiRest.deletecalenPr(id, this.idTorneo).subscribe((res: any) => {
          this.calendarioPre = res.calendarioPre;
          Swal.fire(res.msj);
        });
      }
    });
  }

  CerrarFase(fase: number) {
    Swal.fire({
      title: 'Desea cerrar la fase ' + fase + ' ?',
      showDenyButton: true,
      confirmButtonText: 'Si',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.apiRest.CerrarFase(this.idTorneo, fase).subscribe((res: any) => {
          this.torneoSelect = res.torneo;
          Swal.fire({
            title: 'Mensaje',
            html: `<div style="font-size:14px; max-height:300px; overflow:auto;">${res.msj}</div>`,
            width: '900px',
          });
        });
      }
    });
  }

  getValidFase(
    torneo: Torneos | undefined,
    faseKey: string | number,
  ): number | undefined {
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
      'Puesto 24',
    ];

    if (tipo == 1) {
      this.opcionesPuestosCL = nombresPuestos.map((texto, index) => ({
        value: index + 1,
        texto,
      }));
    } else if (tipo == 2) {
      this.opcionesPuestosCL2 = nombresPuestos.map((texto, index) => ({
        value: index + 1,
        texto,
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
    const encontrado = this.nameFases.find((f) => Number(f.fase) === fase);

    if (encontrado) {
      return encontrado.nombre;
    } else {
      return 'Fase';
    }
  }

  guardarNFase() {
    this.apiRest
      .guardarNFase(this.torneoSelect.id, this.FaseEditar, this.nombreFaseEdit)
      .subscribe((res: any) => {
        this.nameFases = res.nameFases;
        Swal.fire(res.msj);
        this.nombreFaseEdit = '';
      });
  }

  guardarNGrupo() {
    this.apiRest
      .guardarNGrupo(this.GrupoEditar, this.nombreGrupoEdit)
      .subscribe((res: any) => {
        this.nameFases = res.nameFases;

        if (res.success) {
          Swal.fire(res.msj);
          this.nombreGrupoEdit = '';
          this.cargarDatos();
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
      this.EquiposTorneo = res.equipos;
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
    this.DelegadoSeleccionada = 0;
  }

  resetProgramacionPre(idPre: number) {
    this.IdPreSelect = idPre;
    this.canchaSeleccionada = 0;
    this.fechaSeleccionada = '';
    this.horaSeleccionada = '';
    this.JuezSeleccionada = 0;
    this.DelegadoSeleccionada = 0;
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
    this.apiRest
      .guardarNPartido(this.GrupoSelect, this.Nequipo1, this.Nequipo2)
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
    if (!this.fechaSeleccionada || !this.horaSeleccionada) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor complete todos los campos antes de guardar la programación.',
      });
      return;
    }

    // Confirmar con Swal
    Swal.fire({
      title: '¿Desea agregar esta programación?',
      showDenyButton: true,
      confirmButtonText: 'Sí',
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;

        this.apiRest
          .guardarProgramacion(
            this.idTorneo,
            idPartido,
            this.fechaSeleccionada,
            this.horaSeleccionada,
            this.JuezSeleccionada,
            this.canchaSeleccionada,
            this.DelegadoSeleccionada ?? 0,
          )
          .subscribe((res1: any) => {
            if (res1.success === true) {
              Swal.fire(res1.msj);
              this.cargarDatos();
            }
            this.isLoading = false;
          });
      }
    });
  }

  guardarProgramacionPre() {
    if (!this.fechaSeleccionada || !this.horaSeleccionada) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor complete todos los campos antes de guardar la programación.',
      });
      return;
    }

    // Confirmar con Swal
    Swal.fire({
      title: '¿Desea agregar esta programación?',
      showDenyButton: true,
      confirmButtonText: 'Sí',
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;

        this.apiRest
          .guardarProgramacionPre(
            this.idTorneo,
            this.IdPreSelect,
            this.fechaSeleccionada,
            this.horaSeleccionada,
            this.JuezSeleccionada,
            this.canchaSeleccionada,
            this.DelegadoSeleccionada ?? 0,
          )
          .subscribe((res1: any) => {
            if (res1.success === true) {
              Swal.fire(res1.msj);
              this.resetProgramacion();

              this.apiRest
                .getPrePartido(this.idTorneo)
                .subscribe((res: any) => {
                  this.calendarioPre = res.calendarioPre;
                });
            }
            this.isLoading = false;
          });
      }
    });
  }

  AnularPartido(idPartido: number, IdTorneo: number, estado: number) {
    Swal.fire({
      icon: 'warning',
      title: '¿Anular partido?',
      html: `<p style="font-size:13px;color:#555">Al anular este partido <b>se eliminará del torneo</b> y <b>no se tomará en cuenta para las estadísticas</b>.<br><br>Si los equipos deben volver a enfrentarse, deberá crear el partido nuevamente.</p>`,
      showDenyButton: true,
      confirmButtonText: 'Sí, anular',
      denyButtonText: 'Cancelar',
      confirmButtonColor: '#e11d48',
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;

        this.apiRest
          .AnularPartido(idPartido, IdTorneo, estado)
          .subscribe((res1: any) => {
            if (res1.success === true) {
              Swal.fire({
                icon: 'success',
                title: 'Partido anulado',
                text: 'El partido fue anulado y no se contará en las estadísticas del torneo.',
                timer: 2500,
                showConfirmButton: false,
              });
              this.apiRest
                .get_Calendary(this.idTorneo)
                .subscribe((res: any) => {
                  this.calendarioData = res.calendarioData;
                  this.router.navigate(['/InfoT', this.idTorneo]);
                });
            } else {
              Swal.fire({ icon: 'error', title: 'Error', text: res1.msj });
            }
          });
      }
    });
  }

  ActivarPartido(idPartido: number, IdTorneo: number, estado: number) {
    Swal.fire({
      icon: 'question',
      title: '¿Reactivar partido?',
      text: 'El partido volverá a estar activo en el torneo.',
      showDenyButton: true,
      confirmButtonText: 'Sí, reactivar',
      denyButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;

        this.apiRest
          .AnularPartido(idPartido, IdTorneo, estado)
          .subscribe((res1: any) => {
            if (res1.success === true) {
              Swal.fire({
                icon: 'success',
                title: 'Partido reactivado',
                timer: 2000,
                showConfirmButton: false,
              });
              this.apiRest
                .get_Calendary(this.idTorneo)
                .subscribe((res: any) => {
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

  irAlHome() {
    this.router.navigate(['/home']);
  }

  irADelegaCh() {
    this.router.navigate(['/DelegaCh']);
  }

  async descargarExcelEquipos() {
    const t = this.torneoSelect;
    if (!t) return;

    const ExcelJSModule = await import('exceljs');
    const ExcelJS = (ExcelJSModule as any).default ?? ExcelJSModule;
    const nombreTorneo = t.nombre || 'Torneo';
    const categoriaNombre = this.getNombreCategoria(String(t.categoria));
    const numFases = Number(t.num_fases) || 1;
    const gruposFase1 = this.grupos.filter((g: any) => Number(g.fase) === 1);
    const equiposActivos = this.equiposTorneo.filter((eq: any) => eq.estado === true);
    const wb = new ExcelJS.Workbook();

    const hdr = (row: any, bgArgb: string) => {
      row.height = 22;
      row.eachCell({ includeEmpty: true }, (c: any) => {
        c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bgArgb } };
        c.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 10, name: 'Calibri' };
        c.alignment = { vertical: 'middle', horizontal: 'center' };
      });
    };
    const dat = (row: any, even: boolean, hl: number[] = []) => {
      row.height = 18;
      row.eachCell({ includeEmpty: true }, (c: any, col: number) => {
        const h = hl.includes(col);
        c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: h ? 'FFFFF3CD' : (even ? 'FFF3F4F6' : 'FFFFFFFF') } };
        c.font = { size: 10, name: 'Calibri', bold: h };
        c.alignment = { vertical: 'middle', horizontal: h ? 'center' : 'left' };
      });
    };

    const sec = (ws: any, label: string) => {
      const r = ws.addRow([label]);
      r.height = 16;
      r.eachCell({ includeEmpty: true }, (c: any) => {
        c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE8EDF8' } };
        c.font = { bold: true, italic: true, size: 9, name: 'Calibri', color: { argb: 'FF1F3864' } };
        c.alignment = { vertical: 'middle', horizontal: 'left' };
      });
    };

    // TORNEO
    const wsTorneo = wb.addWorksheet('TORNEO');
    wsTorneo.columns = [{ width: 28 }, { width: 50 }];
    hdr(wsTorneo.addRow(['CAMPO', 'VALOR']), 'FF1F3864');
    sec(wsTorneo, '▸ Información básica');
    [['NOMBRE', t.nombre || ''], ['DESCRIPCION', t.descripcion || ''],
     ['CATEGORIA', categoriaNombre], ['CONTROL EDAD', t.control_edad ? 'Si' : 'No'],
    ].forEach((r, i) => dat(wsTorneo.addRow(r), i % 2 === 0));
    sec(wsTorneo, '▸ Fechas');
    [['FECHA INICIO', t.fecha_inicio || ''], ['FECHA FIN', t.fecha_fin || ''],
     ['FECHA LIMITE NOMINA', t.fecha_limite || ''],
    ].forEach((r, i) => dat(wsTorneo.addRow(r), i % 2 === 0));
    sec(wsTorneo, '▸ Configuración');
    [['MAX JUGADORES', t.numero_maximo_jug || ''], ['NUM FASES', t.num_fases || ''],
    ].forEach((r, i) => dat(wsTorneo.addRow(r), i % 2 === 0));
    sec(wsTorneo, '▸ Grupos por fase');
    for (let f = 1; f <= numFases; f++) {
      const cnt = this.grupos.filter((g: any) => Number(g.fase) === f).length;
      dat(wsTorneo.addRow([`GRUPOS FASE ${f}`, cnt]), (f - 1) % 2 === 0);
    }

    // EQUIPOS
    const wsEq = wb.addWorksheet('EQUIPOS');
    wsEq.columns = [{ width: 50 }, { width: 10 }];
    hdr(wsEq.addRow(['NOMBRE EQUIPO', 'ID']), 'FF1D4ED8');
    equiposActivos.forEach((eq: any, i: number) => {
      const row = wsEq.addRow([eq.nombre || '', Number(eq.id)]);
      dat(row, i % 2 === 0);
      row.getCell(2).alignment = { horizontal: 'center', vertical: 'middle' };
    });

    // CANCHAS
    const wsCanchas = wb.addWorksheet('CANCHAS');
    wsCanchas.columns = [{ width: 10 }, { width: 40 }, { width: 30 }];
    hdr(wsCanchas.addRow(['ID', 'NOMBRE', 'DESCRIPCION']), 'FF0F766E');
    (this.canchas || []).forEach((c: any, i: number) => {
      const row = wsCanchas.addRow([Number(c.id), c.nombre || '', c.descripcion || '']);
      dat(row, i % 2 === 0);
      row.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
    });

    // JUECES
    const wsJueces = wb.addWorksheet('JUECES');
    wsJueces.columns = [{ width: 10 }, { width: 35 }, { width: 20 }];
    hdr(wsJueces.addRow(['ID', 'NOMBRE', 'IDENTIFICACION']), 'FFBE123C');
    (this.jueces || []).forEach((j: any, i: number) => {
      const row = wsJueces.addRow([Number(j.id), j.nombre || '', j.identificacion || '']);
      dat(row, i % 2 === 0);
      row.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
    });

    // DELEGADOS
    const wsDels = wb.addWorksheet('DELEGADOS');
    wsDels.columns = [{ width: 10 }, { width: 35 }];
    hdr(wsDels.addRow(['ID', 'NOMBRE']), 'FF4338CA');
    (this.Delegados || []).forEach((d: any, i: number) => {
      const row = wsDels.addRow([Number(d.id), d.nombre || '']);
      dat(row, i % 2 === 0);
      row.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
    });

    // GRUPO sheets (vacíos)
    for (const grupo of gruposFase1) {
      const ws = wb.addWorksheet(`GRUPO ${grupo.nombre}`);
      ws.columns = [{ width: 50 }, { width: 10 }];
      hdr(ws.addRow(['NOMBRE EQUIPO', 'ID']), 'FF059669');
      for (let i = 0; i < 10; i++) dat(ws.addRow(['', '']), i % 2 === 0);
    }

    // FASE 1 (vacía — consultar pestañas CANCHAS, JUECES, DELEGADOS para los IDs)
    const wsF1 = wb.addWorksheet('FASE 1');
    wsF1.columns = [
      { width: 13 }, { width: 32 }, { width: 15 }, { width: 32 },
      { width: 22 }, { width: 14 }, { width: 13 }, { width: 13 }, { width: 13 },
    ];
    hdr(wsF1.addRow(['ID_LOCAL ★', 'NOMBRE_LOCAL', 'ID_VISITANTE ★', 'NOMBRE_VISITANTE',
      'FECHA (AAAA-MM-DD)', 'HORA (HH:MM)', 'ID_CANCHA', 'ID_JUEZ', 'ID_DELEGADO']), 'FFD97706');
    for (let i = 0; i < 20; i++) dat(wsF1.addRow(['', '', '', '', '', '', '', '', '']), i % 2 === 0, [1, 3]);

    // FASE 2+ (vacíos)
    for (let fase = 2; fase <= numFases; fase++) {
      const ws = wb.addWorksheet(`FASE ${fase}`);
      ws.columns = [{ width: 18 }, { width: 20 }, { width: 14 }, { width: 16 }, { width: 4 }, { width: 20 }, { width: 14 }, { width: 16 }];
      hdr(ws.addRow(['GRUPO_DESTINO', 'TIPO_EQ1', 'GRUPO_EQ1', 'POSICION_EQ1', '', 'TIPO_EQ2', 'GRUPO_EQ2', 'POSICION_EQ2']), 'FF7C3AED');
      for (let i = 0; i < 10; i++) dat(ws.addRow(['', '', '', '', '', '', '', '']), i % 2 === 0);
    }

    const buffer = await wb.xlsx.writeBuffer();
    saveAs(new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), `Plantilla_${nombreTorneo}.xlsx`);
  }

  async descargarExcelEquiposLleno() {
    const t = this.torneoSelect;
    if (!t) return;

    const activos = this.equiposTorneo.filter((eq: any) => eq.estado === true);
    if (activos.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Sin equipos activos',
        text: 'Debes activar al menos un equipo en "Equipos Participantes" antes de descargar la plantilla de ejemplo.',
        confirmButtonColor: '#10b981'
      });
      return;
    }

    const ExcelJSModule = await import('exceljs');
    const ExcelJS = (ExcelJSModule as any).default ?? ExcelJSModule;
    const nombreTorneo = t.nombre || 'Torneo';
    const categoriaNombre = this.getNombreCategoria(String(t.categoria));
    const numFases = Number(t.num_fases) || 1;
    const gruposFase1 = this.grupos.filter((g: any) => Number(g.fase) === 1);
    const nGrupos = gruposFase1.length || 1;
    const equiposActivos2 = this.equiposTorneo.filter((eq: any) => eq.estado === true);
    const equiposMezclados = [...equiposActivos2].sort(() => Math.random() - 0.5);
    const wb = new ExcelJS.Workbook();

    const hdr = (row: any, bgArgb: string) => {
      row.height = 22;
      row.eachCell({ includeEmpty: true }, (c: any) => {
        c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bgArgb } };
        c.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 10, name: 'Calibri' };
        c.alignment = { vertical: 'middle', horizontal: 'center' };
      });
    };
    const dat = (row: any, even: boolean, hl: number[] = []) => {
      row.height = 18;
      row.eachCell({ includeEmpty: true }, (c: any, col: number) => {
        const h = hl.includes(col);
        c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: h ? 'FFFFF3CD' : (even ? 'FFF3F4F6' : 'FFFFFFFF') } };
        c.font = { size: 10, name: 'Calibri', bold: h };
        c.alignment = { vertical: 'middle', horizontal: h ? 'center' : 'left' };
      });
    };

    const sec2 = (ws: any, label: string) => {
      const r = ws.addRow([label]);
      r.height = 16;
      r.eachCell({ includeEmpty: true }, (c: any) => {
        c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE8EDF8' } };
        c.font = { bold: true, italic: true, size: 9, name: 'Calibri', color: { argb: 'FF1F3864' } };
        c.alignment = { vertical: 'middle', horizontal: 'left' };
      });
    };

    // TORNEO
    const wsTorneo = wb.addWorksheet('TORNEO');
    wsTorneo.columns = [{ width: 28 }, { width: 50 }];
    hdr(wsTorneo.addRow(['CAMPO', 'VALOR']), 'FF1F3864');
    sec2(wsTorneo, '▸ Información básica');
    [['NOMBRE', t.nombre || ''], ['DESCRIPCION', t.descripcion || ''],
     ['CATEGORIA', categoriaNombre], ['CONTROL EDAD', t.control_edad ? 'Si' : 'No'],
    ].forEach((r, i) => dat(wsTorneo.addRow(r), i % 2 === 0));
    sec2(wsTorneo, '▸ Fechas');
    [['FECHA INICIO', t.fecha_inicio || ''], ['FECHA FIN', t.fecha_fin || ''],
     ['FECHA LIMITE NOMINA', t.fecha_limite || ''],
    ].forEach((r, i) => dat(wsTorneo.addRow(r), i % 2 === 0));
    sec2(wsTorneo, '▸ Configuración');
    [['MAX JUGADORES', t.numero_maximo_jug || ''], ['NUM FASES', t.num_fases || ''],
    ].forEach((r, i) => dat(wsTorneo.addRow(r), i % 2 === 0));
    sec2(wsTorneo, '▸ Grupos por fase');
    for (let f = 1; f <= numFases; f++) {
      const cnt = this.grupos.filter((g: any) => Number(g.fase) === f).length;
      dat(wsTorneo.addRow([`GRUPOS FASE ${f}`, cnt]), (f - 1) % 2 === 0);
    }

    // EQUIPOS
    const wsEq = wb.addWorksheet('EQUIPOS');
    wsEq.columns = [{ width: 50 }, { width: 10 }];
    hdr(wsEq.addRow(['NOMBRE EQUIPO', 'ID']), 'FF1D4ED8');
    equiposActivos2.forEach((eq: any, i: number) => {
      const row = wsEq.addRow([eq.nombre || '', Number(eq.id)]);
      dat(row, i % 2 === 0);
      row.getCell(2).alignment = { horizontal: 'center', vertical: 'middle' };
    });

    // CANCHAS
    const wsCanchas2 = wb.addWorksheet('CANCHAS');
    wsCanchas2.columns = [{ width: 10 }, { width: 40 }, { width: 30 }];
    hdr(wsCanchas2.addRow(['ID', 'NOMBRE', 'DESCRIPCION']), 'FF0F766E');
    (this.canchas || []).forEach((c: any, i: number) => {
      const row = wsCanchas2.addRow([Number(c.id), c.nombre || '', c.descripcion || '']);
      dat(row, i % 2 === 0);
      row.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
    });

    // JUECES
    const wsJueces2 = wb.addWorksheet('JUECES');
    wsJueces2.columns = [{ width: 10 }, { width: 35 }, { width: 20 }];
    hdr(wsJueces2.addRow(['ID', 'NOMBRE', 'IDENTIFICACION']), 'FFBE123C');
    (this.jueces || []).forEach((j: any, i: number) => {
      const row = wsJueces2.addRow([Number(j.id), j.nombre || '', j.identificacion || '']);
      dat(row, i % 2 === 0);
      row.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
    });

    // DELEGADOS
    const wsDels2 = wb.addWorksheet('DELEGADOS');
    wsDels2.columns = [{ width: 10 }, { width: 35 }];
    hdr(wsDels2.addRow(['ID', 'NOMBRE']), 'FF4338CA');
    (this.Delegados || []).forEach((d: any, i: number) => {
      const row = wsDels2.addRow([Number(d.id), d.nombre || '']);
      dat(row, i % 2 === 0);
      row.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
    });

    // GRUPO sheets con equipos distribuidos al azar
    for (let gi = 0; gi < gruposFase1.length; gi++) {
      const grupo = gruposFase1[gi];
      const teamsSel = equiposMezclados.filter((_: any, idx: number) => idx % nGrupos === gi);
      const ws = wb.addWorksheet(`GRUPO ${grupo.nombre}`);
      ws.columns = [{ width: 50 }, { width: 10 }];
      hdr(ws.addRow(['NOMBRE EQUIPO', 'ID']), 'FF059669');
      teamsSel.forEach((eq: any, i: number) => {
        const row = ws.addRow([eq.nombre || '', Number(eq.id)]);
        dat(row, i % 2 === 0);
        row.getCell(2).alignment = { horizontal: 'center', vertical: 'middle' };
      });
    }

    // FASE 1: round-robin con IDs reales + fecha/hora/cancha/juez/delegado de ejemplo
    const wsF1 = wb.addWorksheet('FASE 1');
    wsF1.columns = [
      { width: 13 }, { width: 32 }, { width: 15 }, { width: 32 },
      { width: 22 }, { width: 14 }, { width: 13 }, { width: 13 }, { width: 13 },
    ];
    hdr(wsF1.addRow(['ID_LOCAL ★', 'NOMBRE_LOCAL', 'ID_VISITANTE ★', 'NOMBRE_VISITANTE',
      'FECHA (AAAA-MM-DD)', 'HORA (HH:MM)', 'ID_CANCHA', 'ID_JUEZ', 'ID_DELEGADO']), 'FFD97706');
    const horas = ['08:00', '10:00', '14:00', '16:00', '18:00'];
    const fechaBase = t.fecha_inicio ? String(t.fecha_inicio) : new Date().toISOString().slice(0, 10);
    const nCanchas = (this.canchas || []).length;
    const nJueces  = (this.jueces || []).length;
    const nDels    = (this.Delegados || []).length;
    let f1Idx = 0;
    for (let gi = 0; gi < gruposFase1.length; gi++) {
      const teamsSel = equiposMezclados.filter((_: any, idx: number) => idx % nGrupos === gi);
      for (let a = 0; a < teamsSel.length; a++) {
        for (let b = a + 1; b < teamsSel.length; b++) {
          const idCancha = nCanchas > 0 ? Number(this.canchas[f1Idx % nCanchas].id) : '';
          const idJuez   = nJueces  > 0 ? Number(this.jueces[f1Idx % nJueces].id)   : '';
          const idDel    = nDels    > 0 ? Number(this.Delegados[f1Idx % nDels].id)   : '';
          const row = wsF1.addRow([
            Number(teamsSel[a].id), teamsSel[a].nombre || '',
            Number(teamsSel[b].id), teamsSel[b].nombre || '',
            fechaBase, horas[f1Idx % horas.length],
            idCancha, idJuez, idDel,
          ]);
          dat(row, f1Idx % 2 === 0, [1, 3]);
          f1Idx++;
        }
      }
    }

    // FASE 2+ con cruces de ejemplo
    for (let fase = 2; fase <= numFases; fase++) {
      const ws = wb.addWorksheet(`FASE ${fase}`);
      ws.columns = [{ width: 18 }, { width: 20 }, { width: 14 }, { width: 16 }, { width: 4 }, { width: 20 }, { width: 14 }, { width: 16 }];
      hdr(ws.addRow(['GRUPO_DESTINO', 'TIPO_EQ1', 'GRUPO_EQ1', 'POSICION_EQ1', '', 'TIPO_EQ2', 'GRUPO_EQ2', 'POSICION_EQ2']), 'FF7C3AED');
      const gruposDest = this.grupos.filter((g: any) => Number(g.fase) === fase);
      const gruposSrc  = this.grupos.filter((g: any) => Number(g.fase) === fase - 1);
      let pairIdx = 0, puestoRcl = 4;
      gruposDest.forEach((dest: any, i: number) => {
        const s1 = gruposSrc[pairIdx * 2];
        const s2 = gruposSrc[pairIdx * 2 + 1];
        const tipo1 = s1 ? 'Grupo' : 'Reclasificacion', grp1 = s1 ? s1.nombre : 'RCL', pos1 = s1 ? (pairIdx % 4) + 1 : puestoRcl++;
        const tipo2 = s2 ? 'Grupo' : 'Reclasificacion', grp2 = s2 ? s2.nombre : 'RCL', pos2 = s2 ? ((pairIdx + 1) % 4) + 1 : puestoRcl++;
        pairIdx++;
        dat(ws.addRow([dest.nombre, tipo1, grp1, pos1, '', tipo2, grp2, pos2]), i % 2 === 0);
      });
    }

    const buffer = await wb.xlsx.writeBuffer();
    saveAs(new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), `Ejemplo_${nombreTorneo}.xlsx`);
  }

  cargarGruposDesdeExcel(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];

    const idsElegibles = new Map<number, string>(
      this.equiposTorneo.filter((eq: any) => eq.estado === true)
        .map((eq: any) => [Number(eq.id), eq.nombre as string])
    );

    // Mapa nombre-grupo → id, por fase
    const gruposPorFase = (fase: number) =>
      new Map<string, number>(
        this.grupos
          .filter((g: any) => Number(g.fase) === fase)
          .map((g: any) => [String(g.nombre).toUpperCase(), Number(g.id)])
      );

    const parseTipo = (val: string): 'grupo' | 'recla' | null => {
      const v = val.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
      if (v === 'grupo') return 'grupo';
      if (v === 'reclasificacion') return 'recla';
      return null;
    };

    const parsePos = (tipo: 'grupo' | 'recla', val: string): number | null => {
      const v = String(val).trim().toLowerCase();
      // Número directo (formato nuevo y preferido)
      const n = parseInt(v);
      if (!isNaN(n) && n >= 1) return n;
      // Compatibilidad con formato texto anterior
      if (tipo === 'grupo') {
        const map: Record<string, number> = { primero: 1, segundo: 2, tercero: 3, cuarto: 4 };
        return map[v] ?? null;
      }
      const m = v.match(/^puesto\s+(\d+)$/);
      return m ? parseInt(m[1]) : null;
    };

    type PrePartido = {
      grupoDestino: string;
      tipoEq1: 'grupo' | 'recla';
      grupoEq1: string;
      posEq1: number;
      tipoEq2: 'grupo' | 'recla';
      grupoEq2: string;
      posEq2: number;
    };

    type ProgPartido = {
      idLocal: number;
      nombreLocal: string;
      idVisitante: number;
      nombreVisitante: string;
      fecha: string;
      hora: string;
      cancha: string;
      juez: string;
      delegado: string;
    };

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const wb = XLSX.read(data, { type: 'array' });

      const grupos: { nombre: string; equipos: number[] }[] = [];
      const fases: { numFase: number; prePartidos: PrePartido[] }[] = [];
      const programacion: ProgPartido[] = [];
      const errores: string[] = [];
      const idsUsados = new Set<number>();

      for (const sheetName of wb.SheetNames) {
        const upper = sheetName.toUpperCase().trim();

        // ── GRUPO sheets ────────────────────────────────────────────────────────
        if (upper.startsWith('GRUPO')) {
          const ws = wb.Sheets[sheetName];
          const rows = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][];
          const headerRow = rows.find((r) => r.some((c) => String(c).toUpperCase() === 'ID'));
          if (!headerRow) {
            errores.push(`Hoja "${sheetName}": no se encontró la columna ID.`);
            continue;
          }
          const idColIdx = headerRow.findIndex((c) => String(c).toUpperCase() === 'ID');
          const headerRowIdx = rows.indexOf(headerRow);
          const equiposGrupo: number[] = [];

          for (let i = headerRowIdx + 1; i < rows.length; i++) {
            const idVal = rows[i][idColIdx];
            if (idVal === undefined || idVal === null || idVal === '') continue;
            const id = Number(idVal);
            if (isNaN(id)) {
              errores.push(`Hoja "${sheetName}" fila ${i + 1}: "${idVal}" no es un ID numérico válido.`);
              continue;
            }
            if (!idsElegibles.has(id)) {
              errores.push(`Hoja "${sheetName}" fila ${i + 1}: ID ${id} no está en la lista de equipos elegibles de este torneo.`);
              continue;
            }
            if (idsUsados.has(id)) {
              errores.push(`Hoja "${sheetName}" fila ${i + 1}: El equipo "${idsElegibles.get(id)}" (ID ${id}) ya fue asignado a otro grupo.`);
              continue;
            }
            idsUsados.add(id);
            equiposGrupo.push(id);
          }
          if (equiposGrupo.length > 0) grupos.push({ nombre: sheetName, equipos: equiposGrupo });
        }

        // ── FASE sheets (fase 2+; FASE 1 se maneja más abajo como programación) ──
        const faseMatch = upper.match(/^FASE\s+(\d+)$/);
        if (faseMatch && parseInt(faseMatch[1]) >= 2) {
          const numFase = parseInt(faseMatch[1]);

          const ws = wb.Sheets[sheetName];
          const rows = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][];

          const headerRow = rows.find((r) =>
            r.some((c) => /GRUPO_DESTINO|TIPO_EQ1/i.test(String(c)))
          );
          if (!headerRow) {
            errores.push(`Hoja "${sheetName}": no se encontró la fila de encabezados (GRUPO_DESTINO, TIPO_EQ1, ...).`);
            continue;
          }
          const headerRowIdx = rows.indexOf(headerRow);

          const colIdx = (name: string) =>
            headerRow.findIndex((c) => String(c).toUpperCase().trim() === name);

          const iDest  = colIdx('GRUPO_DESTINO');
          const iTipo1 = colIdx('TIPO_EQ1');
          const iGrp1  = colIdx('GRUPO_EQ1');
          const iPos1  = colIdx('POSICION_EQ1');
          const iTipo2 = colIdx('TIPO_EQ2');
          const iGrp2  = colIdx('GRUPO_EQ2');
          const iPos2  = colIdx('POSICION_EQ2');

          const missing = ['GRUPO_DESTINO','TIPO_EQ1','GRUPO_EQ1','POSICION_EQ1','TIPO_EQ2','GRUPO_EQ2','POSICION_EQ2']
            .filter((_, i) => [iDest, iTipo1, iGrp1, iPos1, iTipo2, iGrp2, iPos2][i] === -1);
          if (missing.length > 0) {
            errores.push(`Hoja "${sheetName}": faltan columnas: ${missing.join(', ')}.`);
            continue;
          }

          const destMap = gruposPorFase(numFase);
          const srcMap  = gruposPorFase(numFase - 1);
          const srcNames = [...srcMap.keys()].join(', ');
          const destNames = [...destMap.keys()].join(', ');

          const prePartidos: PrePartido[] = [];

          for (let i = headerRowIdx + 1; i < rows.length; i++) {
            const row = rows[i];
            const destRaw  = String(row[iDest]  ?? '').trim();
            const tipo1Raw = String(row[iTipo1] ?? '').trim();
            const grp1Raw  = String(row[iGrp1]  ?? '').trim();
            const pos1Raw  = String(row[iPos1]  ?? '').trim();
            const tipo2Raw = String(row[iTipo2] ?? '').trim();
            const grp2Raw  = String(row[iGrp2]  ?? '').trim();
            const pos2Raw  = String(row[iPos2]  ?? '').trim();

            if (!destRaw && !tipo1Raw && !tipo2Raw) continue; // fila vacía

            let rowOk = true;

            if (!destRaw) {
              errores.push(`Hoja "${sheetName}" fila ${i + 1}: GRUPO_DESTINO está vacío.`); rowOk = false;
            } else if (!destMap.has(destRaw.toUpperCase())) {
              errores.push(`Hoja "${sheetName}" fila ${i + 1}: GRUPO_DESTINO "${destRaw}" no es válido para Fase ${numFase}. Válidos: ${destNames}.`); rowOk = false;
            }

            const tipo1 = parseTipo(tipo1Raw);
            if (!tipo1) {
              errores.push(`Hoja "${sheetName}" fila ${i + 1}: TIPO_EQ1 "${tipo1Raw}" no válido. Use "Grupo" o "Reclasificacion".`); rowOk = false;
            }

            const tipo2 = parseTipo(tipo2Raw);
            if (!tipo2) {
              errores.push(`Hoja "${sheetName}" fila ${i + 1}: TIPO_EQ2 "${tipo2Raw}" no válido. Use "Grupo" o "Reclasificacion".`); rowOk = false;
            }

            if (tipo1) {
              if (tipo1 === 'grupo' && !srcMap.has(grp1Raw.toUpperCase())) {
                errores.push(`Hoja "${sheetName}" fila ${i + 1}: GRUPO_EQ1 "${grp1Raw}" no es un grupo de Fase ${numFase - 1}. Válidos: ${srcNames}.`); rowOk = false;
              } else if (tipo1 === 'recla' && grp1Raw.toUpperCase() !== 'RCL') {
                errores.push(`Hoja "${sheetName}" fila ${i + 1}: GRUPO_EQ1 debe ser "RCL" cuando TIPO_EQ1 es Reclasificacion.`); rowOk = false;
              }
              const posEq1 = parsePos(tipo1, pos1Raw);
              if (posEq1 === null) {
                const hint = tipo1 === 'grupo' ? 'Primero, Segundo, Tercero, Cuarto' : 'Puesto 4, Puesto 5, ...';
                errores.push(`Hoja "${sheetName}" fila ${i + 1}: POSICION_EQ1 "${pos1Raw}" no válido. Use: ${hint}.`); rowOk = false;
              }
            }

            if (tipo2) {
              if (tipo2 === 'grupo' && !srcMap.has(grp2Raw.toUpperCase())) {
                errores.push(`Hoja "${sheetName}" fila ${i + 1}: GRUPO_EQ2 "${grp2Raw}" no es un grupo de Fase ${numFase - 1}. Válidos: ${srcNames}.`); rowOk = false;
              } else if (tipo2 === 'recla' && grp2Raw.toUpperCase() !== 'RCL') {
                errores.push(`Hoja "${sheetName}" fila ${i + 1}: GRUPO_EQ2 debe ser "RCL" cuando TIPO_EQ2 es Reclasificacion.`); rowOk = false;
              }
              const posEq2 = parsePos(tipo2, pos2Raw);
              if (posEq2 === null) {
                const hint = tipo2 === 'grupo' ? 'Primero, Segundo, Tercero, Cuarto' : 'Puesto 4, Puesto 5, ...';
                errores.push(`Hoja "${sheetName}" fila ${i + 1}: POSICION_EQ2 "${pos2Raw}" no válido. Use: ${hint}.`); rowOk = false;
              }
            }

            if (rowOk && tipo1 && tipo2) {
              prePartidos.push({
                grupoDestino: destRaw,
                tipoEq1: tipo1,
                grupoEq1: tipo1 === 'recla' ? 'RCL' : grp1Raw,
                posEq1: parsePos(tipo1, pos1Raw)!,
                tipoEq2: tipo2,
                grupoEq2: tipo2 === 'recla' ? 'RCL' : grp2Raw,
                posEq2: parsePos(tipo2, pos2Raw)!,
              });
            }
          }

          if (prePartidos.length > 0) fases.push({ numFase, prePartidos });
          else if (errores.length === 0) {
            errores.push(`Hoja "${sheetName}": no se encontraron enfrentamientos válidos. Revisa que las filas de datos estén completas.`);
          }
        }

        // ── FASE 1 sheet: programación de partidos ───────────────────────────────
        if (upper === 'FASE 1') {
          const ws = wb.Sheets[sheetName];
          const rows = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][];
          const headerRow = rows.find((r) =>
            r.some((c) => /ID_LOCAL|ID_VISITANTE/i.test(String(c)))
          );
          if (!headerRow) {
            errores.push(`Hoja "FASE 1": no se encontró la fila de encabezados (ID_LOCAL, NOMBRE_LOCAL, ID_VISITANTE, NOMBRE_VISITANTE, FECHA, HORA, ID_CANCHA, ID_JUEZ, ID_DELEGADO).`);
          } else {
            const headerRowIdx = rows.indexOf(headerRow);
            const normalizeH = (c: any) => String(c).toUpperCase().trim().replace(/[^A-Z0-9_]/g, '');
            const colIdx = (name: string) =>
              headerRow.findIndex((c) => normalizeH(c).startsWith(name));
            const iIdLocal      = colIdx('ID_LOCAL');
            const iNomLocal     = colIdx('NOMBRE_LOCAL');
            const iIdVis        = colIdx('ID_VISITANTE');
            const iNomVis       = colIdx('NOMBRE_VISITANTE');
            const iFecha        = colIdx('FECHA');
            const iHora         = colIdx('HORA');
            const iCancha   = colIdx('ID_CANCHA') >= 0 ? colIdx('ID_CANCHA') : colIdx('CANCHA');
            const iJuez     = colIdx('ID_JUEZ')   >= 0 ? colIdx('ID_JUEZ')   : colIdx('JUEZ');
            const iDelegado = colIdx('ID_DELEGADO') >= 0 ? colIdx('ID_DELEGADO') : colIdx('DELEGADO');

            for (let i = headerRowIdx + 1; i < rows.length; i++) {
              const row = rows[i];
              const idLocalRaw = row[iIdLocal];
              const idVisRaw   = row[iIdVis];
              if ((idLocalRaw === undefined || idLocalRaw === '') && (idVisRaw === undefined || idVisRaw === '')) continue;

              const idLocal = Number(idLocalRaw);
              const idVis   = Number(idVisRaw);

              if (isNaN(idLocal) || idLocal <= 0) {
                errores.push(`Hoja "FASE 1" fila ${i + 1}: ID_LOCAL "${idLocalRaw}" no es un número válido.`);
                continue;
              }
              if (isNaN(idVis) || idVis <= 0) {
                errores.push(`Hoja "FASE 1" fila ${i + 1}: ID_VISITANTE "${idVisRaw}" no es un número válido.`);
                continue;
              }
              if (!idsElegibles.has(idLocal)) {
                errores.push(`Hoja "FASE 1" fila ${i + 1}: ID_LOCAL ${idLocal} no está en los equipos de este torneo.`);
                continue;
              }
              if (!idsElegibles.has(idVis)) {
                errores.push(`Hoja "FASE 1" fila ${i + 1}: ID_VISITANTE ${idVis} no está en los equipos de este torneo.`);
                continue;
              }
              programacion.push({
                idLocal,
                nombreLocal:     String(row[iNomLocal]  ?? idsElegibles.get(idLocal) ?? '').trim(),
                idVisitante:     idVis,
                nombreVisitante: String(row[iNomVis]    ?? idsElegibles.get(idVis)   ?? '').trim(),
                fecha:    String(row[iFecha]    ?? '').trim(),
                hora:     String(row[iHora]     ?? '').trim(),
                cancha:   String(row[iCancha]   ?? '').trim(),
                juez:     String(row[iJuez]     ?? '').trim(),
                delegado: iDelegado >= 0 ? String(row[iDelegado] ?? '').trim() : '',
              });
            }
          }
        }
      }

      input.value = '';

      if (errores.length > 0) {
        Swal.fire({
          title: `Errores en el archivo (${errores.length})`,
          html:
            '<ul style="text-align:left;font-size:12px;max-height:320px;overflow:auto;margin:0;padding-left:16px">' +
            errores.map((err) => `<li style="margin-bottom:4px">${err}</li>`).join('') +
            '</ul>',
          icon: 'error',
          confirmButtonText: 'Cerrar y corregir',
          width: '760px',
        });
        return;
      }

      if (grupos.length === 0) {
        Swal.fire('Sin datos de grupos', 'No se encontraron hojas "GRUPO X" con equipos asignados.', 'warning');
        return;
      }

      const totalPartidos = grupos.reduce(
        (acc, g) => acc + (g.equipos.length * (g.equipos.length - 1)) / 2,
        0
      );
      const gruposRows = grupos
        .map((g) => {
          const names = g.equipos.map((id) => idsElegibles.get(id) || `ID ${id}`).join(', ');
          return `<tr>
            <td style="padding:7px 12px;font-weight:700;color:#1f2937;white-space:nowrap;vertical-align:top;border-bottom:1px solid #f3f4f6">${g.nombre}</td>
            <td style="padding:7px 12px;color:#374151;border-bottom:1px solid #f3f4f6;line-height:1.5;text-align:left">${names}</td>
            <td style="padding:7px 12px;font-weight:700;color:#059669;text-align:center;border-bottom:1px solid #f3f4f6;white-space:nowrap">${g.equipos.length} eq.</td>
          </tr>`;
        })
        .join('');

      const fasesRows = fases
        .map((f) => `<tr>
          <td style="padding:7px 12px;font-weight:700;color:#1f2937;white-space:nowrap;border-bottom:1px solid #f3f4f6">Fase ${f.numFase}</td>
          <td style="padding:7px 12px;color:#374151;border-bottom:1px solid #f3f4f6;text-align:left">${f.prePartidos.length} enfrentamiento(s) configurados</td>
        </tr>`)
        .join('');

      const fasesSection = fases.length > 0 ? `
        <div style="margin-top:16px">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
            <span style="width:4px;height:16px;background:#7c3aed;border-radius:2px;display:inline-block;flex-shrink:0"></span>
            <span style="font-weight:700;font-size:12px;color:#1f2937;text-transform:uppercase;letter-spacing:.05em">Fases</span>
          </div>
          <table style="width:100%;border-collapse:collapse;font-size:13px;border-radius:10px;overflow:hidden;border:1px solid #ede9fe">
            <thead>
              <tr style="background:#7c3aed">
                <th style="padding:8px 12px;text-align:left;color:white;font-size:11px;text-transform:uppercase;letter-spacing:.06em">Fase</th>
                <th style="padding:8px 12px;text-align:left;color:white;font-size:11px;text-transform:uppercase;letter-spacing:.06em">Cruces</th>
              </tr>
            </thead>
            <tbody>${fasesRows}</tbody>
          </table>
        </div>` : '';

      const progSection = programacion.length > 0 ? `
        <div style="margin-top:12px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:11px 14px;display:flex;align-items:center;gap:10px">
          <span style="font-size:18px">📅</span>
          <span style="color:#1e40af;font-weight:700;font-size:13px">${programacion.length} partido(s) con programación (fecha, hora, cancha, juez)</span>
        </div>` : '';

      Swal.fire({
        title: 'Confirmar carga masiva',
        html: `
          <div style="text-align:left;font-size:13px;max-height:460px;overflow-y:auto;padding-right:2px">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
              <span style="width:4px;height:16px;background:#059669;border-radius:2px;display:inline-block;flex-shrink:0"></span>
              <span style="font-weight:700;font-size:12px;color:#1f2937;text-transform:uppercase;letter-spacing:.05em">Grupos — Fase 1</span>
            </div>
            <table style="width:100%;border-collapse:collapse;font-size:13px;border-radius:10px;overflow:hidden;border:1px solid #bbf7d0">
              <thead>
                <tr style="background:#059669">
                  <th style="padding:8px 12px;text-align:left;color:white;font-size:11px;text-transform:uppercase;letter-spacing:.06em">Grupo</th>
                  <th style="padding:8px 12px;text-align:left;color:white;font-size:11px;text-transform:uppercase;letter-spacing:.06em">Equipos</th>
                  <th style="padding:8px 12px;text-align:center;color:white;font-size:11px;text-transform:uppercase;letter-spacing:.06em">#</th>
                </tr>
              </thead>
              <tbody>${gruposRows}</tbody>
            </table>
            ${fasesSection}
            ${progSection}
            <div style="margin-top:14px;background:#ecfdf5;border:1px solid #6ee7b7;border-radius:10px;padding:11px 14px;display:flex;align-items:center;gap:10px">
              <span style="font-size:18px">⚽</span>
              <span style="color:#065f46;font-weight:700;font-size:13px">${totalPartidos} partidos de Fase 1 se generarán automáticamente</span>
            </div>
            <div style="margin-top:8px;background:#fffbeb;border:1px solid #fcd34d;border-radius:10px;padding:10px 14px;display:flex;align-items:flex-start;gap:8px">
              <span style="font-size:14px;margin-top:1px">⚠️</span>
              <span style="color:#92400e;font-size:12px">Los grupos, resultados y estadísticas actuales del torneo serán <strong>borrados</strong> y reemplazados con este archivo.</span>
            </div>
          </div>`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Confirmar y cargar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#10b981',
        width: '760px',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Procesando carga...',
            html: `
              <div style="display:flex;flex-direction:column;align-items:center;gap:14px;padding:10px 0">
                <div style="font-size:13px;color:#6b7280;display:flex;flex-direction:column;gap:6px;text-align:left;width:100%;max-width:320px">
                  <div style="display:flex;align-items:center;gap:8px"><span style="font-size:16px">🗑️</span><span>Borrando grupos y resultados anteriores</span></div>
                  <div style="display:flex;align-items:center;gap:8px"><span style="font-size:16px">👥</span><span>Creando grupos y asignando equipos</span></div>
                  <div style="display:flex;align-items:center;gap:8px"><span style="font-size:16px">📅</span><span>Generando partidos de Fase 1</span></div>
                  <div style="display:flex;align-items:center;gap:8px"><span style="font-size:16px">🔗</span><span>Configurando cruces de fases siguientes</span></div>
                </div>
                <p style="font-size:11px;color:#9ca3af;margin:0">Por favor espera, no cierres esta ventana...</p>
              </div>`,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            didOpen: () => Swal.showLoading(),
          });
          this.apiRest.cargarGruposExcel(this.idTorneo, grupos, fases, programacion).subscribe({
            next: (res: any) => {
              if (res.success) {
                Swal.fire({ title: '¡Carga exitosa!', html: res.msj, icon: 'success' });
                this.cargarDatos();
              } else {
                Swal.fire('Error en el servidor', res.msj, 'error');
              }
            },
            error: () => Swal.fire('Error', 'No se pudo conectar con el servidor.', 'error'),
          });
        }
      });
    };
    reader.readAsArrayBuffer(file);
  }

  tipoResul() {}

  VerTitulares(IdPartido: number) {
    this.idPartidoSelect = IdPartido;
    this.apiRest
      .jugadoresTorneoPartido(
        this.idTorneo,
        this.idPartidoSelect,
        this.usuario.fk_equipo,
      )
      .subscribe((res: any) => {
        this.jugadoresEquipo = res.jugadores.map((j: any) => ({
          ...j,
          seleccionado: false, // para control en "Individual"
        }));
      });
  }

  guardarInscripcionJug() {
    // Validar que todos tengan rol

    const datos = this.jugadoresEquipo.map((j) => ({
      id_jugador: j.id,
      rol: j.rol,
      num_jug: j.num_jug || '',
    }));

    this.apiRest
      .guardarInscripcionJug(
        this.idTorneo,
        this.idPartidoSelect,
        this.usuario.fk_equipo,
        datos,
      )
      .subscribe((res: any) => {
        Swal.fire(res.msj);
      });
  }

  guardarInscripcionAll(equipo: any[]) {
    // equipo es un arreglo de jugadores de ese equipo
    const idEquipo = equipo[0]?.fk_equipo;

    const jugadoresConRol = equipo.map((jugador) => ({
      id_jugador: jugador.id, // ajusta al nombre real en tu backend
      nombre: jugador.nombre,
      rol: jugador.rol || '',
      num_jug: jugador.num_jug || '', // si no selecciona nada, lo dejamos vacío
    }));

    // También puedes obtener datos del equipo (ej: nombre, id)
    const datosEquipo = jugadoresConRol;

    this.apiRest
      .guardarInscripcionJug(
        this.idTorneo,
        this.idPartidoSelect,
        idEquipo,
        datosEquipo,
      )
      .subscribe((res: any) => {
        Swal.fire(res.msj);
      });
  }

  VerTitularesPartido(IdPartido: number) {
    this.idPartidoSelect = IdPartido;

    this.apiRest
      .jugadoresPartidoRol(this.idTorneo, this.idPartidoSelect)
      .subscribe((res: any) => {
        this.DirectivosP = Array.isArray(res.directivos)
          ? res.directivos
          : Object.values(res.directivos || {});

        // Si el backend devuelve directamente un arreglo
        this.jugadoresInscritos = Array.isArray(res.JugadoresRol)
          ? res.JugadoresRol
          : Object.values(res.JugadoresRol || {});

        if (!this.jugadoresInscritos.length) {
          Swal.fire('No hay jugadores inscritos para este partido.');
        }
      });

    setTimeout(() => {
      const modalElement = document.getElementById('modalVerJugadoresIns');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }, 200);
  }

  direccionTecnicaP(IdPartido: number) {
    this.apiRest.direccionTecnicaP(IdPartido).subscribe((res: any) => {
      this.idPartidoD = res.IdPartido;
      this.nameEq1 = res.equipo1.nombre;
      this.nameEq2 = res.equipo2.nombre;
      this.idEq1 = res.equipo1.id;
      this.idEq2 = res.equipo2.id;
      this.entrenadores1 = res.entrenadores1;
      this.entrenadores2 = res.entrenadores2;
      this.delegado1 = res.delegado1;
      this.delegado2 = res.delegado2;
      this.asistente1 = res.asistente1;
      this.asistente2 = res.asistente2;
    });
  }

  cambiarEstadoW(partido: any) {
    this.equipo1 = partido.fk_equipo1;
    this.equipo2 = partido.fk_equipo2;
  }

  cambiarEstadoPart(equipoId: number, estadoActual: any): void {
    const ejecutarCambio = (maxJugadores?: number | null) => {
      this.isLoading = true;
      this.apiRest
        .cambiarEstadoPart(this.idTorneo, equipoId, estadoActual, maxJugadores)
        .subscribe({
          next: (res: any) => {
            Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: res.msj, showConfirmButton: false, timer: 2500 });
            this.apiRest.get_All_equipos_torneo(this.idTorneo).subscribe({
              next: (res: any) => { this.equiposTorneo = res.equiposTorneo; },
              error: (err) => { console.error('Error al cargar equipos', err); },
              complete: () => { this.isLoading = false; },
            });
          },
          error: (err) => {
            console.error('Error al cambiar estado', err);
            this.isLoading = false;
          },
        });
    };

    if (estadoActual) {
      Swal.fire({
        title: '¿Excluir este equipo del torneo?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'Sí, excluir',
        denyButtonText: 'Cancelar',
      }).then((result) => { if (result.isConfirmed) ejecutarCambio(); });
    } else {
      const maxGlobal = this.torneoSelect?.numero_maximo_jug ?? '';
      Swal.fire({
        title: 'Activar equipo en el torneo',
        html: `
          <p style="font-size:13px;color:#64748b;margin-bottom:16px;">Define el máximo de jugadores permitidos para este equipo en esta edición.</p>
          <label style="display:block;font-size:10px;font-weight:900;color:#10b981;text-transform:uppercase;letter-spacing:.1em;text-align:left;margin-bottom:6px;">Máx. Jugadores</label>
          <input id="swal-max-jug" type="number" min="1" max="200"
            class="swal2-input" style="margin:0;width:100%"
            placeholder="Ej. ${maxGlobal || 20}" value="${maxGlobal}">
          <p style="font-size:10px;color:#94a3b8;margin-top:8px;text-align:left;">Dejar vacío para usar el límite global del torneo (${maxGlobal || '—'}).</p>`,
        focusConfirm: false,
        showDenyButton: true,
        confirmButtonText: 'Activar',
        denyButtonText: 'Cancelar',
        preConfirm: () => {
          const val = (document.getElementById('swal-max-jug') as HTMLInputElement)?.value?.trim();
          return val ? parseInt(val, 10) : null;
        }
      }).then((result) => {
        if (result.isConfirmed) ejecutarCambio(result.value);
      });
    }
  }

  editarMaxJug(eq: any): void {
    Swal.fire({
      title: 'Editar Máx. Jugadores',
      html: `
        <p style="font-size:12px;color:#64748b;margin-bottom:14px;">Equipo: <strong>${eq.nombre}</strong></p>
        <label style="display:block;font-size:10px;font-weight:900;color:#10b981;text-transform:uppercase;letter-spacing:.1em;text-align:left;margin-bottom:6px;">Máx. Jugadores</label>
        <input id="swal-edit-max" type="number" min="1" max="200"
          class="swal2-input" style="margin:0;width:100%"
          placeholder="Ej. 20" value="${eq.max_jugadores ?? ''}">`,
      focusConfirm: false,
      showDenyButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: 'Cancelar',
      preConfirm: () => {
        const val = (document.getElementById('swal-edit-max') as HTMLInputElement)?.value?.trim();
        return val ? parseInt(val, 10) : null;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiRest.editMaxJugPart(this.idTorneo, eq.id, result.value).subscribe({
          next: (res: any) => {
            eq.max_jugadores = result.value;
            Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: res.msj, showConfirmButton: false, timer: 2000 });
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
      confirmButtonText: 'Sí',
      denyButtonText: 'No',
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
            this.cargarDatos();
          },
        });
      }
    });
  }

  get equiposTorneoVista(): Equipos[] {
    if (Number(this.perfilUsuario) === 1) return this.equiposTorneo;
    return this.equiposTorneo.filter((eq: any) => !!eq.estado);
  }

  JugadoresParticipante(IdEquipo: number) {
    this.equipoSelectJ = IdEquipo;

    this.apiRest
      .jugadoresEquipoTorneo(
        this.torneoSelect.id,
        IdEquipo,
        this.idPartidoSelect,
      )
      .subscribe((res: any) => {
        this.jugadoresEquipoPar = res.jugadores;

        if (this.jugadoresEquipoPar.length > 0) {
          this.jugadoresEquipoPar.shift();
        }
      });
  }

  RecalcularFase(fase: number) {
    this.isLoading = true;

    this.apiRest
      .RecalcularFase(this.torneoSelect.id, fase)
      .subscribe((res: any) => {
        this.calendarioData = res.calendarioData;
        Swal.fire(res.msj);
        this.isLoading = false;
        this.cargarDatos();
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

    this.apiRest
      .InfoTarjeta(this.torneoSelect.id, jugador.fk_jugador, tipo)
      .subscribe((res: any) => {
        msj = res.msj;

        Swal.fire({
          title: msj,
          icon: 'warning',
          showDenyButton: true,
          confirmButtonText: 'Sí',
          denyButtonText: 'No',
        }).then((result) => {
          if (result.isConfirmed) {
            this.isLoading = true;

            this.apiRest
              .QuitarSancion(this.torneoSelect.id, jugador.fk_jugador, tipo)
              .subscribe((res: any) => {
                Swal.fire(res.msj);
                this.VerTitularesPartido(this.idPartidoSelect);
              });
          } else if (result.isDenied) {
            Swal.fire('Cancelado', 'No se hicieron cambios', 'info');
          }
        });
      });
  }

  guardarDireccion(idEquipo: number, equipoNum: number) {
    let entrenadorId: string | null = null;
    let delegadoId: string | null = null;
    let asistenteId: string | null = null;

    // Obtener valores según el equipo
    if (equipoNum === 1) {
      entrenadorId =
        (document.getElementById('entrenador1') as HTMLSelectElement)?.value ||
        null;
      delegadoId =
        (document.getElementById('delegado1') as HTMLSelectElement)?.value ||
        null;
      asistenteId =
        (document.getElementById('asistente1') as HTMLSelectElement)?.value ||
        null;
    } else if (equipoNum === 2) {
      entrenadorId =
        (document.getElementById('entrenador2') as HTMLSelectElement)?.value ||
        null;
      delegadoId =
        (document.getElementById('delegado2') as HTMLSelectElement)?.value ||
        null;
      asistenteId =
        (document.getElementById('asistente2') as HTMLSelectElement)?.value ||
        null;
    }

    // Validar que al menos uno esté lleno
    const algunSeleccionado = entrenadorId || delegadoId || asistenteId;

    if (!algunSeleccionado) {
      Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: 'Debe seleccionar al menos un integrante (entrenador, delegado o asistente).',
        confirmButtonColor: '#198754',
      });
      return;
    }

    // Llamada al backend solo si hay alguno seleccionado
    this.apiRest
      .guardarDireccion(
        this.idPartidoD,
        idEquipo,
        entrenadorId,
        delegadoId,
        asistenteId,
      )
      .subscribe((res: any) => {
        Swal.fire({
          icon: 'info',
          title: res.msj,
          confirmButtonColor: '#198754',
        });
      });
  }

  ReporteJugadores(IdEquipo: number) {
    Swal.fire({
      title: 'Desea generar el reporte de  jugadores en excel?',
      showDenyButton: true,
      confirmButtonText: 'Si',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        //descargiue el excel
        const url = `${this.pathIm}excel/ReporteJugadores/${IdEquipo}/${this.idTorneo}`;
        // Llamada HTTP
        window.open(url, '_blank');
      }
    });
  }

  abrirImagen(imgUrl: string) {
    if (!imgUrl) return;

    this.imagenSeleccionada = imgUrl;

    const modalEl = document.getElementById('modalImagen');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl); // usa el global
      modal.show();
    } else {
      console.warn('No se encontró el modal en el DOM');
    }
  }

  Selectequ(equipo: any) {
    this.equipoSelect = equipo;
    this.nameEqSelect = equipo.nombre;
  }

  cambiarEquipoTr(idEquipo: string) {
    if (!idEquipo || idEquipo === '') {
      Swal.fire('Debe seleccionar un equipo');
      return; // evita que se ejecute el resto
    }

    this.apiRest
      .cambiarEquipoTr(this.idTorneo, this.equipoSelect, idEquipo)
      .subscribe((res: any) => {
        Swal.fire(res.msj);
        this.cargarDatos();
      });
  }

  abrirModalSeleccionJEquipo(equipo: any) {
    this.equipoSelectJ = equipo;
    this.categoriaSeleccionadaT = this.torneoSelect.categoria;
    this.jugadorSeleccionadoIdClub = null;
    this.filtroInscripcion = '';
    this.jugadoresDisponiblesClub = [];
    this.jugadoresInscritosTorneo = [];

    this.apiRest
      .get_jugadores_categoriasId(this.torneoSelect.categoria, this.idTorneo)
      .subscribe((res: any) => {
        this.jugadoresDisponiblesClub = res.jugadoresDisponibles ?? [];
      });

    this.apiRest.jugadoresEquipoTorneo(this.idTorneo, equipo)
      .subscribe((res: any) => {
        this.jugadoresInscritosTorneo = res.jugadores ?? [];
      });
  }

  estaInscritoEnTorneo(jugadorId: number): boolean {
    return this.jugadoresInscritosTorneo.some(j => j.id === jugadorId || j.fk_jugador === jugadorId);
  }

  get jugadoresFiltrados(): any[] {
    const f = this.filtroInscripcion.toLowerCase();
    if (!f) return this.jugadoresDisponiblesClub;
    return this.jugadoresDisponiblesClub.filter(j =>
      j.nombre?.toLowerCase().includes(f) || j.identificacion?.toString().includes(f)
    );
  }

  inscribirJugadorDirecto(jugador: any) {
    if (this.inscribiendoJugadorId === jugador.id) return;
    this.inscribiendoJugadorId = jugador.id;

    this.apiRest.agregar_jugador_categoria_Club(
      this.idTorneo, this.equipoSelectJ, this.categoriaSeleccionadaT, jugador.id
    ).subscribe({
      next: (res: any) => {
        this.inscribiendoJugadorId = null;
        if (res.success || res.msj?.toLowerCase().includes('exit') || res.msj?.toLowerCase().includes('agre')) {
          this.jugadoresInscritosTorneo = [...this.jugadoresInscritosTorneo, jugador];
          Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: jugador.nombre + ' inscrito', showConfirmButton: false, timer: 2000 });
        } else {
          Swal.fire({ toast: true, position: 'top-end', icon: 'warning', title: res.msj ?? 'No se pudo inscribir', showConfirmButton: false, timer: 3000 });
        }
      },
      error: () => {
        this.inscribiendoJugadorId = null;
        Swal.fire({ toast: true, position: 'top-end', icon: 'error', title: 'Error al inscribir', showConfirmButton: false, timer: 3000 });
      }
    });
  }

  onSeleccionarJugadorClub() {
    // Si necesitas cargar más datos del jugador seleccionado, hazlo aquí
    const seleccionado = this.jugadoresDisponiblesClub.find(
      (j) => j.id === this.jugadorSeleccionadoIdClub,
    );
  }

  agregarJugadorSeleccionadoT() {
    const jugador = this.jugadoresDisponiblesClub.find(
      (j) => j.id === this.jugadorSeleccionadoIdClub,
    );

    if (!this.jugadorSeleccionadoIdClub) {
      Swal.fire(
        'Faltan datos',
        'Debes seleccionar un jugador y su número',
        'warning',
      );
      return;
    }

    Swal.fire({
      title: '¿Desea agregar a ' + jugador.nombre + ', a este torneo?',
      showDenyButton: true,
      confirmButtonText: 'Si',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.apiRest
          .agregar_jugador_categoria_Club(
            this.idTorneo,
            this.equipoSelectJ,
            this.categoriaSeleccionadaT,
            jugador.id,
          )
          .subscribe((res: any) => {
            Swal.fire(res.msj);
          });
      }
    });
  }

  verImagen(img?: string) {
    this.imagenSeleccionada =
      !img || img === 'nd.png'
        ? '../../../../assets/img/nd.png'
        : this.pathIm + img;

    const modal = new bootstrap.Modal(
      document.getElementById('modalImagenGrande')!
    );
    modal.show();
  }

  eliminarJugadorTorneo(jugador: number, equipo: number) {
    Swal.fire({
      title: 'Desea eliminar este jugador de este torneo?',
      showDenyButton: true,
      confirmButtonText: 'Si',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.apiRest
          .eliminarJugadorTorneo(jugador, this.idTorneo, equipo)
          .subscribe((res: any) => {
            Swal.fire(res.msj);
            this.jugadoresEquipoPar = res.jugadores;
          });
      }
    });
  }

  cambiarTab(opcion: string) {
    this.tabActiva = opcion;

    if (this.tabActiva == 'inicio' && this.perfilUsuario == 1) {
      this.router.navigate(['/adminTemp']);
    }

    if (this.tabActiva == 'inicio' && this.perfilUsuario == 2) {
      this.router.navigate(['/AdminEq']);
    }

  }

  abrirModalProgramacion(partido: any) {
    // Primero ejecutamos tu lógica de limpieza/reset
    this.resetProgramacion();

    // Obtenemos el ID exacto
    const modalId = 'calenModal' + partido.id;
    const modalElement = document.getElementById(modalId);

    if (modalElement) {
      // Creamos o recuperamos la instancia de Bootstrap y la mostramos
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  abrirModalInscritos(partidoId: number) {
    // Carga los datos primero
    this.VerTitularesPartido(partidoId);

    // Abre el modal
    this.modalInscritosAbierto = true;

    // Opcional: bloquear el scroll del body
    document.body.style.overflow = 'hidden';
  }

  cerrarModalInscritos() {
    this.modalInscritosAbierto = false;

    // Restaurar el scroll del body
    document.body.style.overflow = '';
  }

  abrirModalDireccion(partidoId: number) {
    // Llama a tu función original para cargar datos (si es necesario)
    this.direccionTecnicaP(partidoId);
    this.modalDireccionAbierto = true;
    document.body.style.overflow = 'hidden';
  }

  cerrarModalDireccion() {
    this.modalDireccionAbierto = false;
    document.body.style.overflow = '';
  }

  // Abrir modal
  abrirModalProgramar(partidoId: number) {
    this.modalProgramarPartidoId = partidoId;
    this.resetProgramacion(); // Tu función que limpia los campos
    this.modalProgramarAbierto = true;
    document.body.style.overflow = 'hidden';
  }

  // Cerrar modal
  cerrarModalProgramar() {
    this.modalProgramarAbierto = false;
    this.modalProgramarPartidoId = null;
    document.body.style.overflow = '';
  }

  // Función intermedia para guardar (evita error de tipo)
  guardarProgramacionDesdeModal() {
    if (this.modalProgramarPartidoId) {
      this.guardarProgramacion(this.modalProgramarPartidoId);
      // Si tu función guardarProgramacion NO cierra el modal, descomenta la siguiente línea:
      // this.cerrarModalProgramar();
    }
  }

  abrirModalResultado(partido: any) {
    this.partidoSeleccionadoResultado = partido;
    this.resetearFormularioResul(); // tu función que limpia los campos
    this.modalResultadoAbierto = true;
    document.body.style.overflow = 'hidden';
  }

  cerrarModalResultado() {
    this.modalResultadoAbierto = false;
    this.partidoSeleccionadoResultado = null;
    document.body.style.overflow = '';
  }

  aplicarFiltros(IdTorneo:any) {

  const nombre = this.filtroNombre?.toLowerCase() || '';
  const email = this.filtroEmail?.toLowerCase() || '';
  const IdT = IdTorneo;

  this.apiRest.get_All_equipos_torneoFilt(nombre,email,IdT).subscribe((res: any) => {
      this.equiposTorneo = res.equiposTorneo;

  });

}

}
