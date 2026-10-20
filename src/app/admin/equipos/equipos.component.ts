import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageCropperComponent, ImageTransform } from 'ngx-image-cropper';
import Swal from 'sweetalert2';
import { ApiService } from "../../services/api.service";
import { CommonModule } from '@angular/common';
import { Equipos, User, Categoria } from '../../interfaces/interfaces';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { PaginacionComponent } from '../paginacion/paginacion.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { environment } from "../../../environments/environment";
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';



@Component({
  selector: 'app-equipos',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgSelectModule, PaginacionComponent, ImageCropperComponent],
  templateUrl: './equipos.component.html',
  styleUrl: './equipos.component.css'
})
export class EquiposComponent implements OnInit {
  equipos: Equipos[] = [];
  equiposFiltrados: Equipos[] = [];
  equipoSelect!: Equipos;
  creando!: boolean;
  pathIm = environment.apiURL;
  EquipoForm!: FormGroup;
  frmGuardar = new FormData();
  isLoading: boolean = false;
  isEditing: boolean = false;
  editForm: boolean = false;
  idEdit = 0;
  operation = 'add';
  isModalOpen: boolean = false;
  Valcategorias: boolean = false;
  modalImage: string = '';
  imgVisi: String = '';
  EquivoVisi: String = '';
  UserLog!: User;
  categoriasDisponibles: any[] = []; // Debes llenar esto con loadCategorias()
  categoriasSeleccionadas: { [key: number]: boolean } = {};
  categoriasEquipo: any[] = [];
  categoriaSeleccionada: any = null;
  jugadorSeleccionadoId: number | null = null;

  jugadoresDisponibles: any[] = [];
  idClub !:number;
  filtroNombre: string = '';
  filtroEmail: string = '';
  paginas = 0;
  usuariosEquipoModal: any[] = [];
  nombreEquipoModal: string = '';
  enviandoIdUsuario: number | null = null;
  cargandoCredenciales = false;
  private modalCredenciales?: Modal;
  departamentos: any[] = [];
  ciudades: any[] = [];
  cargandoCiudades = false;

