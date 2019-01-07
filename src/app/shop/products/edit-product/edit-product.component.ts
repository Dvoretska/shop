import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable} from 'rxjs';
import * as productsActions from '../../store/actions/products.actions';
import * as categoriesActions from '../../store/actions/categories.actions';
import * as fromRoot from '../../store/reducers/reducer.factory';
import * as fromProducts from '../../store/reducers/products.reducer';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";


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
  price: string = '';
  brand: string = '';
  description: string = '';
  material: string = '';
  discount: string = '';
  files = [];
  warning: string = '';
  isHighlight: boolean = false;
  categories: Category[];
  subcategories: any[];
  selectedCategory: null;
  selectedSubcategory: null;
  selectedImgKey = 0;
  imageUrls = [];
  productWasAdded;
  loading: boolean;
  subjectMaxLength: number = 50;

  constructor(private store: Store<fromRoot.AppState>,
              private toastr: ToastrService,
              private router: Router) {}

  ngOnInit() {
    this.store.dispatch(new categoriesActions.FetchCategories());
    this.store.pipe(select(fromRoot.getCategories)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.categories = state.categories;
      this.subcategories = state.subcategories;
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
    this.warning = '';
    for(let i = 0; i < event.files.length; i++){
      if (!/\.(jpe?g|png|gif)$/i.test(event.files[i].name)) {
        this.warning = 'Download images with extension jpeg, jpg or png.'
      } else {
        if(this.files.length) {
          if(this.files.length >= 12) {
            this.warning = ' The uploaded files exceed the limit.';
            return this.files;
          }
          let prevId = this.files[this.files.length - 1].id;
          this.files.push({file: event.files[i], id: prevId + 1});
        } else {
          this.files.push({file: event.files[i], id: i});
        }
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
    for (let i = 0; i < this.files.length ; i++){
        let reader = new FileReader();
        reader.onload = () => {
          this.imageUrls[this.files[i].id] = reader.result;
        };
        reader.readAsDataURL(this.files[i].file);
      }
    }
  }

  subjectSignsLeft() {
    if(this.brand) {
      return this.subjectMaxLength - this.brand.length
    }
    return this.subjectMaxLength
  }

  fetchSubcategories(selectedCategory) {
    this.store.dispatch(new categoriesActions.FetchSubcategories({category_id: selectedCategory}));
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
    savedData.append('subcategory_id', this.selectedSubcategory);
    if (this.files.length) {
      let a = this.files.splice(this.selectedImgKey, 1);
      this.files.unshift(a[0]);
      for (let i = 0; i < this.files.length; i++) {
        let file = this.files[i].file;
        savedData.append('file', file);
      }
    }
    this.store.dispatch(new productsActions.AddProduct(savedData));
    this.store.pipe(select(fromRoot.getProducts)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.productWasAdded = state.productWasAdded;
      this.loading = state.addProductLoading;
      if(this.productWasAdded) {
        this.toastr.success('Product was saved successfully!');
        this.router.navigate(['shop/products']);
      }
    });
  }

  isFormInvalid() {
    return !(this.description && this.price && this.brand && this.material && this.files.length && this.selectedCategory && this.selectedSubcategory)
  }

  ngOnDestroy(){
    this.store.dispatch(new productsActions.RemoveProductWasAdded());
  }
}
