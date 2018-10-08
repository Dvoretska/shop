import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable} from 'rxjs';
import { EditorOptionsService} from '../../../shared/editor-options.service';
import * as shopActions from '../../store/shop.actions';

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
  files = [];
  urls = [];
  warning: boolean = false;
  isHighlight: boolean = false;
  categories: Observable<{categories: Category[]}>;
  selectedCategory: any;
  optToolbar;
  selectedImgKey = 0;
  test: any;
  imageUrls = [];

  @ViewChildren('linkRef') linkRefs;

  constructor(private store: Store<{shop: {categories: Category[]}}>, private edOptService: EditorOptionsService) { }

  ngOnInit() {
    this.optToolbar = this.edOptService.initOptions();
    this.categories = this.store.pipe(select((state: {categories: Category[]}) => state['shop'].categories));
  }

  onUpload(e) {
    e.preventDefault();
    this.isHighlight = false;
    if(e.dataTransfer) {
      this.uploadImages(e.dataTransfer)
    } else {
      this.uploadImages(e.target)
    }
  }

  uploadImages(event) {
    for(let i = 0; i < event.files.length; i++){
      if (/\.(jpe?g|png|gif)$/i.test(event.files[i].name)) {
        this.files.push(event.files[i]);
        this.warning = false
      } else {
        this.warning = true
      }
    }
    this.getImagePreviews();
  }

  allowDrop(e) {
    e.preventDefault();
  }

  highlight() {
    this.isHighlight = true;
  }

  makeMainImg(key) {
    this.selectedImgKey = key
    console.log('key', key)
  }

  removeFile(key, event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('30', this.files, key)
    this.files.splice(key, 1);
    console.log('40', this.files, key)
    this.getImagePreviews();
  }

  getImagePreviews() {
    console.log('>>> 1', this.files.length, this.imageUrls.length)
    this.imageUrls = [];
    for (let file of this.files){
      if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
        let reader = new FileReader()
        reader.onload = () => {
          this.imageUrls.push(reader.result);
          console.log('>>> 2', this.files.length, this.imageUrls.length)
        };
        reader.readAsDataURL(file)
      }
    }
  }

  onCreateProduct() {
    let savedData:FormData = new FormData();
    savedData.append('price', this.price);
    savedData.append('brand', this.brand);
    savedData.append('text', this.text);
    savedData.append('material', this.material);
    savedData.append('discount', this.discount);
    savedData.append('category', this.selectedCategory);
    // if (this.files.length) {
    //   let a = this.files.splice(this.selectedImgKey, 1)
    //   this.files.unshift(a[0])
    //   for (var i = 0; i < this.files.length; i++) {
    //     let file = this.files[i]
    //     formData.append('files[' + i + ']', file)
    //   }
    // }
    // this.store.dispatch(new shopActions.addProduct(savedData))

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
