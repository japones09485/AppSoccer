export interface Torneos {
  id: number;
  nombre: string;
  descripcion: string;
  control_edad?: boolean;
  categoria?: string;
  Rangoninas:number;
  fecha_creacion: string;
  img1: string;
  img2: string;
  estado?: number;
  fecha_inicio?: string;
  fecha_fin?: string;
  num_fases?: number;
  fecha_limite: string;
  numero_maximo_jug:number;
  num_gruposF1?: number;
  num_gruposF2?: number;
  num_gruposF3?: number;
  num_gruposF4?: number;
  num_gruposF5?: number;
  num_gruposF6?: number;
  num_gruposF7?: number;
  ValidF?: string;
  ValidF1?: number;  // Cambié a number para coincidir con tu uso
  ValidF2?: number;
  ValidF3?: number;
  ValidF4?: number;
  ValidF5?: number;
  ValidF6?: number;
  ValidF7?: number;
  expanded?: boolean;
 
}

export interface Equipos {
  id: number;
  nombre: string;
  email: string;
  img1?: string;
  img2?: string;
  img3?: string;
  img4?: string;
  estado ?: number;
  fecha_creacion?: string;
  creado_por?: string;
  categorias :any,
  telefono1: number;
  telefono2: number;
 
}


export interface User {
  id?: number;
  usuario?: string;
  nombre?: string;
  estado: number;
  perfil: number;
  password?: string;
  fk_equipo?: number;
  fk_categoria?: number;
  
  
}

export interface Jugadores {
  id?: number;
  nombre: string;
  email: string;
  identificacion: string;
  fecha_nacimiento: string;
  edad:number;
  posicion?: number;
  estado: number;
  genero:string;
  fecha_creacion?: string;
  img1?: string;
  img2?: string;
  img3?: string;
  img4?: string;
  tipoDoc?: number;
  nombre_madre?: string;
  nombre_padre?: string;
  telefono_madre?: string;
  telefono_padre?: string;
}


export interface Grupos {
  id: number;
  fk_torneo: number;
  num_grupo: string;
  nameFase: string;
  nombre: string;
  detalle ?: any;
  fase:number;
}

export interface nameFases {
  id: number;
  fk_torneo: number;
  nombre: string;
  fase:number;
}

export interface Categorias {
  
  id: number;
  nombre: string;
  edad_min: number;
  control_edad: string;
  estado: number;
 
}

export interface Calendario {
  id: number;
  fk_torneo: string;
  fk_grupo: string;
  fk_nombre_grupo: string;
  fk_equipo1: string;
  name_eq_1: string;
  fk_equipo2: string;
  name_eq_2: string;
  foto_eq1: string;
  foto_eq2: string;
  fecha: string | null;
  hora: string | null;
  cancha:  string | null;
  fk_categoria_eq_1:number,
  fk_categoria_eq_2:number,
  estado:number,
  resultado:any
}

export interface  Canchas{
  id: number;
  nombre: string;
  descripcion: string;
  estado: number;
}

export const Categoria: string[] = [
  'Sub-11',
  'Sub-12', 
  'Sub-13',
  'Sub-14',
  'Sub-15',
  'Sub-16',
  'Sub-17',
  'Sub-18',
  'Sub-19',
  'Sub-20'
];


interface EventoJugador {
  id: string;
  fk_torneo: string;
  fk_grupo: string;
  fk_partido: string;
  fk_jugador: string;
  fk_equipo: string;
}

export interface Juez {
  id: number;
  nombre: string;
  identificacion: string;
  email: string;
  img1 ?: string;
  estado ?:number;
}





