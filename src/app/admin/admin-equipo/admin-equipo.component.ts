import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageCropperComponent, ImageTransform } from 'ngx-image-cropper';
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
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgSelectModule, ImageCropperComponent],
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
  jugadoresInscritosTorneo: any[] = [];
  filtroInscripcion: string = '';
  inscribiendoJugadorId: number | null = null;
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
  imgPreview: string = '';
  direccionEquipo: any[] = [];
  cropperVisible = false;
  cropperSlot = 0;
  cropperImageFile: File | undefined = undefined;
  cropperTransform: ImageTransform = {};
  filePreviews: { [key: number]: string } = {};
  fileNames: { [key: number]: string } = {};
  @ViewChild('imageCropperRef') private imageCropperRef!: ImageCropperComponent;
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
    this.usuario = this.apiRest.getUsuario()!;
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
    this.categoriaSeleccionadaT = torneo.categoria;
    this.jugadorSeleccionadoIdClub = null;
    this.filtroInscripcion = '';
    this.jugadoresDisponiblesClub = [];
    this.jugadoresInscritosTorneo = [];

    this.apiRest.get_jugadores_categoriasId(torneo.categoria, torneo.IdTorneo)
      .subscribe((res: any) => {
        this.jugadoresDisponiblesClub = res.jugadoresDisponibles ?? [];
      });

    this.apiRest.jugadoresEquipoTorneo(torneo.IdTorneo, this.equipo.id)
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
      this.IdTorneoSelect, this.usuario.fk_equipo, this.categoriaSeleccionadaT, jugador.id
    ).subscribe({
      next: (res: any) => {
        this.inscribiendoJugadorId = null;
        if (res.msj?.toLowerCase().includes('exit') || res.msj?.toLowerCase().includes('agre') || res.success) {
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

  async CarnetsEquipo(torneo: any) {
    Swal.fire({ title: 'Generando carnets...', text: 'Por favor espere', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

    let jugadores: any[] = [];
    try {
      const res: any = await this.apiRest.jugadoresEquipoTorneo(torneo.IdTorneo, this.equipo.id).toPromise();
      jugadores = res?.jugadores ?? [];
    } catch {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo obtener los jugadores.' });
      return;
    }

    if (!jugadores.length) {
      Swal.fire({ icon: 'warning', title: 'Sin jugadores', text: 'No hay jugadores inscritos en este torneo.' });
      return;
    }

    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });

    // Dimensiones página A4
    const marginX = 8, marginY = 8, gapX = 4, gapY = 4;
    const cW = (210 - marginX * 2 - gapX) / 2;  // ~95mm
    const cH = 65;
    const perPagina = 8; // 2 col × 4 filas

    const logoApp  = await this.imgToBase64('assets/img/logo.png');
    // ImgEq viene en cada jugador del endpoint; usamos el primero disponible (el autogol tiene ImgEq=null)
    const imgEq    = jugadores.find((j: any) => j.ImgEq)?.ImgEq ?? this.equipo?.img1 ?? '';
    const logoClub = imgEq ? await this.imgToBase64(this.pathIm + imgEq) : '';
    const fondo    = await this.imgToBase64(this.pathIm + 'imagenes/fondo.jpg');

    for (let i = 0; i < jugadores.length; i++) {
      if (i > 0 && i % perPagina === 0) doc.addPage();

      const posEnPag = i % perPagina;
      const col = posEnPag % 2;
      const row = Math.floor(posEnPag / 2);
      const x   = marginX + col * (cW + gapX);
      const y   = marginY + row * (cH + gapY);

      const jug  = jugadores[i];
      const foto = jug.img1 ? await this.imgToBase64(this.pathIm + jug.img1) : '';

      this.dibujarCarnet(doc, jug, torneo, x, y, cW, cH, logoApp, logoClub, foto, fondo);
    }

    Swal.close();
    doc.save(`carnets_${(this.equipo?.nombre ?? 'equipo').replace(/\s+/g, '_')}.pdf`);
  }

  private dibujarCarnet(
    doc: any, jug: any, torneo: any,
    x: number, y: number, w: number, h: number,
    logoApp: string, logoClub: string, foto: string, _fondo: string = ''
  ) {
    const G  = [27, 94, 32]    as [number,number,number];
    const GL = [232, 245, 233]  as [number,number,number];
    const B  = [255, 255, 255]  as [number,number,number];
    const D  = [26, 26, 26]    as [number,number,number];
    const fmt = (d: string) => d.startsWith('data:image/png') ? 'PNG' : 'JPEG';

    // ── Fondo blanco base ─────────────────────────────────────────
    doc.setFillColor(...B);
    doc.rect(x, y, w, h, 'F');

    // ── HEADER (fondo verde oscuro) ───────────────────────────────
    const hH = 22;
    doc.setFillColor(...G);
    doc.rect(x, y, w, hH, 'F');

    // Etiqueta "TORNEO OFICIAL XXXX" semitransparente
    const year = String(torneo.fecha_inicio ?? '').substring(0, 4) || String(new Date().getFullYear());
    doc.setGState(doc.GState({ opacity: 0.55 }));
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(4.8);
    doc.setTextColor(...B);
    doc.text(`TORNEO OFICIAL ${year}`, x + 4, y + 3.8);
    doc.setGState(doc.GState({ opacity: 1 }));

    // Logos con fondo circular blanco
    const lSz = 13;    // tamaño imagen logo
    const lBg = 16;    // diámetro círculo de fondo
    const lR  = lBg / 2;
    const lPad = (lBg - lSz) / 2;
    const lY  = y + hH - lBg - 2;   // alineados al fondo del header

    const l1X = x + 4;
    const l2X = l1X + lBg + 3;

    doc.setFillColor(...B);
    doc.roundedRect(l1X, lY, lBg, lBg, lR, lR, 'F');
    doc.roundedRect(l2X, lY, lBg, lBg, lR, lR, 'F');

    const cx1 = l1X + lBg / 2, cx2 = l2X + lBg / 2, cyCtr = lY + lBg / 2;

    doc.internal.write('q');
    this.clipToCircle(doc, cx1, cyCtr, lSz / 2);
    if (logoApp)  try { doc.addImage(logoApp,  fmt(logoApp),  l1X + lPad, lY + lPad, lSz, lSz); } catch {}
    doc.internal.write('Q');

    doc.internal.write('q');
    this.clipToCircle(doc, cx2, cyCtr, lSz / 2);
    if (logoClub) try { doc.addImage(logoClub, fmt(logoClub), l2X + lPad, lY + lPad, lSz, lSz); } catch {}
    doc.internal.write('Q');

    // Nombre del torneo (a la derecha de los logos)
    const tnX = l2X + lBg + 4;
    const tnW = x + w - tnX - 3;
    doc.setTextColor(...B);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    const tnL  = doc.splitTextToSize((torneo.nombre ?? '').toUpperCase(), tnW);
    const tnTH = Math.min(tnL.length, 3) * 4.2;
    const tnY  = y + (hH - tnTH) / 2 + 3.8;
    tnL.slice(0, 3).forEach((l: string, i: number) => doc.text(l, tnX, tnY + i * 4.2));

    // ── CUERPO (blanco) ───────────────────────────────────────────
    const bY = y + hH;
    const bH = h - hH - 8;

    // Foto jugador
    const pX = x + 4, pY = bY + 3, pW = 25, pH = bH - 6;
    if (foto) {
      try { doc.addImage(foto, fmt(foto), pX, pY, pW, pH); } catch {}
    } else {
      doc.setFillColor(208, 228, 208);
      doc.rect(pX, pY, pW, pH, 'F');
      doc.setFontSize(5);
      doc.setTextColor(140, 170, 140);
      doc.text('Sin foto', pX + pW / 2, pY + pH / 2, { align: 'center' });
    }
    doc.setDrawColor(...G); doc.setLineWidth(0.6);
    doc.rect(pX, pY, pW, pH, 'S');

    // Nombre + campos con chip
    const dX = pX + pW + 4;
    const dW = x + w - dX - 3;
    let   dY = bY + 7;

    doc.setFont('helvetica', 'bold'); doc.setFontSize(8); doc.setTextColor(...G);
    const nL = doc.splitTextToSize((jug.nombre ?? '').toUpperCase(), dW);
    nL.slice(0, 2).forEach((l: string, i: number) => doc.text(l, dX, dY + i * 4.5));
    dY += Math.min(nL.length, 2) * 4.5 + 2;

    const chipW = 13;
    const filas: [string, string][] = [
      ['PERÍODO', `${torneo.fecha_inicio ?? ''} / ${torneo.fecha_fin ?? ''}`],
      ['CÉDULA',  String(jug.identificacion ?? '')],
      ['NAC.',    jug.fecha_nacimiento ?? ''],
      ['CLUB',    this.equipo?.nombre ?? ''],
    ];
    for (const [label, valor] of filas) {
      if (dY > bY + bH - 1) break;
      doc.setFillColor(...GL);
      doc.rect(dX, dY - 3.4, chipW, 4.6, 'F');
      doc.setFontSize(4.8); doc.setFont('helvetica', 'bold'); doc.setTextColor(...G);
      doc.text(label, dX + 0.8, dY);
      doc.setFontSize(5.8); doc.setFont('helvetica', 'normal'); doc.setTextColor(...D);
      const vL = doc.splitTextToSize(valor, dW - chipW - 2);
      doc.text(vL[0] ?? '', dX + chipW + 2, dY);
      dY += 4.8;
    }

    // ── FOOTER ───────────────────────────────────────────────────
    const fY = y + h - 8;
    doc.setFillColor(...G);
    doc.rect(x, fY, w, 8, 'F');
    doc.setTextColor(...B); doc.setFont('helvetica', 'bold'); doc.setFontSize(6.5);
    doc.text((this.equipo?.nombre ?? '').toUpperCase(), x + w / 2, fY + 5.2, { align: 'center' });

    // ── Borde exterior ───────────────────────────────────────────
    doc.setDrawColor(...G); doc.setLineWidth(0.8);
    doc.rect(x, y, w, h, 'S');
  }

  private clipToCircle(doc: any, cx: number, cy: number, r: number): void {
    const sf = doc.internal.scaleFactor;
    const pH = doc.internal.pageSize.getHeight();
    const k = 0.5523, kr = k * r;
    const tx = (v: number) => (v * sf).toFixed(3);
    const ty = (v: number) => ((pH - v) * sf).toFixed(3);
    const ops = [
      `${tx(cx)} ${ty(cy - r)} m`,
      `${tx(cx + kr)} ${ty(cy - r)} ${tx(cx + r)} ${ty(cy - kr)} ${tx(cx + r)} ${ty(cy)} c`,
      `${tx(cx + r)} ${ty(cy + kr)} ${tx(cx + kr)} ${ty(cy + r)} ${tx(cx)} ${ty(cy + r)} c`,
      `${tx(cx - kr)} ${ty(cy + r)} ${tx(cx - r)} ${ty(cy + kr)} ${tx(cx - r)} ${ty(cy)} c`,
      `${tx(cx - r)} ${ty(cy - kr)} ${tx(cx - kr)} ${ty(cy - r)} ${tx(cx)} ${ty(cy - r)} c`,
      'h W n'
    ].join(' ');
    doc.internal.write(ops);
  }

  private async imgToBase64(url: string): Promise<string> {
    try {
      const res = await fetch(url, { mode: 'cors' });
      if (!res.ok) return '';
      const blob = await res.blob();
      return await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload  = () => resolve(reader.result as string);
        reader.onerror = () => resolve('');
        reader.readAsDataURL(blob);
      });
    } catch {
      return '';
    }
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
    this.frmGuardar = new FormData();
    this.filePreviews = {};
    this.fileNames = {};
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

verImagen(url: string) { this.imgPreview = url; }
cerrarImagen() { this.imgPreview = ''; }

abrirCropper(ev: any, numFile: number) {
  const file: File | undefined = ev.target?.files?.[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) { this.uploadImage(ev, numFile); return; }
  this.cropperSlot = numFile;
  this.cropperImageFile = file;
  this.cropperTransform = {};
  this.fileNames[numFile] = file.name;
  this.cropperVisible = true;
}
cropperRotarLeft()  { this.cropperTransform = { ...this.cropperTransform, rotate: (this.cropperTransform.rotate ?? 0) - 90 }; }
cropperRotarRight() { this.cropperTransform = { ...this.cropperTransform, rotate: (this.cropperTransform.rotate ?? 0) + 90 }; }
confirmarCrop() {
  if (!this.imageCropperRef) return;
  const result = this.imageCropperRef.crop('base64');
  if (!result?.base64) return;
  const slot = this.cropperSlot;
  const fname = this.fileNames[slot] || `foto_${slot}.jpg`;
  this.filePreviews[slot] = result.base64;
  const file = this.base64ToFile(result.base64, fname);
  this.frmGuardar.delete(String(slot));
  this.frmGuardar.append(String(slot), file);
  this.cerrarCropper();
}
cerrarCropper() {
  this.cropperVisible = false;
  this.cropperImageFile = undefined;
  this.cropperTransform = {};
  const input = document.getElementById(`fileInput${this.cropperSlot}`) as HTMLInputElement;
  if (input) input.value = '';
}
triggerInput(n: number) { (document.getElementById(`fileInput${n}`) as HTMLInputElement)?.click(); }
private base64ToFile(dataUrl: string, filename: string): File {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], filename, { type: mime });
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
