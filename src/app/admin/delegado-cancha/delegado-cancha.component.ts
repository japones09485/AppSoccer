import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Torneos } from '../../interfaces/interfaces';
import { environment } from "../../../environments/environment";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delegado-cancha',
  imports: [CommonModule],
  templateUrl: './delegado-cancha.component.html',
  styleUrl: './delegado-cancha.component.css'
})
export class DelegadoCanchaComponent implements OnInit {


  torneos: Torneos[] = [];
  pathIm = environment.apiURL;
   categoriasDisponibles: any[] = [];
  mostrarDescripcionCompleta = false;


  ngOnInit(): void {

    this.loadCategorias();

    this.apiRest.get_All_torneos_Dele()
      .subscribe((res: any) => {
        this.torneos = res.torneos;

      });

  }

  constructor(private apiRest: ApiService, private router: Router) { }


  InfoTorneo(IdTorneo: number) {
    this.router.navigate(['/InfoTorneo/' + IdTorneo]);

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



}
