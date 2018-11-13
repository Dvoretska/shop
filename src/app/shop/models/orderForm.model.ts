export class OrderForm {
  constructor(
    public phone: string,
    public city: string,
    public first_name: string,
    public surname: string,
    public email: string,
    public comment: string,
    public post_code: string,
    public country?: string
  ) {}
}
