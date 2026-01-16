export interface IpLoginGetAllInterface {
  ajusteIpSucursalId: number;
  idLocal: number;
  sucursal: string;
  detalle: string;
  ip: string;
}

export interface IpLoginCreateInterface {
  idLocal: number;
  detalle: string;
  ip: string;
}

export interface IpLoginUpdateInterface {
  ajusteIpSucursalId: number;
  detalle: string;
  ip: string;
}
