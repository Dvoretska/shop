export class Product {
  constructor(public price: number,
              public brand: string,
              public description: string,
              public material: string,
              public discount?: number,
              // public category_id: number,
              // public category: any
              ) {}
}
