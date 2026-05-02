import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersComponent } from "../users/users.component";
import { TorneosComponent } from "../torneos/torneos.component";
import { EquiposComponent } from "../equipos/equipos.component";
import { JugadoresComponent } from "../jugadores/jugadores.component";
import { CategoriasComponent } from "../categorias/categorias.component";
import { CanchasComponent } from "../canchas/canchas.component";
import { JuecesComponent } from "../jueces/jueces.component";
import { environment } from "../../../environments/environment";

import { } from "../jugadores/jugadores.component";

@Component({
  selector: 'app-admin-temp',
  templateUrl: './admin-temp.component.html',
  imports: [
    CommonModule,
    TorneosComponent,
    UsersComponent,
    EquiposComponent,
    JugadoresComponent,
    CategoriasComponent,
    CanchasComponent,
    JuecesComponent
  ],
  styleUrls: ['./admin-temp.component.css']
})
export class AdminTempComponent implements OnInit {
  estados: { [key: string]: boolean } = {
    panelV: true,
    userV: false,
    torneosV: false,
    equiposV: false,
    jugadoresV: false,
    categoriasV: false,
    canchasV: false,
    juecesV: false
  };
  menuOpen: boolean = false;

  pathIm = environment.apiURL;

  constructor(private apiRest: ApiService, private router: Router) { }

  ngOnInit(): void { }

  activarComp(campoValid: string): void {
    // Cambiar la propiedad del objeto a true según el nombre recibido
    if (this.estados.hasOwnProperty(campoValid)) {
      // Primero, pon todos los valores a false
      for (let key in this.estados) {
        if (this.estados.hasOwnProperty(key)) {
          this.estados[key] = false;
        }
      }

      // Luego, activa el campo específico
      this.estados[campoValid] = true;

    }
  }

  cerrarSesion() {
    this.apiRest.logOut();
    this.router.navigate(['/home']);
  }

abrirYDescargarPdf(): void {
  const url = this.pathIm + 'doc/PADRES_DOC.pdf';

  // Abrir nueva pestaña
  const nuevaPestana = window.open('', '_blank');

  if (nuevaPestana) {
    // Insertar un pequeño HTML que fuerza la descarga
    nuevaPestana.document.write(`
      <html>
        <body>
          <a href="${url}" download="PADRES_DOC.pdf" id="descarga"></a>
          <script>
            document.getElementById('descarga').click();
          </script>
          <p>Si no inicia la descarga, <a href="${url}" download="PADRES_DOC.pdf">haz clic aquí</a>.</p>
        </body>
      </html>
    `);
  }
}


}
