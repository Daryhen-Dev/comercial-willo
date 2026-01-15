export interface BankGetAllInterface {
  idBanco: number;
  idCuenta: number;
  idContaCuenta: number;
  nombre: string;
  cuenta: string;
  codigo: string;
  activo: boolean;
  fechaActualizacion: Date;
}

export interface BankCreateInterface {
  nombre: string;
  cuenta: string;
}

export interface BankUpdateInterface {
  idBanco: number;
  idContaCuenta: number;
  nombre: string;
  cuenta: string;
  codigo: string;
}

export interface BankActiveInterface {
  idBanco: number;
  activo: boolean;
}
