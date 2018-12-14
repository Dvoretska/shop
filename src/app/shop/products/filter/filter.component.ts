import {Component, OnInit, Input} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromRoot from "../../store/reducers/reducer.factory";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit{
  @Input() categories: any[];
  searchValue: string = '';
  constructor(private store: Store<fromRoot.AppState>,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.categories)
    this.route.queryParams.subscribe(params => {
      this.searchValue = params['search']
    })
  }

  searchProduct(){
    this.router.navigate([], {relativeTo: this.route, queryParams: { search: this.searchValue }});
  }

}
