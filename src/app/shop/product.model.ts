export class Product {
  constructor(
    public id: number,
    public brand: string,
    public description: string,
    public material: string,
    public price: number,
    public images?: string[],
    public discount?: number,
    public category_id?: {id: number, category: string},
    ) {}
}
