export interface IpCameraGetAllInterface {
  camaraId: number;
  idLocal: number;
  sucursal: string;
  ipEntrada: string;
  ipSalida: string;
  detalle: string;
  usuario: string;
  password: string;
  dateUpdated: Date;
}

export interface IpCameraCreateInterface {
  idLocal: number;
  ipEntrada: string;
  ipSalida: string;
  detalle: string;
  usuario: string;
  password: string;
}

export interface IpCameraUpdateInterface {
  camaraId: number;
  idLocal: number;
  ipEntrada: string;
  ipSalida: string;
  detalle: string;
  usuario: string;
  password: string;
}
