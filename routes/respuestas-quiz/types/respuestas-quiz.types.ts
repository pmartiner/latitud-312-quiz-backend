export type SetPreguntaRequest = {
  id_pregunta: number;
  respuesta: string | number | boolean | string[] | number[] | boolean[];
  distrito_usuarie: number;
}

export type SetPreguntaResponse = {
  data: number;
}