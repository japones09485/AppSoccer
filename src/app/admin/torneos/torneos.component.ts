import { Component, OnInit, OnDestroy, ViewChild, ElementRef, DestroyRef, inject } from '@angular/core';
import { ImageCropperComponent, ImageTransform } from 'ngx-image-cropper';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ApiService } from "../../services/api.service";
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { Torneos } from '../../interfaces/interfaces';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { environment } from "../../../environments/environment";
import { PaginacionComponent } from '../paginacion/paginacion.component';
import { Modal } from 'bootstrap';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-torneos',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, PaginacionComponent, NgOptimizedImage, ImageCropperComponent],
  templateUrl: './torneos.component.html',
  styleUrl: './torneos.component.css'
})
export class TorneosComponent implements OnInit, OnDestroy {

  torneos: Torneos[] = [];
  torneoSelect !: Torneos;
  creando !: boolean;
  pathIm = environment.apiURL;
  TorneoForm!: FormGroup;
  frmGuardar = new FormData();
  isLoading: boolean = false;
  isEditing: boolean = false;
  controlEdad: boolean = false;
  editForm: boolean = false;
  idEdit = 0;
  operation = 'add';
  imgVisi : String = '';
  TorneoVisi : String = '';
  categoriasDisponibles: any[] = [];
  cantFase!:number;
  filtroNombre: string = '';
  filtroEstado: string = '';
  torneosFiltrados: any[] = [];
  paginas = 0;
  currentSlide: number = 0;
  slideInterval: any;
  @ViewChild('fileInput') fileInput!: ElementRef;

  mostrarModal: boolean = false;
  cargando: boolean = false;
  archivoSeleccionado: File | null = null;

  private readonly destroyRef = inject(DestroyRef);

