export class User {
  constructor(public id: number,
              public email: string,
              public password_digest: string,
              public image: string,
              public role_id: Object) {}
}
