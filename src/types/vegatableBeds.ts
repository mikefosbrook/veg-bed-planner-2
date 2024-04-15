export interface ICell {
  id: number;
  name: string;
  vegetable?: string;
}

export interface IBed {
  id: string;
  name: string;
  cellsX: number;
  cellsY: number;
  cells: ICell[];
}
