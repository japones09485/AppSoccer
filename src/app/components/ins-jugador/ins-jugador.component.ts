import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Router, RouterModule } from '@angular/router';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';
import { firstValueFrom, timeout } from 'rxjs';

@Component({
  selector: 'app-ins-jugador',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ImageCropperComponent,
  ],
  templateUrl: './ins-jugador.component.html',
  styleUrl: './ins-jugador.component.css',
})
export class InsJugadorComponent implements OnInit {
  pathIm = environment.apiURL;
  JugadorForm!: FormGroup;
  frmGuardar = new FormData();
  isLoading: boolean = false;
  EdadJugador!: number;
  operation = 'add';
  tipoDoc = 0;
  labedoc1 = 'Foto Jugador';
  labedoc2 = 'Adjunto adicional';
  labedoc3 = 'Adjunto adicional';
  labedoc4 = 'Adjunto adicional';
  labedoc5 = 'Adjunto adicional';

  // Cropper
  showCropper = false;
  imageChangedEvent: any = '';
  croppedImageBlob: any;
  currentFileNum = 0;
  canvasRotation = 0;
  imageBase64: string = '';
  imageURL: string = '';
  archivosSeleccionados: { [key: number]: string } = {};
  procesandoImagenes: boolean = false;

  constructor(
    private apiRest: ApiService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.JugadorForm = this.fb.group({
      name: ['', Validators.required],
      identificacion: ['', Validators.required],
      fch_nacimiento: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      posicion: ['', Validators.required],
      genero: ['', Validators.required],
      TipoDoc: ['', Validators.required],
      nomMadre: [''],
      telMadre: [''],
      nomPadre: [''],
      telPadre: [''],
    });
    // Limpiar FormData y los inputs de archivo residuales
    this.frmGuardar = new FormData();
    for (let i = 1; i <= 4; i++) {
      const inputElem = document.getElementById(
        `image${i}`,
      ) as HTMLInputElement;
      if (inputElem) inputElem.value = '';
      delete this.archivosSeleccionados[i];
    }
  }

  // Sustituye estas funciones en tu archivo .ts
  async confirmarEdicion() {
    if (!this.croppedImageBlob) return;

    try {
      // Usamos tu función de compresión para asegurar el tamaño máximo
      const imgBlob = await this.compressAndResizeImage(
        this.croppedImageBlob,
        1000,
        0.7,
      );

      // Creamos el archivo físico virtual
      const file = new File(
        [imgBlob],
        `jugador_file_${this.currentFileNum}.jpg`,
        { type: 'image/jpeg' },
      );

      // IMPORTANTE: Usamos .set para que si el usuario cambia la foto, se sobreescriba y no se duplique
      this.frmGuardar.set(this.currentFileNum.toString(), file);

      this.archivosSeleccionados[this.currentFileNum] =
        '✓ Imagen lista y optimizada';
      this.showCropper = false;
      this.croppedImageBlob = null;

      // Limpiar el input para que pueda volver a subir la misma foto si quiere
      const inputElem = document.getElementById(
        `image${this.currentFileNum}`,
      ) as HTMLInputElement;
      if (inputElem) inputElem.value = '';
    } catch (err) {
      Swal.fire('Error', 'No se pudo procesar la imagen', 'error');
    }
  }

