import { Component, OnInit, DestroyRef, inject, ViewChild } from '@angular/core';
import { ImageCropperComponent, ImageTransform } from 'ngx-image-cropper';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import Swal from 'sweetalert2';
import { ApiService } from "../../services/api.service"
import { environment } from "../../../environments/environment";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Juez } from '../../interfaces/interfaces';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-jueces',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ImageCropperComponent],
  templateUrl: './jueces.component.html',
  styleUrl: './jueces.component.css'
})
export class JuecesComponent implements OnInit {
  jueces: Juez[] = [];
  juecesAll: Juez[] = [];
  juez!: Juez;
  creando = false;
  pathIm = environment.apiURL;
  JuezForm!: FormGroup;
  frmGuardar = new FormData();
  isLoading: boolean = false;
  isEditing: boolean = false;
  editForm: boolean = false;
  idEdit = 0;
  operation = 'add';
  juezSeleccionado!: Juez;
  filtroNombre = '';
  filtroIdentificacion = '';

  private readonly destroyRef = inject(DestroyRef);

  constructor(private apiRest: ApiService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.apiRest.get_All_jueces()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.jueces = res.jueces;
          this.juecesAll = res.jueces;
        },
        error: () => Swal.fire('Error al cargar los jueces')
      });
  }

  initForm() {
    this.JuezForm = this.fb.group({
      nombre:         ['', Validators.required],
      identificacion: ['', Validators.required],
      email:          ['', [Validators.required, Validators.email]],
      estado:         ['', Validators.required],
    });
  }

  addJuez() { this.creando = true; }

  editJuez(IdJuez: number) {
    this.idEdit = IdJuez;
    this.operation = 'edit';
    this.apiRest.editJuez(IdJuez).subscribe({
      next: (res: any) => {
        this.juezSeleccionado = res.juez;
        this.JuezForm.patchValue({
          nombre:         this.juezSeleccionado.nombre,
          identificacion: this.juezSeleccionado.identificacion,
          email:          this.juezSeleccionado.email,
          estado:         this.juezSeleccionado.estado
        });
        this.creando = true;
        this.editForm = true;
      },
      error: () => Swal.fire('Error al cargar el juez')
    });
  }

  deleteJuez(IdJuez: number) {
    Swal.fire({
      title: '¿Desea eliminar este juez?',
      showDenyButton: true,
      confirmButtonText: 'Sí'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiRest.deleteJuez(IdJuez).subscribe({
          next: (res: any) => {
            this.jueces = res.jueces;
            this.juecesAll = res.jueces;
            Swal.fire(res.msj);
          },
          error: () => Swal.fire('Error al eliminar el juez')
        });
      }
    });
  }

  saveJuez() {
    if (this.JuezForm.invalid) {
      this.JuezForm.markAllAsTouched();
      return;
    }
    this.frmGuardar.append('data',      JSON.stringify(this.JuezForm.value));
    this.frmGuardar.append('operacion', this.operation);
    this.frmGuardar.append('idEdit',    JSON.stringify(this.idEdit));

    this.isLoading = true;
    this.apiRest.saveJuez(this.frmGuardar).subscribe({
      next: (data: any) => {
        this.isLoading = false;
        if (data.success) {
          this.jueces = data.jueces;
          this.juecesAll = data.jueces;
          Swal.fire(data.msj);
          this.initForm();
          this.creando = false;
          this.frmGuardar = new FormData();
        } else {
          Swal.fire(data.msj || 'Error al guardar el juez');
        }
      },
      error: () => {
        this.isLoading = false;
        Swal.fire('Error de conexión. Intenta de nuevo.');
      }
    });
  }

  cancel() {
    this.creando = false;
    this.isEditing = false;
    this.editForm = false;
    this.operation = 'add';
    this.idEdit = 0;
    this.frmGuardar = new FormData();
    this.initForm();
  }

  aplicarFiltros() {
    this.jueces = this.juecesAll.filter(j => {
      const nombre = (j.nombre || '').toLowerCase().includes(this.filtroNombre.toLowerCase());
      const id = (j.identificacion || '').toLowerCase().includes(this.filtroIdentificacion.toLowerCase());
      return nombre && id;
    });
  }

  uploadImage(ev: any, numFile: number) {
    const inputFile = ev.target as HTMLInputElement;
    if (inputFile.files && inputFile.files.length > 0) {
      this.frmGuardar.append(`${numFile}`, inputFile.files[0]);
      const labelElement = document.getElementById(`labelFile${numFile}`);
      if (labelElement) labelElement.textContent = inputFile.files[0].name;
    }
  }

  cropperVisible = false;
  cropperSlot = 0;
  cropperImageFile: File | undefined = undefined;
  cropperTransform: ImageTransform = {};
  filePreviews: { [key: number]: string } = {};
  fileNames: { [key: number]: string } = {};
  @ViewChild('imageCropperRef') private imageCropperRef!: ImageCropperComponent;

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
}
