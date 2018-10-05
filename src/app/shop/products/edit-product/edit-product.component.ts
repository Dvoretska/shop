import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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
  countries = [
    {id: 1, name: "United States"},
    {id: 2, name: "Australia"},
    {id: 3, name: "Canada"},
    {id: 4, name: "Brazil"},
    {id: 5, name: "England"}
  ];
  selectedValue = this.countries[0].id;
  optToolbar = [
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'size': ['small', 'large', 'huge'] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'align': [] }]
  ];

  constructor() { }

  ngOnInit() {
  }

  onCreateProduct() {
    let savedData:FormData = new FormData();
    savedData.append('price', this.price);
    savedData.append('brand', this.brand);
    savedData.append('text', this.text);
    savedData.append('material', this.material);
    savedData.append('discount', this.discount);
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
