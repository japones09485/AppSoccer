import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from "../../services/api.service";
import { CommonModule } from '@angular/common';
import { Jugadores, User } from '../../interfaces/interfaces';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { environment } from "../../../environments/environment";
import { Modal } from 'bootstrap';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-ins-jugador',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './ins-jugador.component.html',
  styleUrl: './ins-jugador.component.css'
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


  constructor(private apiRest: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) { }

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
      telPadre: ['']

    });
  }

  saveJugador() {



    this.frmGuardar.append('data', JSON.stringify(this.JugadorForm.value));
    this.frmGuardar.append('operacion', this.operation);
    this.frmGuardar.append('usuario', '0');

    this.isLoading = true;

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
        this.apiRest.add_jugador(this.frmGuardar)
          .subscribe((data: any) => {

            Swal.fire(data.msj);
            if (data.success == true) {
              this.tipoDoc = 0;
              this.JugadorForm.reset();
              this.router.navigate(['/home']);
            }

            this.isLoading = false;

          });
      }
    });

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

}
