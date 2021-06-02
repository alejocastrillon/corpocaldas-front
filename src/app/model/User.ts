import { Serializable } from "./Serializable";

export class User extends Serializable {
  id: number;
  email: string;
  enabled: boolean;
  lastname: string;
  name: string;
  password: string;
  role: string;
  username: string;

  get state(): string {
    return this.enabled ? 'Activo' : 'Inactivo';
  }
}
