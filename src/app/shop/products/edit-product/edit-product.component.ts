import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription} from 'rxjs';
import * as shopActions from '../../store/shop.actions';
import * as fromRoot from '../../store/shop.reducer';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

export interface Category {
  id: number;
  category: string;
}

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit, OnDestroy {
  price: '';
  brand: '';
  description: '';
  material: '';
  discount: '';
  files = [];
  warning: boolean = false;
  isHighlight: boolean = false;
  categories: Category[];
  selectedCategory: null;
  selectedImgKey = 0;
  imageUrls = [];
  error;
  productWasAdded;
  loading: boolean;
  getState$: Observable<fromRoot.ShopState>;
  private getStateSubscription: Subscription;

  constructor(private store: Store<fromRoot.ShopState>,
              private toastr: ToastrService,
              private router: Router)
  {
    this.getState$ = this.store.pipe(select('shop'));
  }

  ngOnInit() {
    this.store.dispatch(new shopActions.FetchCategories());
    this.getStateSubscription = this.getState$.subscribe((state) => {
      this.categories = state.categories;
      this.error = state.error;
    });

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
    this.isHighlight = true;
  }

  fade() {
    this.isHighlight = false;
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
          reader.readAsDataURL(this.files[i].file);
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
    savedData.append('description', this.description);
    savedData.append('material', this.material);
    if(this.discount) {
      savedData.append('discount', this.discount);
    }

    savedData.append('category_id', this.selectedCategory);
    if (this.files.length) {
      let a = this.files.splice(this.selectedImgKey, 1)
      this.files.unshift(a[0]);
      for (let i = 0; i < this.files.length; i++) {
        let file = this.files[i].file;
        savedData.append('file', file);
      }
    }
    this.store.dispatch(new shopActions.AddProduct(savedData));
    this.getStateSubscription = this.getState$.subscribe((state) => {
      this.productWasAdded = state.productWasAdded;
      this.loading = state.addProductLoading;
      if(this.productWasAdded) {
        this.toastr.success('Product was saved successfully!');
        this.router.navigate(['shop']);
      }
    });
  }

  isFormInvalid() {
    return !(this.description && this.price && this.brand && this.material && this.files.length && this.selectedCategory)
  }

  ngOnDestroy(){
    this.store.dispatch(new shopActions.InitProductWasAdded());
    this.getStateSubscription.unsubscribe();
  }
}
