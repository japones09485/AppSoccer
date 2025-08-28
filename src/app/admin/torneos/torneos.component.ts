import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ApiService } from "../../services/api.service";
import { CommonModule } from '@angular/common';
import { Torneos } from '../../interfaces/interfaces';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { environment } from "../../../environments/environment";
import { Modal } from 'bootstrap';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-torneos',
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './torneos.component.html',
  styleUrl: './torneos.component.css'
})
export class TorneosComponent implements OnInit {

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

  constructor(private apiRest: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.initForm();
    this.loadCategorias();
    this.creando = false;
    this.apiRest.get_All_torneos()
      .subscribe((res: any) => {
        this.torneos = res.torneos;
        this.torneos = this.torneos.map(t => ({ ...t, expanded: false }));

      });
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
      num_gruposF7: [''],
      categoria: ['',],
      Rninas: ['',]
      
    });
  }


  addTorneos() {
    this.creando = true;
  }

    saveTorneo() {

      this.frmGuardar.append('data', JSON.stringify(this.TorneoForm.value));
      this.frmGuardar.append('operacion', this.operation);
      this.frmGuardar.append('idEdit', JSON.stringify(this.idEdit));


      this.isLoading = true;
      this.apiRest.addTorneo(this.frmGuardar)
        .subscribe((data: any) => {
          if (data.success == true) {
            this.torneos = data.torneos;
            Swal.fire(data.msj);
            this.isLoading = false;
            this.initForm();
            this.creando = false;

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
    console.log('Nuevo estado:', nuevoEstado, 'para:', tr);
    // Aquí puedes agregar llamada al backend si lo necesitas
  }




}
