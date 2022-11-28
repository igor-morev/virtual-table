export interface Column {
  id: number;
  name: string;
  left: number;
  width: number;
  colIndex: number;
}

export interface Row {
  [colIndex: string]: string;
}
