import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Torneos } from '../../interfaces/interfaces';
import { environment } from "../../../environments/environment";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delegado-cancha',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgSelectModule],
  templateUrl: './delegado-cancha.component.html',
  styleUrl: './delegado-cancha.component.css'
})
export class DelegadoCanchaComponent implements OnInit {


  torneos: Torneos[] = [];
  pathIm = environment.apiURL;
   categoriasDisponibles: any[] = [];
  mostrarDescripcionCompleta = false;
  fechaInicio= '';
  fechaFin= '';
  filtroEstado: string = '';
  torneosFiltrados: any;

  ngOnInit(): void {

    this.loadCategorias();

    this.apiRest.get_All_torneos_Dele()
      .subscribe((res: any) => {
        this.torneos = res.torneos;
        this.torneosFiltrados = this.torneos;

      });

  }

  constructor(private apiRest: ApiService, private router: Router) { }


  InfoTorneo(IdTorneo: number) {
    this.router.navigate(['/InfoT/' + IdTorneo]);

  }

  loadCategorias() {
    this.apiRest.get_All_categorias_activas().subscribe((res: any) => {

      this.categoriasDisponibles = res.categoriasDisponibles.map((cat: any) => ({
        id: Number(cat.id),   // aquí convierto id a número
        nombre: cat.nombre
      }));


    });

  }

  getNombreCategoria(idCategoria: string | undefined): string {
    const id = Number(idCategoria);
    if (!idCategoria || isNaN(id)) {
      return 'Sin categoría';
    }

    const categoria = this.categoriasDisponibles.find(cat => cat.id === id);
    return categoria ? categoria.nombre : 'Sin categoría';
  }



  cerrarSesion() {
    this.apiRest.logOut();
    this.router.navigate(['/home']);
  }

  Jugadores() {
    this.router.navigate(['/Jugadores']);
  }

  Equipos() {
    this.router.navigate(['/Equipos']);
  }


tomarFechas() {

     this.apiRest.GetTorneoFechas(this.fechaInicio,this.fechaFin).subscribe((res: any) => {

      if(res.success){
        this.torneos = res.torneos;
      }

    });


    // Aquí puedes hacer el filtro o lo que necesites
  }

  filtrarEstado(estado: number | string) {
    console.log('Estado seleccionado:', estado);

    // Si no se selecciona ningún estado, mostrar todos
    if (estado === '' || estado === null || estado === undefined) {
      this.torneosFiltrados = this.torneos; // mostrar todos
    } else {
      // Filtrar por estado
      this.torneosFiltrados = this.torneos.filter((torneo: any) => torneo.estado === estado.toString());
    }

  }


}
