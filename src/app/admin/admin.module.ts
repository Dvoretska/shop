import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from  './admin-routing.module';
import { SharedModule } from  '../shared/shared.module';
import { RouterModule  } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { EditProductComponent } from './products/edit-product/edit-product.component';
import { AdminComponent } from './admin.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { AddSubcategoryComponent } from './categories/add-subcategory/add-subcategory.component';
import { SizesListComponent } from './sizes/sizes-list/sizes-list.component';
import { AdminProductsComponent } from './products/admin-products/admin-products.component';
import { AdminProductComponent } from './products/admin-product/admin-product.component';
import { AdminProductDetailsComponent } from './products/admin-product-details/admin-product-details.component';
import { CategoriesActionsComponent } from './categories/categories-actions/categories-actions.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { DeleteProductComponent } from './products/delete-product/delete-product.component';
import { ChangeQuantityComponent } from './products/change-quantity/change-quantity.component';
import { AddQuantityComponent } from './products/add-quantity/add-quantity.component';
import { SizesActionsComponent } from './sizes/sizes-actions/sizes-actions.component';
import { AddSizeComponent } from './sizes/add-size/add-size.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    EditProductComponent,
    AdminComponent,
    CategoriesListComponent,
    AddCategoryComponent,
    AddSubcategoryComponent,
    SizesListComponent,
    AdminProductsComponent,
    AdminProductComponent,
    AdminProductDetailsComponent,
    CategoriesActionsComponent,
    BreadcrumbsComponent,
    DeleteProductComponent,
    ChangeQuantityComponent,
    AddQuantityComponent,
    SizesActionsComponent,
    AddSizeComponent
  ]
})

export class AdminModule { }
