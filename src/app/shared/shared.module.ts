import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule  } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../auth/token.interceptor';

import {
    TreeviewModule,
    TreeviewConfig,
    TreeviewI18nDefault,
    TreeviewI18n,
    DefaultTreeviewEventParser,
    TreeviewEventParser
} from 'ngx-treeview';
import {NgxPaginationModule} from 'ngx-pagination';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { LoaderInterceptorService } from '../UI/loader/loader-interceptor.service';
import { CornersComponent } from '../UI/corners/corners.component';
import { SaleComponent } from '../UI/sale/sale.component';
import { ClockComponent } from '../UI/clock/clock.component';
import { SpinnerComponent } from '../UI/spinner/spinner.component';
import { RippleComponent } from '../UI/ripple/ripple.component';
import { ButtonComponent } from '../UI/button/button.component';
import { TreeComponent } from '../UI/tree/tree.component';
import { OrderSvgComponent } from '../UI/order-svg/order-svg.component';
import { LoaderComponent } from '../UI/loader/loader.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: false
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgSelectModule,
    PerfectScrollbarModule,
    NgxPaginationModule,
    TreeviewModule,
  ],
  declarations: [
    CornersComponent,
    SaleComponent,
    ClockComponent,
    SpinnerComponent,
    RippleComponent,
    ButtonComponent,
    TreeComponent,
    OrderSvgComponent,
    LoaderComponent
  ],
  exports: [
    CornersComponent,
    SaleComponent,
    ClockComponent,
    SpinnerComponent,
    RippleComponent,
    ButtonComponent,
    TreeComponent,
    OrderSvgComponent,
    LoaderComponent,
    NgSelectModule,
    PerfectScrollbarModule,
    NgxPaginationModule,
    TreeviewModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
        },
        {
        provide: HTTP_INTERCEPTORS,
        useClass: LoaderInterceptorService,
        multi: true
      },
      {
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      },
      { provide: 'Window',  useValue: window },
      TreeviewConfig,
      { provide: TreeviewI18n, useClass: TreeviewI18nDefault },
      { provide: TreeviewEventParser, useClass: DefaultTreeviewEventParser }
      ]
    };
  }
}
