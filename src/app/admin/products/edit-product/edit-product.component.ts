import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as productsActions from '../../../shop/store/actions/products.actions';
import * as categoriesActions from '../../../shop/store/actions/categories.actions';
import * as fromRoot from '../../../shop/store/reducers/reducer.factory';
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {combineLatest} from 'rxjs';
import {skip} from "rxjs/operators";

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
  price: number;
  brand: string = '';
  description: string = '';
  material: string = '';
  discount: number;
  files = [];
  warning: string = '';
  isHighlight: boolean = false;
  categories: Category[];
  selectedCategory: null;
  selectedSubcategory: null;
  selectedImgKey = 0;
  imageUrls = [];
  productImages = [];
  productWasAdded;
  loading: boolean;
  subjectMaxLength: number = 50;
  addedProductId: number;
  editMode:boolean = false;
  product: any;
  subcategories: any[] = [];
  count: number = 0;
  productWasUpdated: boolean;
  removedFiles: string[] = [];

  constructor(private store: Store<fromRoot.AppState>,
              private toastr: ToastrService,
              private router: Router,
              private route:ActivatedRoute) {}

  ngOnInit() {
    this.store.dispatch(new categoriesActions.FetchCategories());
    this.route.params.subscribe(
      (params: Params) => {
        this.editMode = params['product_id'] != null;
        if(this.editMode) {
          this.store.dispatch(new productsActions.FetchProductDetails(+params['product_id']));
          this.store.dispatch(new categoriesActions.FetchSubcategories(`?product_id=${params['product_id']}`));
        }
        this.initForm();
      }
    );
    combineLatest(this.store.pipe(select(fromRoot.getProducts)), this.store.pipe(select(fromRoot.getCategories))).pipe(
      untilComponentDestroyed(this)
    ).subscribe(([products, categories]) => {
      this.subcategories = categories.subcategories;
      this.categories = categories.categories;
      if(this.route.snapshot.params['product_id']) {
        this.product = products.product;
        if (this.product && categories.subcategories.length && this.count == 0) {
          this.price = +this.product.price;
          this.brand = this.product.brand;
          this.description = this.product.description;
          this.material = this.product.material;
          this.discount = +this.product.discount || null;
          this.selectedCategory = this.product.subcategory.category.id;
          if(categories.subcategories.find(x => x.id == this.product.subcategory.id)) {
            this.selectedSubcategory = categories.subcategories.find(x => x.id == this.product.subcategory.id).id;
          } else {
            this.selectedSubcategory = null;
          }
          this.productImages = this.product.images;
          if(this.productImages) {
            for (let i = 0; i < this.productImages.length ; i++){
              this.files.push({file: this.productImages[i], id: i});
            }
          }
          this.getImagePreviews();
        }
      }
      this.productWasAdded = products.productWasAdded;
      this.loading = products.addProductLoading;
      this.addedProductId = products.addedProductId;
      if(this.productWasAdded && this.addedProductId) {
        this.toastr.success('Product was saved successfully!');
        this.router.navigate(['../', this.addedProductId], {relativeTo:this.route});
      }
      this.productWasUpdated = products.productWasUpdated;
      if(this.productWasUpdated) {
        this.toastr.success('Product was updated successfully!');
        this.router.navigate(['../'], {relativeTo:this.route});
      }
    });
  }

  initForm() {
    if (!this.route.snapshot.params['product_id']) {
      this.price = null;
      this.brand = '';
      this.description = '';
      this.material = '';
      this.discount = null;
      this.files = [];
      this.subcategories = [];
      this.selectedCategory = null;
      this.selectedSubcategory = null;
    }
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
            this.warning = 'The uploaded files exceed the limit.';
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

  removeFile(id, event, file) {
    event.preventDefault();
    event.stopPropagation();
    this.files.splice(id, 1);
    if(typeof file.file == 'string') {
      this.removedFiles.push(file.file);
    }
  }

  getImagePreviews() {
    this.imageUrls = [];
    if(this.files && this.files.length) {
      for (let i = 0; i < this.files.length ; i++){
        if(typeof this.files[i].file !== 'object') {
          this.imageUrls[this.files[i].id] = this.files[i].file;
        } else {
          let reader = new FileReader();
          reader.onload = () => {
            this.imageUrls[this.files[i].id] = reader.result;
          };
          reader.readAsDataURL(this.files[i].file);
        }
      }
    }
  }

  subjectSignsLeft() {
    if(this.brand) {
      return this.subjectMaxLength - this.brand.length;
    }
    return this.subjectMaxLength;
  }

  fetchSubcategories(selectedCategory) {
    this.selectedSubcategory = null;
    this.store.dispatch(new categoriesActions.FetchSubcategories(`?category_id=${selectedCategory}`));
  }

  onSubmit() {
    this.route.snapshot.params['product_id'] ? this.onUpdateProduct() : this.onCreateProduct();
  }

  onCreateProduct() {
    let savedData:FormData = new FormData();
    savedData.append('price', String(this.price));
    savedData.append('brand', this.brand);
    savedData.append('description', this.description);
    savedData.append('material', this.material);
    if(this.discount) {
      savedData.append('discount', String(this.discount));
    }
    savedData.append('subcategory_id', this.selectedSubcategory);
    if (this.files.length) {
      let a = this.files.splice(this.selectedImgKey, 1);
      this.files.unshift(a[0]);
      this.selectedImgKey = 0;
      for (let i = 0; i < this.files.length; i++) {
        let file = this.files[i].file;
        savedData.append('file', file);
      }
    }
    this.store.dispatch(new productsActions.AddProduct(savedData));
  }

  onUpdateProduct() {
    this.count++;
    let savedData:FormData = new FormData();
    savedData.append('product_id', this.product.id);
    savedData.append('price', JSON.stringify(this.price));
    savedData.append('brand', this.brand);
    savedData.append('description', this.description);
    savedData.append('material', this.material);
    savedData.append('discount', JSON.stringify(this.discount));
    savedData.append('subcategory_id', this.selectedSubcategory);
    if(this.removedFiles) {
      savedData.append('removedFiles', JSON.stringify(this.removedFiles));
    }
    if (this.files.length) {
      let a = this.files.splice(this.selectedImgKey, 1);
      this.files.unshift(a[0]);
      this.selectedImgKey = 0;
      for (let i = 0; i < this.files.length; i++) {
        let file = this.files[i].file;
        if(typeof file == 'object') {
          savedData.append('file', file);
        }
      }
    }
    this.store.dispatch(new productsActions.UpdateProduct(savedData));
  }

  isFormInvalid() {
    return !(this.description && this.price && this.brand && this.material && this.files.length && this.selectedCategory && this.selectedSubcategory)
  }

  ngOnDestroy(){
    this.store.dispatch(new productsActions.RemoveProductWasAddedOrUpdated());
  }
}
