import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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

  private readonly destroyRef = inject(DestroyRef);

  constructor(private apiRest: ApiService,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    this.initForm();
    this.creando = false;

    this.apiRest.get_All_eq()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => { this.equipos = res.equipos; },
        error: () => Swal.fire('Error al cargar equipos')
      });

    this.apiRest.get_All_categorias_activas()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.categoriasDisponibles = res.categoriasDisponibles.map((cat: any) => ({
            id: Number(cat.id),
            nombre: cat.nombre
          }));
        },
        error: () => Swal.fire('Error al cargar categorías')
      });

    this.apiRest.get_All_users()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.users = res.users;
          this.paginas = res.cant_paginas;
        },
        error: () => Swal.fire('Error al cargar usuarios')
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
    if (this.UserForm.invalid) {
      this.UserForm.markAllAsTouched();
      return;
    }

    this.frmGuardar.append('data', JSON.stringify(this.UserForm.value));
    this.frmGuardar.append('operacion', this.operation);
    this.frmGuardar.append('iduser', JSON.stringify(this.idEdit));

    this.isLoading = true;
    this.apiRest.add_user(this.frmGuardar).subscribe({
      next: (data: any) => {
        this.isLoading = false;
        if (data.success == true) {
          this.users = data.users;
          Swal.fire(data.msj);
          this.initForm();
          this.creando = false;
          this.frmGuardar = new FormData();
        } else {
          Swal.fire(data.msj);
        }
      },
      error: () => {
        this.isLoading = false;
        Swal.fire('Error de conexión. Intenta de nuevo.');
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
          passw: '',
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

  toggleEstado(us: any) {
    const nuevoEstado = us.estado == 1 ? 0 : 1;
    this.apiRest.toggleEstadoUser(us.id, nuevoEstado).subscribe((res: any) => {
      if (res.success) us.estado = nuevoEstado;
    });
  }

  deleteUser(id: number) {
    Swal.fire({
      title: "Desea eliminar este usuario?",
      showDenyButton: true,
      confirmButtonText: "Si"
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiRest.deleteUser(id)
          .subscribe((res: any) => {
            if (res.success) {
              this.apiRest.get_All_users().subscribe((r: any) => {
                this.users = r.users;
                this.paginas = r.cant_paginas;
              });
            }
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

  getNombreEquipo(fkEquipo: any): string | null {
    if (!fkEquipo) return null;
    return this.equipos.find((e) => Number(e.id) === Number(fkEquipo))?.nombre ?? null;
  }

  copiarCredenciales(us: User) {
    const nombreEquipo = this.getNombreEquipo(us.fk_equipo);
    const esAdminEquipo = Number(us.perfil) === 2;
    const lineaEquipo = nombreEquipo
      ? `equipo: ${nombreEquipo}\n`
      : esAdminEquipo ? `equipo: (sin equipo asignado)\n` : '';
    const texto = `${lineaEquipo}usuario: ${us.usuario ?? ''}\npass: ${us.password ?? ''}`;
    navigator.clipboard.writeText(texto).then(() => {
      Swal.fire({
        toast: true,
        icon: 'success',
        title: '¡Credenciales copiadas!',
        text: nombreEquipo ? `${nombreEquipo} · ${us.usuario ?? ''}` : (us.usuario ?? ''),
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });
    });
  }

  async exportarPDF() {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ orientation: 'l', unit: 'mm', format: 'a4' });

    const pw = 297, ph = 210, ml = 10, mr = 10;
    const logoImg = await this._fetchImgBase64(`${window.location.origin}/assets/img/logo.png`);

    // Header
    doc.setFillColor(8, 47, 73);
    doc.rect(0, 0, pw, 36, 'F');
    doc.setFillColor(16, 185, 129);
    doc.rect(pw - 50, 0, 50, 36, 'F');

    if (logoImg) {
      doc.addImage(logoImg.data, logoImg.fmt as any, ml, 4, 26, 26, undefined, 'FAST');
    }
    const tx = logoImg ? ml + 32 : ml;

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('USUARIOS', tx, 18);

    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(134, 239, 172);
    doc.text('Control de acceso · Gestión de perfiles y accesos al sistema', tx, 27);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(`${this.users.length}`, pw - mr, 14, { align: 'right' });
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.text('USUARIOS', pw - mr, 20, { align: 'right' });
    const fecha = new Date().toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' });
    doc.setFontSize(6);
    doc.text(fecha, pw - mr, 28, { align: 'right' });

    // Column definitions (x = absolute position on page)
    const cols = [
      { label: '#',          x: 10  },
      { label: 'USUARIO',    x: 20  },
      { label: 'NOMBRE',     x: 102 },
      { label: 'CONTRASEÑA', x: 175 },
      { label: 'PERFIL',     x: 212 },
      { label: 'ESTADO',     x: 256 },
    ];
    const rowH = 8;
    let y = 40;

    // Table header
    doc.setFillColor(15, 23, 42);
    doc.rect(ml, y, pw - ml - mr, rowH, 'F');
    doc.setTextColor(148, 163, 184);
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'bold');
    cols.forEach(c => doc.text(c.label, c.x + 2, y + 5.5));
    y += rowH;

    // Data rows
    for (let i = 0; i < this.users.length; i++) {
      const us = this.users[i];
      doc.setFillColor(i % 2 === 0 ? 255 : 248, i % 2 === 0 ? 255 : 250, i % 2 === 0 ? 255 : 252);
      doc.rect(ml, y, pw - ml - mr, rowH, 'F');

      // #
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(148, 163, 184);
      doc.text(String(i + 1), cols[0].x + 2, y + 5.5);

      // USUARIO
      doc.setFont('courier', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(30, 41, 59);
      doc.text((us.usuario ?? '').substring(0, 38), cols[1].x + 2, y + 5.5);

      // NOMBRE
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(15, 23, 42);
      doc.text((us.nombre ?? '').toUpperCase().substring(0, 30), cols[2].x + 2, y + 5.5);

      // CONTRASEÑA
      doc.setFont('courier', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(220, 38, 38);
      doc.text((us.password ?? '').substring(0, 16), cols[3].x + 2, y + 5.5);

      // PERFIL badge
      const pLabels: { [k: string]: string } = { '1': 'Admin', '2': 'Admin Eq.', '3': 'Delegado', '4': 'Admin Cat.' };
      const pColors: { [k: string]: [number,number,number] } = {
        '1': [220,38,38], '2': [14,165,233], '3': [99,102,241], '4': [113,113,122]
      };
      const pl = pLabels[String(us.perfil)] ?? `P${us.perfil}`;
      const pc = pColors[String(us.perfil)] ?? [113,113,122];
      doc.setFillColor(pc[0], pc[1], pc[2]);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      const bw = doc.getTextWidth(pl) + 4;
      doc.roundedRect(cols[4].x + 2, y + 1.5, bw, 5, 1, 1, 'F');
      doc.setTextColor(255, 255, 255);
      doc.text(pl, cols[4].x + 4, y + 5.5);

      // ESTADO
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      if (us.estado == 1) {
        doc.setTextColor(16, 185, 129);
        doc.text('● Activo', cols[5].x + 2, y + 5.5);
      } else {
        doc.setTextColor(239, 68, 68);
        doc.text('● Inactivo', cols[5].x + 2, y + 5.5);
      }

      // Row divider
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.2);
      doc.line(ml, y + rowH, pw - mr, y + rowH);

      y += rowH;

      // New page
      if (y > ph - 16) {
        doc.addPage();
        doc.setFillColor(15, 23, 42);
        doc.rect(0, 0, pw, 12, 'F');
        doc.setTextColor(134, 239, 172);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.text('USUARIOS — continuación', ml, 8);
        y = 16;
        doc.setFillColor(15, 23, 42);
        doc.rect(ml, y, pw - ml - mr, rowH, 'F');
        doc.setTextColor(148, 163, 184);
        doc.setFontSize(6.5);
        doc.setFont('helvetica', 'bold');
        cols.forEach(c => doc.text(c.label, c.x + 2, y + 5.5));
        y += rowH;
      }
    }

    // Footer total
    doc.setFillColor(241, 245, 249);
    doc.rect(ml, y, pw - ml - mr, 8, 'F');
    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text(`Total: ${this.users.length} usuario${this.users.length !== 1 ? 's' : ''}`, ml + 3, y + 5.5);

    doc.save('usuarios_soccer.pdf');
  }

  private async _fetchImgBase64(url: string): Promise<{ data: string; fmt: string } | null> {
    try {
      const resp = await fetch(url);
      if (!resp.ok) return null;
      const blob = await resp.blob();
      const ext = url.split('.').pop()?.toLowerCase() ?? 'jpg';
      const fmt = ext === 'png' ? 'PNG' : 'JPEG';
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload  = () => resolve({ data: reader.result as string, fmt });
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(blob);
      });
    } catch { return null; }
  }

}

