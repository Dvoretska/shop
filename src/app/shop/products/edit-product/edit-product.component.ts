import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription} from 'rxjs';
import { EditorOptionsService} from '../../../shared/editor-options.service';
import * as shopActions from '../../store/shop.actions';
import * as fromRoot from '../../store/shop.reducer';

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
  warning: boolean = false;
  isHighlight: boolean = false;
  categories: Observable<{categories: Category[]}>;
  selectedCategory: any;
  optToolbar;
  selectedImgKey = 0;
  imageUrls = [];
  loading: boolean;
  tagState$: Observable<fromRoot.ShopState>;
  private tagStateSubscription: Subscription;

  constructor(private store: Store<fromRoot.ShopState>, private edOptService: EditorOptionsService) {
    this.tagState$ = this.store.pipe(select('shop'));
  }

  ngOnInit() {
    this.tagStateSubscription = this.tagState$.subscribe((state) => {
      this.categories = state.categories;
      this.loading = state.loading
    });
    this.optToolbar = this.edOptService.initOptions();
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
        this.files.push({file: event.files[i], id: i});
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
  }

  removeFile(id, event) {
    event.preventDefault();
    event.stopPropagation();
    this.files.splice(id, 1);
  }

  getImagePreviews() {
    this.imageUrls = [];
    if(this.files && this.files.length) {
    for (let i =0; i < this.files.length ; i++){
        if (/\.(jpe?g|png|gif)$/i.test(this.files[i].file.name)) {
          let reader = new FileReader()
          reader.readAsDataURL(this.files[i].file)
          reader.onload = () => {
            this.imageUrls[this.files[i].id] = reader.result;
          };
        }
      }
    }
  }

  onCreateProduct() {
    let savedData:FormData = new FormData();
    savedData.append('price', this.price);
    savedData.append('brand', this.brand);
    savedData.append('description', this.text);
    savedData.append('material', this.material);
    savedData.append('discount', this.discount);
    savedData.append('category_id', this.selectedCategory);
    // if (this.files.length) {
    //   let a = this.files.splice(this.selectedImgKey, 1)
    //   this.files.unshift(a[0]);
    //   for (let i = 0; i < this.files.length; i++) {
    //     let file = this.files[i].file
    //     savedData.append('files[' + i + ']', file);
    //     console.log('files[' + i + ']', file)
    //   }
    // }
    this.store.dispatch(new shopActions.AddProduct(savedData))

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