  constructor(private apiRest: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadCategorias();
    this.creando = false;
    this.apiRest.get_All_torneos()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.torneos = res.torneos;
          this.paginas = res.cant_paginas;
        },
        error: () => Swal.fire('Error al cargar los torneos')
      });
  }

  sigPag(pag: number) {
    this.apiRest.get_All_torneos(pag).subscribe({
      next: (res: any) => {
        this.torneos = res.torneos;
        this.paginas = res.cant_paginas;
      },
      error: () => Swal.fire('Error al cargar la página')
    });
  }

  loadCategorias() {
    this.apiRest.get_All_categorias_activas().subscribe({
      next: (res: any) => {
        this.categoriasDisponibles = res.categoriasDisponibles.map((cat: any) => ({
          id: Number(cat.id),
          nombre: cat.nombre
        }));
      },
      error: () => Swal.fire('Error al cargar categorías')
    });
  }

  initForm() {
    this.TorneoForm = this.fb.group({
      name: ['', Validators.required],
      descripcion: ['', Validators.required],
      Finicio: ['', Validators.required],
      Ffin: ['', Validators.required],
      controlEdad: ['', [Validators.required]],
      num_fases: ['', [Validators.required]],
      fecha_limite: ['', [Validators.required]],
      numero_maximo_jug: ['', [Validators.required]],
      num_gruposF1: [''],
      num_gruposF2: [''],
      num_gruposF3: [''],
      num_gruposF4: [''],
      num_gruposF5: [''],
      num_gruposF6: [''],
      InfoJugadores: [''],
      num_gruposF7: [''],
      categoria: ['',],
      Rninas: ['',],

    });
  }


  addTorneos() {
    this.creando = true;
  }

  saveTorneo() {
    if (this.TorneoForm.invalid) {
      this.TorneoForm.markAllAsTouched();
      return;
    }

    this.frmGuardar.set('data', JSON.stringify(this.TorneoForm.value));
    this.frmGuardar.set('operacion', this.operation);
    this.frmGuardar.set('idEdit', JSON.stringify(this.idEdit));

    this.isLoading = true;
    this.apiRest.addTorneo(this.frmGuardar).subscribe({
      next: (data: any) => {
        this.isLoading = false;
        if (data.success == true) {
          this.torneos = data.torneos;
          Swal.fire(data.msj);
          this.initForm();
          this.creando = false;
          this.frmGuardar = new FormData();
        } else {
          Swal.fire(data.msj || 'Error al guardar el torneo');
        }
      },
      error: () => {
        this.isLoading = false;
        Swal.fire('Error de conexión. Intenta de nuevo.');
      }
    });
  }

  deleteTorneo(id: number) {


    Swal.fire({
      title: "Desea eliminar este torneo?",
      showDenyButton: true,
      confirmButtonText: "Si"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.apiRest.deleteTorneo(id)
          .subscribe((res: any) => {
            this.torneos = res.torneos;
            Swal.fire(res.msj);

          });
      }
    });


  }

  editTorneo(id: number) {
    this.idEdit = id;
    this.operation = 'edit';
    this.frmGuardar = new FormData();
    this.filePreviews = {};
    this.fileNames = {};
    this.currentSlide = 0;
    this.apiRest.getById_Torneo(id)
      .subscribe((res: any) => {


        this.torneoSelect = res.torneo;

        this.cantFase = this.torneoSelect.num_fases as number;
        this.controlEdad = this.torneoSelect.control_edad ?? false;

        this.TorneoForm.setValue({
          name: this.torneoSelect.nombre,
          descripcion: this.torneoSelect.descripcion,
          Finicio: this.torneoSelect.fecha_inicio,
          Ffin: this.torneoSelect.fecha_fin,
          controlEdad: this.torneoSelect.control_edad,
          categoria: Number(this.torneoSelect.categoria),
          Rninas: this.torneoSelect.Rangoninas,
          num_fases: this.torneoSelect.num_fases,
          fecha_limite: this.torneoSelect.fecha_limite,
          numero_maximo_jug: this.torneoSelect.numero_maximo_jug,
          num_gruposF1: this.torneoSelect.num_gruposF1,
          num_gruposF2: this.torneoSelect.num_gruposF2,
          num_gruposF3: this.torneoSelect.num_gruposF3,
          num_gruposF4: this.torneoSelect.num_gruposF4,
          num_gruposF5: this.torneoSelect.num_gruposF5,
          num_gruposF6: this.torneoSelect.num_gruposF6,
          num_gruposF7: this.torneoSelect.num_gruposF7,
          InfoJugadores: this.torneoSelect.info_jugadores,

        });


        this.creando = true;
        this.editForm = true;

      });
  }

  cancel() {
    this.creando = false;
    this.isEditing = false;

  }

  uploadImage(ev: any, numFile: number) {
    const inputFile = ev.target as HTMLInputElement;
    if (inputFile.files && inputFile.files.length > 0) {
      this.frmGuardar.append(`${numFile}`, inputFile.files[0]);
      const fileName = inputFile.files[0].name;
      const labelElement = document.getElementById(`labelFile${numFile}`);
      if (labelElement) labelElement.textContent = fileName;
    }
  }

  cropperVisible = false;
  cropperSlot = 0;
  cropperImageFile: File | undefined = undefined;
  cropperTransform: ImageTransform = {};
  filePreviews: { [key: number]: string } = {};
  fileNames: { [key: number]: string } = {};
  @ViewChild('imageCropperRef2') private imageCropperRef2!: ImageCropperComponent;

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
    if (!this.imageCropperRef2) return;
    const result = this.imageCropperRef2.crop('base64');
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

  onControlEdadChange(event: any): void {
    this.controlEdad = event.target.value === 'true'; // Establece controlEdad como true o false
  }

  openModal(path:String,torneo:String) {

      this.imgVisi=path;
      this.TorneoVisi = torneo;

      const modalElement = document.getElementById('exampleModal');

      // Verificar que el elemento existe
      if (modalElement) {
        const modal = new Modal(modalElement); // Solo se crea el modal si el elemento existe
        modal.show();
      } else {
        console.error('Modal element not found!');
      }
    }

  goToInfo(InfoTorneo:number) {
    this.router.navigate(['/InfoTorneo/'+InfoTorneo]); // Reemplaza con tu ruta
  }

  goToInfo1(InfoTorneo:number) {
    this.router.navigate(['/InfoT/'+InfoTorneo]); // Reemplaza con tu ruta
  }

  getNombreCategoria(idCategoria: string | undefined): string {
    const id = Number(idCategoria);
    if (!idCategoria || isNaN(id)) {
      return 'Sin categoría';
    }

    const categoria = this.categoriasDisponibles.find(cat => cat.id === id);
    return categoria ? categoria.nombre : 'Sin categoría';
  }


  CambiarEstadoT(nuevoEstado: number, tr: any) {
    tr.estado = +nuevoEstado;

     this.apiRest.CambiarEstadoT(nuevoEstado,tr.id)
          .subscribe((res: any) => {
            this.torneos = res.torneos;
            Swal.fire(res.msj);

      });
  }