  constructor(
    public apiRest: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loadCategorias();
    this.loadDepartamentos();
    this.UserLog = this.apiRest.getUser();
    this.initForm();
    this.creando = false;
    this.loadEquipos();

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
        this.EquipoForm.patchValue({ fk_ciudad: selectedCiudad }, { emitEvent: false });
      }
    });
  }

  onDepartamentoChange(idDepto: any) {
    const id = parseInt(idDepto, 10);
    this.EquipoForm.patchValue({ fk_ciudad: null });
    this.ciudades = [];
    if (id > 0) {
      this.loadCiudades(id);
    }
  }

  // Al cargar categorías, conviértelo a número:
  loadCategorias() {
    this.apiRest.get_All_categorias_activas().subscribe((res: any) => {
      this.categoriasDisponibles = res.categoriasDisponibles.map((cat: any) => ({
        id: Number(cat.id),   // aquí convierto id a número
        nombre: cat.nombre
      }));


    });

  }

  loadEquipos() {
    this.apiRest.get_All_equipos()
      .subscribe((res: any) => {
        this.equipos = res.equipos;
        this.paginas = res.cant_paginas;


      });
  }

    sigPag(pag: number) {


     this.apiRest.get_All_equipos(pag)
      .subscribe((res: any) => {
        this.equipos = res.equipos;
        this.paginas = res.cant_paginas;


      });

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


  initForm() {
    this.ciudades = [];
    this.EquipoForm = this.fb.group({
      name: ['', Validators.required],
      estado: ['', Validators.required],
      tel1: ['', Validators.required],
      tel2: ['', Validators.required],
      entrenador1: [''],
      entrenador2: [''],
      mail: ['', [Validators.required, Validators.email]],
      fk_departamento: [null],
      fk_ciudad: [null],
      categorias: this.fb.array([])
    });
  }

  editEquipo(id: number) {
    this.idEdit = id;
    this.operation = 'edit';

    this.apiRest.editEquipo(id).subscribe((res: any) => {
      this.equipoSelect = res.equipo;

      // Primero: Asigna categorías al FormArray (no solo con patchValue)
      const categoriasArray = this.EquipoForm.get('categorias') as FormArray;
      categoriasArray.clear();

      // Convierte strings a números si es necesario
      const categorias = this.equipoSelect.categorias?.map((cat: any) =>
        typeof cat === 'string' ? parseInt(cat) : (cat.id || cat)
      ) || [];

      // Agrega cada categoría al FormArray
      categorias.forEach((catId: number) => {
        categoriasArray.push(this.fb.control(catId));
      });

      // Segundo: Ahora sí carga las selecciones
      this.cargarCategoriasEquipo();

      const eq = res.equipo as any;

      // Tercero: Asigna el resto de campos
      this.EquipoForm.patchValue({
        name: this.equipoSelect.nombre,
        estado: this.equipoSelect.estado,
        mail: this.equipoSelect.email,
        tel1: this.equipoSelect.telefono1,
        tel2: this.equipoSelect.telefono2,
        entrenador1: (this.equipoSelect as any).entrenador1 || '',
        entrenador2: (this.equipoSelect as any).entrenador2 || '',
        fk_departamento: this.equipoSelect.departamento,
        fk_ciudad: this.equipoSelect.ciudad
      });

      // Carga ciudades del departamento seleccionado (y vuelve a setear fk_ciudad)
      if (eq.departamento) {
        this.loadCiudades(+eq.departamento, +eq.ciudad);
      }

      this.carouselPreviews = {};
      this.creando = true;
      this.editForm = true;
    });
  }


  saveEquipo() {

    this.frmGuardar.append('data', JSON.stringify(this.EquipoForm.value));
    this.frmGuardar.append('operacion', this.operation);
    this.frmGuardar.append('idEdit', JSON.stringify(this.idEdit));

    this.isLoading = true;
    this.apiRest.add_equipo(this.frmGuardar).subscribe((data: any) => {
      if (data.success) {
        this.equipos = data.equipos;
        Swal.fire(data.msj);
        this.isLoading = false;
        this.initForm();
        this.creando = false;
        this.frmGuardar = new FormData(); // limpiar formulario
      }else{

        Swal.fire(data.msj);
        this.isLoading = false;

      }
    });
  }




  openModal(path: String, equipo: String) {
    this.imgVisi = path;
    this.EquivoVisi = equipo;
    // data-bs-toggle en el elemento que dispara el click ya maneja el show
  }
  closeModal() {
    this.isModalOpen = false;
    this.modalImage = '';
  }

  imgPreview: string = '';
  cropperVisible = false;
  cropperSlot = 0;
  cropperImageFile: File | undefined = undefined;
  cropperTransform: ImageTransform = {};
  filePreviews: { [key: number]: string } = {};
  fileNames: { [key: number]: string } = {};
  carouselPreviews: { [key: number]: string } = {};
  @ViewChild('imageCropperRef') private imageCropperRef!: ImageCropperComponent;

  verImagen(url: string) { this.imgPreview = url; }
  cerrarImagen() { this.imgPreview = ''; }

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
    const key = `img${imgNum}` as keyof Equipos;
    const src = this.carouselPreviews[imgNum] || (this.pathIm + (this.equipoSelect[key] as string));
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


  deleteEquipo(id: number) {


    Swal.fire({
      title: "Desea eliminar este equipo?",
      showDenyButton: true,
      confirmButtonText: "Si"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.apiRest.deleteEquipo(id)
          .subscribe((res: any) => {
            this.equipos = res.equipos;
            Swal.fire(res.msj);

          });
      }
    });


  }

  cancel() {
    this.creando = false;
    this.isEditing = false;

  }

  addEquipo() {
    this.initForm();
    this.creando = true;
  }

  cargarCategoriasEquipo() {
    this.categoriasSeleccionadas = {};
    const categoriasArray = this.EquipoForm.get('categorias') as FormArray;

    categoriasArray.value.forEach((catId: number) => {
      this.categoriasSeleccionadas[catId] = true;
    });


  }

  // Al marcar/desmarcar categorías
  toggleCategoria(id: number) {
    this.categoriasSeleccionadas[id] = !this.categoriasSeleccionadas[id];
    this.actualizarFormArray();
  }

  actualizarFormArray() {
    const categoriasArray = this.EquipoForm.get('categorias') as FormArray;
    categoriasArray.clear();

    Object.keys(this.categoriasSeleccionadas).forEach(id => {
      if (this.categoriasSeleccionadas[parseInt(id)]) {
        // Opción A: Si el backend espera solo IDs (ej: [1, 2])
        categoriasArray.push(this.fb.control(parseInt(id))); // Envía el ID directamente

        // Opción B: Si necesitas mantener el formato {id: X}
        // categoriasArray.push(this.fb.group({ id: [parseInt(id)] }));
      }
    });
  }

    getNombreCategoria(id: number | string): string {
      // 1. Verificar que el array esté cargado

      const idNumber = Number(id);
      const categoriaEncontrada = this.categoriasDisponibles.find(cat => Number(cat.id) === idNumber);

      if (!categoriaEncontrada) {
        return `Categoría ${id} no encontrada`;
      }

      return categoriaEncontrada.nombre;
    }

    categoriasEq(idClub:number){
      this.Valcategorias = true;
      this.idClub = idClub,
      this.apiRest.get_Categorias_equipo(idClub)
      .subscribe((res: any) => {
        this.categoriasEquipo = res.categoriasEq;

      });

    }

    abrirModalCredenciales(idEquipo: number, nombreEquipo: string) {
      this.usuariosEquipoModal = [];
      this.nombreEquipoModal = nombreEquipo;
      this.enviandoIdUsuario = null;
      this.cargandoCredenciales = true;

      const el = document.getElementById('modalCredencialesEquipo');
      if (el) {
        this.modalCredenciales = Modal.getInstance(el) ?? new Modal(el);
        this.modalCredenciales.show();
      }

      this.apiRest.getUsuariosEquipo(idEquipo).subscribe({
        next: (res: any) => {
          this.usuariosEquipoModal = res.usuarios || [];
          this.cargandoCredenciales = false;
        },
        error: () => {
          this.cargandoCredenciales = false;
          Swal.fire('Error', 'No se pudo cargar los usuarios.', 'error');
        },
      });
    }

    enviarCredencialIndividual(idUsuario: number) {
      this.enviandoIdUsuario = idUsuario;
      this.apiRest.MailContra(idUsuario).subscribe({
        next: (res: any) => {
          this.enviandoIdUsuario = null;
          Swal.fire({ toast: true, icon: 'success', title: '¡Enviado!',
            position: 'top-end', showConfirmButton: false, timer: 2500, timerProgressBar: true });
        },
        error: () => {
          this.enviandoIdUsuario = null;
          Swal.fire('Error', 'No se pudo enviar.', 'error');
        },
      });
    }

    copiarCredencialIndividual(u: any) {
      const texto = `usuario: ${u.usuario ?? ''}\npass: ${u.password ?? ''}`;
      navigator.clipboard.writeText(texto).then(() => {
        Swal.fire({ toast: true, icon: 'success', title: 'Copiado',
          text: u.usuario, position: 'top-end', showConfirmButton: false,
          timer: 1800, timerProgressBar: true });
      });
    }


    eliminarJugadorClub(jugador:number , categoria:number , equipo:number){
         Swal.fire({
          title: "Desea eliminar este jugador de esta categoria del Club?",
          showDenyButton: true,
          confirmButtonText: "Si"
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.apiRest.eliminarJugadorClub(jugador,categoria,equipo)
              .subscribe((res: any) => {
                 this.categoriasEquipo = res.categoriasEq;
                 Swal.fire(res.msj);
              });
          }
        });
    }



