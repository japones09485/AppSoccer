import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InsJugadorComponent } from './components/ins-jugador/ins-jugador.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminTempComponent } from './admin/admin-temp/admin-temp.component';
import { InfoTorneoComponent } from './admin/torneos/info-torneo/info-torneo.component';
import { DelegadoCanchaComponent } from './admin/delegado-cancha/delegado-cancha.component';
import { AdminEquipoComponent } from './admin/admin-equipo/admin-equipo.component';
import { InsClubComponent } from './components/ins-club/ins-club.component';
import { JugadoresComponent } from './admin/jugadores/jugadores.component';
import { EquiposComponent } from './admin/equipos/equipos.component';
import { TorneosFrontComponent } from './components/torneos-front/torneos-front.component';



export const routes: Routes = [
  
   { path: 'home', component: HomeComponent },
   { path: 'TorneosF', component: TorneosFrontComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'inscripcion', component: InsJugadorComponent },
   { path: 'inscripcionCl', component: InsClubComponent },
  
  { path: 'adminTemp', component: AdminTempComponent },
  { path: 'InfoTorneo/:idTorneo', component: InfoTorneoComponent },
  { path: 'Jugadores', component: JugadoresComponent },
  { path: 'jugadores/:idTorneo/:idEquipo', component: JugadoresComponent },

  { path: 'Equipos', component: EquiposComponent },
  //delegado de cancha

   { path: 'DelegaCh', component: DelegadoCanchaComponent },


   //Administrador Club

    { path: 'AdminEq', component: AdminEquipoComponent },
    

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
