import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { AddSubcategoryComponent } from './categories/add-subcategory/add-subcategory.component';
import { AdminProductsComponent } from './products/admin-products/admin-products.component';
import { AdminProductDetailsComponent } from './products/admin-product-details/admin-product-details.component';
import { ChangeQuantityComponent } from './products/change-quantity/change-quantity.component';
import { SizesListComponent } from './sizes/sizes-list/sizes-list.component';
import { AddQuantityComponent } from './products/add-quantity/add-quantity.component';
import { AddSizeComponent } from './sizes/add-size/add-size.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { DeleteProductComponent } from './products/delete-product/delete-product.component';

export const adminRoutes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: '', redirectTo: 'categories', pathMatch: 'full' },
    { path: 'categories', component: CategoriesListComponent},
    { path: 'categories/add', component: AddCategoryComponent },
    { path: 'categories/subcategory-add', component: AddSubcategoryComponent },
    { path: 'products', component: AdminProductsComponent },
    { path: 'products/add', component: EditProductComponent},
    { path: 'products/:product_id', component: AdminProductDetailsComponent },
    { path: 'products/:product_id/change', component: EditProductComponent },
    { path: 'products/:product_id/delete', component: DeleteProductComponent },
    { path: 'products/:product_id/quantity', component: ChangeQuantityComponent },
    { path: 'products/:product_id/quantity/add', component: AddQuantityComponent },
    { path: 'sizes', component: SizesListComponent },
    { path: 'sizes/add', component: AddSizeComponent },
  ]}
];

