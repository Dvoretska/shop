import { Role } from './role.model';

export class User {
  public id: number;
  public email: string;
  public password_digest: string;
  public image: string;
  public role_id: Role;

  constructor(id: number, email: string, password_digest: string, image: string, role_id: Role) {
    this.id = id;
    this.email = email;
    this.password_digest = password_digest;
    this.image = image;
    this.role_id = role_id;
  }
}
