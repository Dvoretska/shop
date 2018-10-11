export class Product {
  constructor(public price: string,
              public brand: string,
              public description: string,
              public material: string,
              public discount: string,
              public category_id: number,
              public files: File[]
              ) {}
}
