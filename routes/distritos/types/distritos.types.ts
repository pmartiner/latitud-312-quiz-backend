// POST /get-distrito
type Distrito = {
  distrito: number;
}

export type GetDistritoRequest = {
  cp: string;
}

export type GetDistritoResponse = {
  data: Distrito[];
}