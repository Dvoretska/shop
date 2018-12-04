import { Component, OnInit, Input } from '@angular/core';
import * as productsActions from "../../store/actions/products.actions";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../store/reducers/reducer.factory";
import {FetchProductsBySearch} from "../../store/actions/products.actions";
import {PageScrollInstance} from "ngx-page-scroll";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() categories: any[];
  searchValue: string = '';
  constructor(private store: Store<fromRoot.AppState>, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchValue = params['search']
    })
  }

  searchProduct(){
    this.router.navigate([], {relativeTo: this.route, queryParams: { search: this.searchValue }});
  }

}
