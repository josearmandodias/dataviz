export interface DataInput {
  gene: string;
  proteinPosition: number;
  patient: string;
};

export interface Point {
  x: number;
  y: number;
};

export interface CountPerPos {
  protPos: number;
  count: number;
}
