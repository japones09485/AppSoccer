import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InsJugadorComponent } from './components/ins-jugador/ins-jugador.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminTempComponent } from './admin/admin-temp/admin-temp.component';
import { InfoTorneoComponent } from './admin/torneos/info-torneo/info-torneo.component';
import { InfoTComponent } from './admin/torneos/info-t/info-t.component';
import { DelegadoCanchaComponent } from './admin/delegado-cancha/delegado-cancha.component';
import { AdminEquipoComponent } from './admin/admin-equipo/admin-equipo.component';
import { InsClubComponent } from './components/ins-club/ins-club.component';
import { JugadoresComponent } from './admin/jugadores/jugadores.component';
import { EquiposComponent } from './admin/equipos/equipos.component';
import { TorneosFrontComponent } from './components/torneos-front/torneos-front.component';
import { EscanerComponent } from './components/escaner/escaner.component';
import { GuardAutGuard } from './services/guard-aut.guard';
import { FormBuilderPageComponent } from './admin/torneos/form-builder-page/form-builder-page.component';
import { FormularioPublicoComponent } from './components/formulario-publico/formulario-publico.component';
import { FormularioOkComponent } from './components/formulario-ok/formulario-ok.component';

const auth = [GuardAutGuard];

export const routes: Routes = [
  // Rutas públicas
  { path: 'home',          component: HomeComponent },
  { path: 'f/:idFormulario', component: FormularioPublicoComponent },
  { path: 'formulario-ok',   component: FormularioOkComponent },
  { path: 'TorneosF',     component: TorneosFrontComponent },
  { path: 'admin',         component: AdminComponent },
  { path: 'inscripcion',   component: InsJugadorComponent },
  { path: 'inscripcionCl', component: InsClubComponent },
  { path: 'DelegaCh',      component: DelegadoCanchaComponent },

  // Rutas protegidas
  { path: 'adminTemp',                        component: AdminTempComponent,        canActivate: auth },
  { path: 'InfoTorneo/:idTorneo',             component: InfoTorneoComponent },
  { path: 'InfoT/:idTorneo',                  component: InfoTComponent,            canActivate: auth },
  { path: 'Jugadores',                        component: JugadoresComponent,        canActivate: auth },
  { path: 'jugadores/:idTorneo/:idEquipo',    component: JugadoresComponent,        canActivate: auth },
  { path: 'interfcam',                        component: EscanerComponent,          canActivate: auth },
  { path: 'Equipos',                          component: EquiposComponent,          canActivate: auth },
  { path: 'AdminEq',                          component: AdminEquipoComponent,      canActivate: auth },
  { path: 'Formulario/:idFormulario',          component: FormBuilderPageComponent,  canActivate: auth },

  { path: '',   redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
