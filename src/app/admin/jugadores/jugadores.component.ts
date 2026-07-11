import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from "../../services/api.service";
import { CommonModule } from '@angular/common';
import { Jugadores, User } from '../../interfaces/interfaces';
import { PaginacionComponent } from '../paginacion/paginacion.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { environment } from "../../../environments/environment";
import { Modal } from 'bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { EscanerComponent } from '../../components/escaner/escaner.component';
import { DatosCedula } from '../../services/cedula-parser.service';

@Component({
  selector: 'app-jugadores',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, PaginacionComponent, EscanerComponent],
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
  imgSelect: string | null = null;
  nameSelect: string = '';

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
  imgVisi: string = '';
  JugadorVisi: string = '';
  mostrarModal: boolean = false;
  currentSlide: number = 0;
  mostrarEscaner: boolean = false;
  filePreviews: { [key: number]: string } = {};
  fileNames: { [key: number]: string } = {};
  carouselPreviews: { [key: number]: string } = {};
  mostrarCamara: boolean = false;
  cameraSlot: number = 0;
  private mediaStream: MediaStream | null = null;
  departamentos: any[] = [];
  ciudades: any[] = [];


  constructor(private apiRest: ApiService, private router: Router, private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.UserLog = this.apiRest.getUser();
    this.loadDepartamentos();
    this.initForm();
    this.creando = false;

    const idTorneo = this.route.snapshot.paramMap.get('idTorneo');
    const idEquipo = this.route.snapshot.paramMap.get('idEquipo');

    if (idTorneo && idEquipo) {
      // 🔸 Si llegan parámetros, cargar jugadores por torneo/equipo

      this.apiRest.get_jugadores_Torneo_Equipo(idTorneo, idEquipo).subscribe((res: any) => {
        this.jugadores = res.jugadores;
        this.paginas = res.cant_paginas;


      });




    } else {
      // 🔸 Si no llegan parámetros, cargar todos los jugadores
      this.apiRest.get_All_jugadores().subscribe((res: any) => {
        this.jugadores = res.jugadores;
        this.paginas = res.cant_paginas;


      });
    }


  }

  loadDepartamentos() {
    this.apiRest.get_departamentos().subscribe((res: any) => {
      this.departamentos = res.departamentos || [];
    });
  }

  loadCiudades(idDepto: number, selectedCiudad?: number) {
    this.ciudades = [];
    if (!idDepto) return;
    this.apiRest.get_ciudades_by_departamento(idDepto).subscribe((res: any) => {
      this.ciudades = res.ciudades || [];
      if (selectedCiudad) {
        this.JugadorForm.patchValue({ fk_ciudad: String(selectedCiudad) }, { emitEvent: false });
      }
    });
  }

  onDepartamentoChange(idDepto: any) {
    const id = parseInt(idDepto, 10);
    this.JugadorForm.patchValue({ fk_ciudad: null });
    this.ciudades = [];
    if (id > 0) this.loadCiudades(id);
  }

  initForm() {
    this.ciudades = [];
    this.JugadorForm = this.fb.group({
      name: ['', Validators.required],
      identificacion: [''],
      genero: ['', Validators.required],
      fch_nacimiento: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      posicion: ['', Validators.required],
      estado: [''],
      TipoDoc: ['', Validators.required],
      nomMadre: [''],
      telMadre: [''],
      nomPadre: [''],
      telPadre: [''],
      fk_departamento: [null],
      fk_ciudad: [null]
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
    this.frmGuardar = new FormData();
    this.filePreviews = {};
    this.fileNames = {};
    this.operation = 'add';
    this.editForm = false;
    this.creando = true;
  }

  abrirEscaner() {
    this.mostrarEscaner = true;
  }

  cerrarEscaner() {
    this.mostrarEscaner = false;
  }

  onDatosEscaneados(datos: DatosCedula) {
    this.cerrarEscaner();

    const tipoDocNum    = datos.tipoDocumento === 'TI' ? 2 : 3;
    const nombreCompleto = [datos.primerNombre, datos.segundoNombre, datos.primerApellido, datos.segundoApellido]
      .filter(Boolean).join(' ');
    const fechaISO = this.fechaParaInput(datos.fechaNacimiento);

    this.apiRest.valid_jugador(Number(datos.numeroCedula)).subscribe((res: any) => {
      if (!res.success) {
        const jug = res.jugador ?? {};
        const foto = jug.img1 ? `<img src="${this.pathIm}${jug.img1}" style="width:68px;height:68px;border-radius:50%;object-fit:cover;border:3px solid #10b981;flex-shrink:0" onerror="this.style.display='none'">` : `<div style="width:68px;height:68px;border-radius:50%;background:#10b981;display:flex;align-items:center;justify-content:center;font-size:1.6rem;font-weight:900;color:#0f172a;flex-shrink:0">${(jug.nombre ?? nombreCompleto).charAt(0)}</div>`;
        const tipDoc: Record<number,string> = {1:'Reg. Civil', 2:'Tarjeta Id.', 3:'Cédula', 4:'C. Extranjería', 5:'Pasaporte'};
        const fila = (label: string, val: string, last = false) => `<div style="display:flex;justify-content:space-between;align-items:center;padding:9px 14px;${last?'':'border-bottom:1px solid rgba(255,255,255,.1)'}"><span style="color:#94a3b8 !important;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px">${label}</span><span style="color:#ffffff !important;font-size:0.88rem;font-weight:600">${val}</span></div>`;
        Swal.fire({
          background: '#1e293b',
          color: '#ffffff',
          icon: undefined,
          title: '',
          html: `
            <div style="font-family:'Segoe UI',sans-serif;color:#fff">
              <div style="display:flex;align-items:center;gap:14px;margin-bottom:18px;text-align:left">
                ${foto}
                <div>
                  <div style="font-size:1.1rem;font-weight:800;color:#ffffff !important;line-height:1.25">${jug.nombre ?? nombreCompleto}</div>
                  <div style="font-size:0.82rem;color:#10b981 !important;font-weight:700;margin-top:4px">${tipDoc[jug.tipoDoc] ?? 'Doc'} &nbsp;·&nbsp; ${jug.identificacion ?? datos.numeroCedula}</div>
                  <div style="display:inline-block;margin-top:7px;padding:3px 12px;border-radius:20px;font-size:0.72rem;font-weight:700;background:${jug.estado==1?'rgba(16,185,129,.25)':'rgba(239,68,68,.25)'};color:${jug.estado==1?'#6ee7b7':'#fca5a5'} !important;border:1px solid ${jug.estado==1?'rgba(16,185,129,.4)':'rgba(239,68,68,.4)'}">${jug.estado==1?'✓ Activo':'✗ Inactivo'}</div>
                </div>
              </div>
              <div style="background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:12px;overflow:hidden;text-align:left;margin-bottom:12px">
                ${jug.email ? fila('Correo', jug.email) : ''}
                ${jug.fecha_nacimiento ? fila('Nacimiento', jug.fecha_nacimiento) : ''}
                ${jug.genero ? fila('Género', jug.genero, true) : ''}
              </div>
              <div style="padding:10px 14px;background:rgba(234,179,8,.12);border:1px solid rgba(234,179,8,.3);border-radius:10px;color:#fde68a !important;font-size:0.82rem;font-weight:600;text-align:left">
                ⚠️&nbsp; ${res.msj}
              </div>
            </div>`,
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#ef4444',
        });
        return;
      }

      this.tipoDoc = tipoDocNum;
      this.updateDocumentoByValue(tipoDocNum);
      this.operation = 'add';
      this.editForm = false;
      this.frmGuardar = new FormData();
      this.filePreviews = {};
      this.fileNames = {};
      this.initForm();
      this.creando = true;

      setTimeout(() => {
        this.JugadorForm.patchValue({
          name:           nombreCompleto,
          identificacion: datos.numeroCedula,
          genero:         datos.sexo || 'Masculino',
          fch_nacimiento: fechaISO,
          TipoDoc:        tipoDocNum
        });
        if (fechaISO) this.EdadJugador = this.calcularEdad(fechaISO);
      });
    });
  }

  private fechaParaInput(ddmmyyyy: string): string {
    if (!ddmmyyyy) return '';
    const [dd, mm, yyyy] = ddmmyyyy.split('/');
    if (!dd || !mm || !yyyy) return '';
    return `${yyyy}-${mm}-${dd}`;
  }

  saveJugador() {
    const idTorneo = this.route.snapshot.paramMap.get('idTorneo');
    const idEquipo = this.route.snapshot.paramMap.get('idEquipo');

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
        this.JugadorForm.get('edad')?.setValue(this.EdadJugador);
        this.frmGuardar.append('data', JSON.stringify(this.JugadorForm.value));
        this.frmGuardar.append('operacion', this.operation);
        this.frmGuardar.append('usuario', String(this.UserLog.id));
        this.frmGuardar.append('idEdit', JSON.stringify(this.idEdit));
        this.frmGuardar.append('perfil', JSON.stringify(this.UserLog.perfil));
        this.frmGuardar.append('torneo', JSON.stringify(idTorneo));
        this.frmGuardar.append('equipo', JSON.stringify(idEquipo));

        this.isLoading = true;

        this.apiRest.add_jugador(this.frmGuardar)
          .subscribe((data: any) => {
            console.log(data);
            if (data.success == true) {
              this.jugadores = data.jugadores;
              Swal.fire(data.msj);
              this.isLoading = false;
              this.frmGuardar = new FormData();
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

      this.frmGuardar.append(`${numFile}`, file);

      const fileName = file.name;
      this.fileNames[numFile] = fileName;
      const labelElement = document.getElementById(`labelFile${numFile}`);
      if (labelElement) { labelElement.textContent = fileName; }

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: any) => { this.filePreviews[numFile] = e.target.result; };
        reader.readAsDataURL(file);
      } else {
        delete this.filePreviews[numFile];
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
    this.frmGuardar = new FormData();
    this.filePreviews = {};
    this.fileNames = {};
    this.apiRest.editJugador(id)
      .subscribe((res: any) => {
        this.jugadorSelect = res.jugador;
        this.tipoDoc = Number(this.jugadorSelect.tipoDoc);
        this.updateDocumentoByValue(this.tipoDoc);

        const rawDepto = this.jugadorSelect['fk_departamento'];
        const rawCiudad = this.jugadorSelect['fk_ciudad'];
        const fkDepto = rawDepto ? String(rawDepto) : null;
        const fkCiudad = rawCiudad ? String(rawCiudad) : null;

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
          telPadre: this.jugadorSelect.telefono_padre,
          fk_departamento: fkDepto,
          fk_ciudad: null
        });

        if (rawDepto) {
          this.loadCiudades(Number(rawDepto), rawCiudad ? Number(rawCiudad) : undefined);
        }




        this.carouselPreviews = {};
        this.creando = true;
        this.editForm = true;

      });
  }


  openModal(url: string, nombre: string) {
    this.imgSelect = url;
    this.nameSelect = nombre;
  }

  closeModal() {
    this.imgSelect = null;
    this.nameSelect = '';
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


  updateDocumentoByValue(selectValue: any): void {
    const selectedValue = parseInt(selectValue.toString(), 10);



    if (selectedValue === 1) {
      // Registro civil
      this.labedoc2 = 'Foto del Registro civil';
      this.labedoc3 = 'Adjunto adicional';
      this.labedoc4 = 'Adjunto adicional';

    } else if (selectedValue === 2) {
      // Tarjeta Identidad
      this.labedoc2 = 'Foto Tarjeta Identidad Frontal';
      this.labedoc3 = 'Foto Tarjeta Identidad Trasera';
      this.labedoc4 = 'Foto de registro civil';
      this.labedoc5 = 'Adjunto en pdf';

    } else if (selectedValue === 3) {
      // Cédula de ciudadanía
      this.labedoc2 = 'Foto Cédula de ciudadanía Frontal';
      this.labedoc3 = 'Foto Cédula de ciudadanía Trasera';
      this.labedoc4 = 'Adjunto adicional';

    } else if (selectedValue === 4) {
      // Cédula extranjería
      this.labedoc2 = 'Foto Cédula de extranjería Frontal';
      this.labedoc3 = 'Foto Cédula de extranjería Trasera';
      this.labedoc4 = 'Adjunto adicional';

    } else if (selectedValue === 5) {
      // Pasaporte
      this.labedoc2 = 'Foto Pasaporte';
      this.labedoc3 = 'Adjunto adicional';
      this.labedoc4 = 'Adjunto adicional';
    }
  }


  aplicarFiltros() {
    const nombre = this.filtroNombre.toLowerCase();
    const identificacion = this.filtroIdentificacion.toLowerCase();
    const correo = this.filtroCorreo.toLowerCase();

    this.apiRest.get_All_jugadoresFilt(nombre, identificacion, correo).subscribe((res: any) => {
      this.jugadores = res.jugadores;
      this.paginas = res.cant_paginas;
    });


  }

  Inicio() {
    this.router.navigate(['/DelegaCh']);
  }

  prevSlide() {
    this.currentSlide = this.currentSlide === 0 ? 1 : 0;
  }

  // 3. Función para avanzar
  nextSlide() {
    this.currentSlide = this.currentSlide === 0 ? 1 : 0;
  }

  rotarSlot(i: number, dir: 'left' | 'right') {
    const src = this.filePreviews[i];
    if (!src) return;
    this.rotarBase64(src, dir === 'right' ? 90 : -90).then(rotated => {
      this.filePreviews[i] = rotated;
      const file = this.base64ToFile(rotated, this.fileNames[i] || `foto_${i}.jpg`);
      this.frmGuardar.delete(String(i));
      this.frmGuardar.append(String(i), file);
    });
  }

  rotarCarrusel(imgNum: number, dir: 'left' | 'right') {
    const key = `img${imgNum}` as keyof Jugadores;
    const src = this.carouselPreviews[imgNum] || (this.pathIm + (this.jugadorSelect[key] as string));
    this.rotarBase64(src, dir === 'right' ? 90 : -90).then(rotated => {
      this.carouselPreviews[imgNum] = rotated;
      const file = this.base64ToFile(rotated, `imagen_${imgNum}.jpg`);
      this.frmGuardar.delete(String(imgNum));
      this.frmGuardar.append(String(imgNum), file);
    });
  }

  private rotarBase64(src: string, degrees: number): Promise<string> {
    return new Promise(resolve => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const swap = Math.abs(degrees) === 90 || Math.abs(degrees) === 270;
        const canvas = document.createElement('canvas');
        canvas.width  = swap ? img.height : img.width;
        canvas.height = swap ? img.width  : img.height;
        const ctx = canvas.getContext('2d')!;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((degrees * Math.PI) / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
        resolve(canvas.toDataURL('image/jpeg', 0.92));
      };
      img.src = src;
    });
  }

  private base64ToFile(dataUrl: string, filename: string): File {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  }

  getDocLabel(i: number): string {
    const map: { [key: number]: string } = {
      1: this.labedoc1, 2: this.labedoc2, 3: this.labedoc3,
      4: this.labedoc4, 5: this.labedoc5
    };
    return map[i] ?? `Soporte ${i}`;
  }

  triggerInput(i: number) {
    (document.getElementById(`fileInput${i}`) as HTMLInputElement)?.click();
  }

  abrirCamara(i: number) {
    this.cameraSlot = i;
    this.mostrarCamara = true;
    setTimeout(() => {
      const video = document.getElementById('cameraVideo') as HTMLVideoElement;
      if (!video) return;
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false })
        .then(stream => {
          this.mediaStream = stream;
          video.srcObject = stream;
          video.play();
        })
        .catch(() => {
          Swal.fire('No se pudo acceder a la cámara');
          this.cerrarCamara();
        });
    }, 150);
  }

  capturarFoto() {
    const video = document.getElementById('cameraVideo') as HTMLVideoElement;
    if (!video) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0);
    canvas.toBlob(blob => {
      if (!blob) return;
      const file = new File([blob], `foto_soporte_${this.cameraSlot}.jpg`, { type: 'image/jpeg' });
      this.frmGuardar.append(`${this.cameraSlot}`, file);
      this.fileNames[this.cameraSlot] = file.name;
      const reader = new FileReader();
      reader.onload = (e: any) => { this.filePreviews[this.cameraSlot] = e.target.result; };
      reader.readAsDataURL(file);
      const lbl = document.getElementById(`labelFile${this.cameraSlot}`);
      if (lbl) lbl.textContent = file.name;
      this.cerrarCamara();
    }, 'image/jpeg', 0.92);
  }

  cerrarCamara() {
    this.mediaStream?.getTracks().forEach(t => t.stop());
    this.mediaStream = null;
    this.mostrarCamara = false;
  }

}