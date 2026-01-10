export interface UserGetAllInterface {
  idUsuario: number;
  idLocal: number;
  usuarioRolId: number;
  rol: string;
  sucursal: string;
  usuario: string;
  estado: boolean;
}

export interface UserUpdatedInterface {
  idUsuario: number;
  usuarioRolId: number;
  usuario: string;
  password: string;
}

export interface UserActiveInterface {
  idUsuario: number;
  estado: boolean;
}
