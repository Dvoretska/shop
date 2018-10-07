import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable} from 'rxjs';

export interface Category {
  name: string
}

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  price: '';
  brand: '';
  text: '';
  material: '';
  discount: '';
  categories: Observable<{categories: Category[]}>;
  selectedCategory: any;
  optToolbar = [
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'size': ['small', 'large', 'huge'] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'align': [] }]
  ];

  constructor(private store: Store<{shop: {categories: Category[]}}>) { }

  ngOnInit() {
   this.categories = this.store.pipe(select((state: {categories: Category[]}) => state['shop'].categories));
  }

  onCreateProduct() {
    let savedData:FormData = new FormData();
    savedData.append('price', this.price);
    savedData.append('brand', this.brand);
    savedData.append('text', this.text);
    savedData.append('material', this.material);
    savedData.append('discount', this.discount);
    savedData.append('category', this.selectedCategory);
    // this.blogService.updatePost(savedData).subscribe(
    //   () => {
    //     this.toastr.success('Post was saved successfully!');
    //     this.router.navigate(['blog']);
    //   },
    //   (err) => {
    //     if(err.error.image) {
    //       this.errorImgMessage = err.error.image;
    //     }
    //     if(err.error.rights) {
    //       this.toastr.error(`${err.error.rights}`);
    //     }
    //   });
  }

}