abrirModalSeleccion(categoria: any) {

   console.log('categoria:'+categoria);

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


agregarJugadorSeleccionado() {
  const jugador = this.jugadoresDisponibles.find(j => j.id === this.jugadorSeleccionadoId);


   if (!this.jugadorSeleccionadoId ) {
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


          this.apiRest.agregar_jugador_categoria(this.categoriaSeleccionada.IdEq,this.categoriaSeleccionada.id,jugador.id)
          .subscribe((res:any)=>{
            if(res.success){
              this.categoriasEquipo = res.categoriasEq;
            }

            Swal.fire(res.msj);
          })

        }
      });



}



aplicarFiltros() {
  const nombre = this.filtroNombre?.toLowerCase() || '';
  const email = this.filtroEmail?.toLowerCase() || '';

  this.apiRest.get_All_EquiposFilt(nombre,email).subscribe((res: any) => {
      this.equipos = res.equipos;
      this.paginas = res.cant_paginas;

  });

}


  onSeleccionarJugador() {
    // Si necesitas cargar más datos del jugador seleccionado, hazlo aquí
    const seleccionado = this.jugadoresDisponibles.find(j => j.id === this.jugadorSeleccionadoId);
    console.log('Jugador seleccionado:', seleccionado);
  }

Inicio(){
 this.router.navigate(['/DelegaCh']);
}

 

}
