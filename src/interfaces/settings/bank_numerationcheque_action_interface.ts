export interface BankNumerationGetAllInterface {
  idBanco: number;
  nombre: string;
  inicial: number;
  final: number;
  fechaModify: string;
  activo: boolean;
}

export interface BankNumerationChequeUpdateInterface {
  inicial: number;
  final: number;
  idBanco: number;
}
