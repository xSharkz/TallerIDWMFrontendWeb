export interface User {
  id: number;
  rut: string;
  name: string;
  birthdate: Date;
  email: string;
  gender: string;
  passwordhash: string;
  isadmin: boolean;
  isenabled: boolean;
}

export interface Data {
  token: string;
  user: User;
}

export interface ResponseAPI {
  message: string;
  data:    Data;
  error:   boolean;
}
