// POST /get-diputade
export type GetDiputadeRequest = {
  entidad: string;
  seccion: string;
}

export type GetDiputadeResponse = {
  bancada_original: string;
  nombre_diputade: string;
  entidad: string;
  num_entidad: number;
  num_distrito: number;
  distrito: string;
  tipo: string;
  id_legislativo: number;
  bancada_actual: string;
  reeleccion: boolean;
  reeleccion_suplente: boolean;
  licencia: boolean;
  licencia_deceso: boolean;
  nombre_suplente: string;
  foto: string;
}