export class OrderForm {
  constructor(
    public phone: string,
    public city: string,
    public firstName: string,
    public surname: string,
    public email: string,
    public comment: string,
    public postCode: string,
    public country?: string
  ) {}
}