filtrarTorneos() {
  const nombre = this.filtroNombre.toLowerCase().trim();
   const estado = this.filtroEstado;

  this.apiRest.get_All_torneosFilt(nombre,estado).subscribe((res: any) => {
        this.torneos = res.torneos;
        this.paginas = res.cant_paginas;
      });

  }


   ReporteJugadoresTorneo(IdTorneo: number) {

      Swal.fire({
        title: "Desea generar el reporte de  jugadores en excel?",
        showDenyButton: true,
        confirmButtonText: "Si"
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
        //descargiue el excel
        //console.log(`${this.pathIm}excel/ReporteJugadoresTorneo/${IdTorneo}`);
          const url = `${this.pathIm}excel/ReporteJugadoresTorneo/${IdTorneo}`;
            // Llamada HTTP
          window.open(url, '_blank');
        }
      });


    }

    // Llama a esta función cuando abras el formulario de edición
startAutoSlider() {
  // Limpiamos cualquier intervalo previo para no duplicar
  this.stopAutoSlider();

  // Solo iniciamos si existen las dos imágenes
  if (this.torneoSelect?.img1 && this.torneoSelect?.img2) {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 4000); // Cambia cada 4 segundos
  }
}

stopAutoSlider() {
  if (this.slideInterval) {
    clearInterval(this.slideInterval);
  }
}

nextSlide() {
  this.currentSlide = (this.currentSlide + 1) % 2;
}

prevSlide() {
  this.currentSlide = this.currentSlide === 0 ? 1 : 0;
}

ngOnDestroy() {
  this.stopAutoSlider();
}


onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // Validación extra de seguridad para la extensión
      if (file.name.toLowerCase().endsWith('.csv')) {
        this.archivoSeleccionado = file;
      } else {
        alert('Por favor, selecciona un archivo con extensión .csv');
        this.limpiarInput();
      }
    }
  }

  procesarArchivo() {
    if (!this.archivoSeleccionado) return;

    this.cargando = true;
    const formData = new FormData();
    // 'archivo' es la llave que recibirá PHP en $_FILES['archivo']
    formData.append('archivo', this.archivoSeleccionado, this.archivoSeleccionado.name);

    this.apiRest.uploadMasivoT(formData).subscribe({
      next: (res) => {
        this.torneos = res.torneos;
        Swal.fire(res.msj);
        this.cerrarModal();
        this.filtrarTorneos(); // Tu función existente para refrescar la lista
      },
      error: (err) => {

        Swal.fire('Hubo un error al procesar el archivo. Revisa el formato.');
        this.cargando = false;
      },
      complete: () => {
        this.cargando = false;
      }
    });
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.archivoSeleccionado = null;
    this.cargando = false;
    this.limpiarInput();
  }

  limpiarInput() {
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

}
