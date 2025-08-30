import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlAPI = environment.apiURL;
  public user !: User;

  constructor(private http: HttpClient) { }

  getUser(): User {
    if (!this.user) {
      const userData = sessionStorage.getItem('user');
      if (userData) {
        this.user = JSON.parse(userData);
      }
    }
    return this.user;
  }

  logOut() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');

  }


  getUsuario(): any {
    const userStr = sessionStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        console.error('Error al parsear el usuario desde sessionStorage', e);
        return null;
      }
    }
    return null;
  }


  calcularEdad(fechaNacimiento: string | Date): number {
    const fechaNac = new Date(fechaNacimiento);
    const hoy = new Date();

    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }

    return edad;
  }



  logInFront(payload: any) {
    return this.http.post(`${this.urlAPI}auth/jwt_login/2`, payload);
  }


  //Torneos
  get_All_torneos() {
    return this.http.get(this.urlAPI + `Rest_api/get_All_torneos`);
  }

  get_All_torneos_Dele() {
    return this.http.get(this.urlAPI + `Rest_api/get_All_torneos_Dele`);
  }

  //creacion categoria
  addTorneo(payload: any) {
    return this.http.post(this.urlAPI + `Rest_api/add_torneo`, payload);
  }

  deleteTorneo(idTorneo: number) {
    return this.http.post(this.urlAPI + `Rest_api/deleteTorneo`, { idTorneo });
  }

  getById_Torneo(idTorneo: number) {
    return this.http.post(this.urlAPI + `Rest_api/getById_Torneo`, { idTorneo });
  }



  //equipos

  get_All_equipos() {
    return this.http.get(this.urlAPI + `Rest_api/get_All_equipos`);
  }

  add_equipo(payload: any) {
    return this.http.post(this.urlAPI + `Rest_api/add_equipo`, payload);
  }

  deleteEquipo(idEquipo: number) {
    return this.http.post(this.urlAPI + `Rest_api/deleteEquipo`, { idEquipo });
  }


  editEquipo(idEquipo: number) {
    return this.http.post(this.urlAPI + `Rest_api/editEquipo`, { idEquipo });
  }




  Equipo_User(idUsuario: any) {
    return this.http.post(this.urlAPI + `Rest_api/Equipo_User`, { idUsuario });
  }

  //usuarios

  get_All_users() {
    return this.http.get(this.urlAPI + `Rest_api/get_All_users`);
  }

  add_user(payload: any) {
    return this.http.post(this.urlAPI + `Rest_api/add_user`, payload);
  }

  editUser(idUser: number) {
    return this.http.post(this.urlAPI + `Rest_api/editUser`, { idUser });
  }

  deleteUser(idUser: number) {
    return this.http.post(this.urlAPI + `Rest_api/deleteUser`, { idUser });
  }

  get_user_perfil(perfil: number) {
    return this.http.post(this.urlAPI + `Rest_api/get_user_perfil`, { perfil });
  }

  //jugadores

  get_All_jugadores() {
    return this.http.get(this.urlAPI + `Rest_api/get_All_jugadores`);
  }

  get_All_jugadoresAct() {
    return this.http.get(this.urlAPI + `Rest_api/get_All_jugadoresAct`);
  }

  get_All_jugadoresClub(IdEquipo: any, Idcategoria: number) {
    return this.http.post(this.urlAPI + `Rest_api/AddEquipoGr`, { IdEquipo, Idcategoria });

  }

  add_jugador(payload: any) {
    return this.http.post(this.urlAPI + `Rest_api/add_jugador`, payload);
  }

  editJugador(idJugador: number) {
    return this.http.post(this.urlAPI + `Rest_api/editJugador`, { idJugador });
  }

  jugadoresClub(idClub: number) {
    return this.http.post(this.urlAPI + `Rest_api/jugadoresClub`, { idClub });
  }

  deleteJugador(idJugador: number) {
    return this.http.post(this.urlAPI + `Rest_api/deleteJugador`, { idJugador });
  }

  getById_Grupos(idTorneo: number) {
    return this.http.post(this.urlAPI + `Rest_api/getById_Grupos`, { idTorneo });
  }

  AddEquipoGr(IdTorneo: number, IdGrupo: number, IdEquipo: number) {

    return this.http.post(this.urlAPI + `Rest_api/AddEquipoGr`, { IdTorneo, IdGrupo, IdEquipo });

  }

  deleteEqGr(idGrupo: number, idEquipo: number, idTorneo: number) {

    return this.http.post(this.urlAPI + `Rest_api/deleteEqGr`, { idGrupo, idEquipo, idTorneo });

  }

  get_Calendary(IdTorneo: number) {
    return this.http.post(this.urlAPI + `Rest_api/get_Calendary`, { IdTorneo });
  }

  calendarioPartidos(IdTorneo: number, tipoCalendary: string) {
    return this.http.post(this.urlAPI + `Rest_api/calendarioPartidos`, { IdTorneo, tipoCalendary });

  }

  UpdateClanedary(IdTorneo: number, idCalendary: number, Fecha: string, Hora: string, Cancha: string, Juez: number) {
    return this.http.post(this.urlAPI + `Rest_api/UpdateClanedary`, { IdTorneo, idCalendary, Fecha, Hora, Cancha, Juez });
  }

  get_All_canchas() {
    return this.http.get(this.urlAPI + `Rest_api/All_canchas`);
  }

  add_cancha(payload: any) {
    return this.http.post(this.urlAPI + `Rest_api/add_cancha`, payload);
  }

  editCancha(id: number) {
    return this.http.post(this.urlAPI + `Rest_api/editCancha`, { id });

  }


  deleteCancha(id: number) {
    return this.http.post(this.urlAPI + `Rest_api/deleteCancha`, { id });
  }


  get_All_categorias() {
    return this.http.get(this.urlAPI + `Rest_api/All_categorias`);
  }

  get_All_categorias_activas() {
    return this.http.get(this.urlAPI + `Rest_api/All_categorias_activas`);
  }


  add_categoria(payload: any) {
    return this.http.post(this.urlAPI + `Rest_api/add_categoria`, payload);
  }

  editCategoria(id: number) {
    return this.http.post(this.urlAPI + `Rest_api/editCategoria`, { id });

  }

  get_Categorias_equipo(IdEquipo: number) {
    return this.http.post(this.urlAPI + `Rest_api/get_Categorias_equipo`, { IdEquipo });

  }

  eliminarJugadorClub(jugador: number, categoria: number, equipo: number) {
    return this.http.post(this.urlAPI + `Rest_api/eliminarJugadorClub`, { jugador, categoria, equipo });
  }

  get_jugadores_categorias(categoria: any) {
    return this.http.post(this.urlAPI + `Rest_api/get_jugadores_categorias`, { categoria });
  }

  agregar_jugador_categoria(IdEquipo: number, Idcategoria: number, Idjugador: number) {
    return this.http.post(this.urlAPI + `Rest_api/agregar_jugador_categoria`, { IdEquipo, Idcategoria, Idjugador });
  }

  agregar_jugador_categoria_Club(IdTorneo: number, IdEquipo: any, Idcategoria: number, Idjugador: number) {
    return this.http.post(this.urlAPI + `Rest_api/agregar_jugador_categoria_Club`, { IdTorneo, IdEquipo, Idcategoria, Idjugador });
  }

  guardarResultadoP(payload: any) {
    return this.http.post(this.urlAPI + `Rest_api/guardarResultadoP`, payload);
  }

  jugadoresEquipo(IdEquipo: any, Idcategoria: number) {
    return this.http.post(this.urlAPI + `Rest_api/jugadoresEquipo`, { IdEquipo, Idcategoria });
  }

  ValidarResultado(idpartido: number, idTorneo: string, fase: number) {
    return this.http.post(this.urlAPI + `Rest_api/ValidarResultado`, { idpartido, idTorneo, fase });
  }

  ReversarResultado(idpartido: number, idTorneo: string) {
    return this.http.post(this.urlAPI + `Rest_api/ReversarResultado`, { idpartido, idTorneo });
  }

  get_All_jueces() {
    return this.http.get(this.urlAPI + `Rest_api/get_All_jueces`);
  }

  saveJuez(payload: any) {
    return this.http.post(this.urlAPI + `Rest_api/saveJuez`, payload);
  }


  editJuez(idJuez: number) {
    return this.http.post(this.urlAPI + `Rest_api/editJuez`, { idJuez });
  }

  deleteJuez(idJuez: number) {
    return this.http.post(this.urlAPI + `Rest_api/deleteJuez`, { idJuez });
  }

  get_Jueces_activos() {
    return this.http.get(this.urlAPI + `Rest_api/get_All_jueces`);
  }

  validarFase(IdTorneo: number, numFase: number) {
    return this.http.post(this.urlAPI + `Rest_api/validarFase`, { IdTorneo, numFase });
  }

  guardarPrePartido(payload: any) {
    return this.http.post(this.urlAPI + `Rest_api/guardarPrePartido`, payload);
  }

  getPrePartido(IdTorneo: number) {
    return this.http.post(this.urlAPI + `Rest_api/getPrePartido`, { IdTorneo });
  }

  deletecalenPr(id: number, IdTorneo: number) {
    return this.http.post(this.urlAPI + `Rest_api/deletecalenPr`, { id, IdTorneo });
  }

  CerrarFase(IdTorneo: number, fase: number) {
    return this.http.post(this.urlAPI + `Rest_api/CerrarFase`, { IdTorneo, fase });
  }

  get_NameFases(IdTorneo: number) {
    return this.http.post(this.urlAPI + `Rest_api/get_NameFases`, { IdTorneo });
  }

  guardarNFase(IdTorneo: number, fase: number, nombre: string) {
    return this.http.post(this.urlAPI + `Rest_api/guardarNFase`, { IdTorneo, fase, nombre });
  }

  guardarNGrupo(IdGrupo: number,  nombre: string) {
    return this.http.post(this.urlAPI + `Rest_api/guardarNGrupo`, { IdGrupo, nombre });
  }


  guardarProgramacion(IdTorneo: number, idPartido: number, fecha: string, hora: string, juez: number, cancha: number, delegado: number) {
    return this.http.post(this.urlAPI + `Rest_api/guardarProgramacion`, { IdTorneo, idPartido, fecha, hora, juez, cancha, delegado });
  }

  guardarProgramacionPre(IdTorneo: number, idPartido: number, fecha: string, hora: string, juez: number, cancha: number, delegado: number) {
    return this.http.post(this.urlAPI + `Rest_api/guardarProgramacionPre`, { IdTorneo, idPartido, fecha, hora, juez, cancha, delegado });
  }

  GoleadorTorneo(idTorneo: number) {

    return this.http.post(this.urlAPI + `Rest_api/GoleadorTorneo`, { idTorneo });

  }


  AnularPartido(IdPartido: number, IdTorneo: number, estado: number) {

    return this.http.post(this.urlAPI + `Rest_api/AnularPartido`, { IdPartido, IdTorneo, estado });

  }

  CambiarEstadoT(nuevoEstado: number, IdTorneo: number) {
    return this.http.post(this.urlAPI + `Rest_api/CambiarEstadoT`, { nuevoEstado, IdTorneo });
  }

  TorneosEquipo(IdEquipo: number) {
    return this.http.post(this.urlAPI + `Rest_api/TorneosEquipo`, { IdEquipo });
  }

  jugadoresEquipoTorneo(IdTorneo: any, Idequipo: any) {
    return this.http.post(this.urlAPI + `Rest_api/jugadoresEquipoTorneo`, { Idequipo, IdTorneo });
  }

  jugadoresTorneoPartido(IdTorneo: number, IdPartido: number, IdEquipo: any) {
    return this.http.post(this.urlAPI + `Rest_api/jugadoresTorneoPartido`, { IdEquipo, IdPartido, IdTorneo });
  }



  eliminarJugadorTorneo(jugador: number, torneo: number, equipo: number) {
    return this.http.post(this.urlAPI + `Rest_api/eliminarJugadorTorneo`, { jugador, torneo, equipo });
  }

  MailContra(IdUsuario: number) {
    return this.http.post(this.urlAPI + `Rest_api/MailContra`, { IdUsuario });
  }

  guardarInscripcionJug(IdTorneo: number, IdPartido: number, IdEquipo: any, data: any) {
    return this.http.post(this.urlAPI + `Rest_api/guardarInscripcionJug`, { IdTorneo, IdPartido, IdEquipo, data });
  }

  jugadoresPartidoRol(IdTorneo: number, IdPartido: number) {
    return this.http.post(this.urlAPI + `Rest_api/jugadoresPartidoRol`, {  IdPartido, IdTorneo });
  }

  CarnetsEquipo(IdTorneo: number, IdEquipo: any) {
    return this.http.post(this.urlAPI + `Rest_api/CarnetsEquipo`, {  IdTorneo,IdEquipo });
  }

  EquiposTorneo(IdTorneo: number){
      return this.http.post(this.urlAPI + `Rest_api/EquiposTorneo`, {  IdTorneo });
  }


  guardarNPartido(Grupo:any,Equipo1:number,Equipo2:number){

     return this.http.post(this.urlAPI + `Rest_api/guardarNPartido`, {  Grupo,Equipo1,Equipo2 });

  }

  AddAllJugadores(IdTorneo:number,IdEquipo:any){
      return this.http.post(this.urlAPI + `Rest_api/AddAllJugadores`, {  IdTorneo,IdEquipo });
  }

  InscribirJugadoresPartido(partido:any){
      return this.http.post(this.urlAPI + `Rest_api/InscribirJugadoresPartido`, {  partido });
  }

}
