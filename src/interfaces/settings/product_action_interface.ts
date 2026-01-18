export interface ProductFormulaGetAllInterface {
  idProducto: number;
  idLocal: number;
  sucursal: string;
  producto: string;
  humedadSeco: string;
  mermaAgua: string;
  servBasico: string;
  precio: string;
  fechaModificado: Date;
  estado: boolean;
}

export interface ProductFormulaUpdateInterface {
  humedadSeco: number;
  mermaAgua: number;
  servBasico: number;
  precio: number;
  idProducto: number;
}

export interface ProductMMGetAllInterface {
  idProducto: number;
  idLocal: number;
  sucursal: string;
  producto: string;
  pMinimo: number;
  pMaximo: number;
  estadoMM: boolean;
  humedadSeco: string;
  mermaAgua: string;
  servBasico: string;
  precio: string;
  fechaModificado: Date;
  estado: boolean;
}

export interface ProductMMUpdateInterface {
  idProducto: number;
  pMinimo: number;
  pMaximo: number;
  estadoMM: boolean;
  humedadSeco: number;
  mermaAgua: number;
  servBasico: number;
  precio: number;
}
