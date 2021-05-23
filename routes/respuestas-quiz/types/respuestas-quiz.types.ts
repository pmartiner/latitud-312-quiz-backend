export type SetRespuestaRequest = {
  id_pregunta: number;
  respuesta: string | number | boolean | string[] | number[] | boolean[];
  distrito_usuarie: number;
  seccion: string;
  entidad: string;
}
  
export type Partidos = 'SP'
  | 'PES'
  | 'PRD'
  | 'MORENA'
  | 'PRI'
  | 'PAN'
  | 'PT'
  | 'PVEM'
  | 'MC'
  | '';

export type Partido = {
  id_pregunta: number;
  partido: Partidos;
  votacion: string;
}

export type RespuestaDP = {
  id_pregunta: number;
  votacion: string;
}

export type PartidoResponse = {
  id: string;
  name: Partidos;
  color: string;
  answers: RespuestaDP[];
}