  async saveJugador() {
    if (!this.JugadorForm.valid) {
      Swal.fire('Atención', 'Complete los campos obligatorios', 'warning');
      return;
    }

    // Confirmación de términos (SweetAlert)
    const result = await Swal.fire({
      title: 'Aviso importante',
        html: `
            <div style="text-align: left; font-size: 13px;">
              <strong>Veracidad de la información:</strong> Al completar este formulario, usted se compromete a proporcionar información verídica, completa y actualizada. En caso de detectar información falsa o incorrecta, nos reservamos el derecho de tomar las acciones legales correspondientes, incluyendo la presentación de la información a las autoridades competentes, como la Policía.<br><br>
              
              <strong>Tratamiento de Datos Personales:</strong> Sus datos personales serán tratados de acuerdo con las leyes vigentes de protección de datos. Serán utilizados exclusivamente para la gestión y organización del evento o proceso correspondiente, almacenados de forma segura y no compartidos con terceros sin su consentimiento, salvo requerimiento legal.<br><br>
              
              Al enviar sus datos, usted autoriza el tratamiento conforme a lo indicado.<br><br>
              ¡Gracias por su colaboración y por ayudarnos a garantizar un proceso transparente y seguro!
            </div>
          `,
      showDenyButton: true,
      confirmButtonText: 'Acepto',
      denyButtonText: 'Cancelar',
    });

    if (!result.isConfirmed) return;

    this.isLoading = true;

    // Actualizamos los datos del formulario antes de enviar
    this.frmGuardar.set('data', JSON.stringify(this.JugadorForm.value));
    this.frmGuardar.set('operacion', this.operation);
    this.frmGuardar.set('usuario', '0');
    this.frmGuardar.set('perfil', '1');
    this.frmGuardar.set('torneo', '0');
    this.frmGuardar.set('equipo', '0');

    try {
      const response = (await firstValueFrom(
        this.apiRest.add_jugador(this.frmGuardar).pipe(timeout(60000)), // 1 minuto es más que suficiente ahora
      )) as any;

      if (response.success) {
        Swal.fire('Éxito', response.msj, 'success');
        this.router.navigate(['/home']);
      } else {
        Swal.fire('Error', response.msj, 'error');
      }
    } catch (error) {
      Swal.fire('Error de conexión', 'El servidor tardó demasiado.', 'error');
    } finally {
      this.isLoading = false;
    }
  }

  onFechaNacimientoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value) this.EdadJugador = this.calcularEdad(input.value);
  }

  uploadImage(ev: any, numFile: number) {
    const inputFile = ev.target as HTMLInputElement;
    if (inputFile.files && inputFile.files.length > 0) {
      const file = inputFile.files[0];

      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        Swal.fire('Solo se permiten JPG o PNG');
        inputFile.value = '';
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        Swal.fire('La imagen no debe superar 10 MB');
        inputFile.value = '';
        return;
      }

      this.currentFileNum = numFile;
      this.imageChangedEvent = ev;
      this.imageBase64 = '';
      this.imageURL = '';
      this.canvasRotation = 0;
      this.showCropper = true;
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImageBlob = event.blob;
  }

  rotateLeft() {
    this.canvasRotation--;
  }
  rotateRight() {
    this.canvasRotation++;
  }

  cerrarCropper() {
    this.showCropper = false;
    this.croppedImageBlob = null;
    const inputElem = document.getElementById(
      `image${this.currentFileNum}`,
    ) as HTMLInputElement;
    if (inputElem) inputElem.value = '';
  }

  compressAndResizeImage(
    blob: Blob,
    maxSize: number = 800,
    quality: number = 0.8,
  ): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxSize || height > maxSize) {
          const ratio = Math.min(maxSize / width, maxSize / height);
          width = width * ratio;
          height = height * ratio;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx!.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => (blob ? resolve(blob) : reject()),
          'image/jpeg',
          quality,
        );
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(blob);
    });
  }

  calcularEdad(fechaNacimiento: string): number {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
    return edad;
  }

  updateDocumento(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = parseInt(selectElement.value, 10);
    this.tipoDoc = selectedValue;
    switch (selectedValue) {
      case 1:
        this.labedoc2 = 'Foto del Registro civil';
        this.labedoc3 = 'Adjunto adicional';
        this.labedoc4 = 'Adjunto adicional';
        break;
      case 2:
        this.labedoc2 = 'Foto Tarjeta Identidad Frontal';
        this.labedoc3 = 'Foto Tarjeta Identidad Trasera';
        this.labedoc4 = 'Foto de registro civil';
        this.labedoc5 = 'Adjunto en pdf';
        break;
      case 3:
        this.labedoc2 = 'Foto Cedula de ciudadania Frontal';
        this.labedoc3 = 'Foto Cedula de ciudadania Trasera';
        this.labedoc4 = 'Adjunto adicional';
        break;
      case 4:
        this.labedoc2 = 'Foto Cedula de extranjeria Frontal';
        this.labedoc3 = 'Foto Cedula de extranjeria Trasera';
        this.labedoc4 = 'Adjunto adicional';
        break;
      case 5:
        this.labedoc2 = 'Foto Pasaporte';
        this.labedoc3 = 'Adjunto adicional';
        this.labedoc4 = 'Adjunto adicional';
        break;
    }
  }

  // Limpiar todo al cancelar (si tienes un botón cancelar)
  cancelarRegistro() {
    this.initForm();
    this.showCropper = false;
    this.isLoading = false;
  }
}
