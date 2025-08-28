import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from "../../services/api.service";
import { CommonModule } from '@angular/common';
import { Equipos, User, Categoria } from '../../interfaces/interfaces';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { environment } from "../../../environments/environment";
import { Modal } from 'bootstrap';
import { Router } from '@angular/router';



@Component({
  selector: 'app-equipos',
  imports: [CommonModule, ReactiveFormsModule, FormsModule,NgSelectModule],
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
  
  
  


  constructor(
    public apiRest: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loadCategorias();
    this.UserLog = this.apiRest.getUser();
    this.initForm();
    this.creando = false;
    this.loadEquipos();
    
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
        this.equiposFiltrados = [...this.equipos];
        
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
    this.EquipoForm = this.fb.group({
      name: ['', Validators.required],
      estado: ['', Validators.required],
      tel1: ['', Validators.required],
      tel2: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
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

      // Tercero: Asigna el resto de campos
      this.EquipoForm.patchValue({
        name: this.equipoSelect.nombre,
        estado: this.equipoSelect.estado,
        mail: this.equipoSelect.email,
        tel1: this.equipoSelect.telefono1,
        tel2: this.equipoSelect.telefono2,
      });

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

    const modalElement = document.getElementById('exampleModal');

    // Verificar que el elemento existe
    if (modalElement) {
      const modal = new Modal(modalElement); // Solo se crea el modal si el elemento existe
      modal.show();
    } else {
      console.error('Modal element not found!');
    }
  }
  closeModal() {
    this.isModalOpen = false;
    this.modalImage = '';
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

  this.equiposFiltrados = this.equipos.filter(eq => {
    const coincideNombre = !nombre || eq.nombre?.toLowerCase().includes(nombre);
    const coincideEmail = !email || eq.email?.toLowerCase().includes(email);

    return coincideNombre && coincideEmail;
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