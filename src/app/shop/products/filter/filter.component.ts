import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit{
  @Input() categoriesTree: any;
  searchValue: string = '';
  options = {};
  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // this.store.dispatch(new productsActions.FetchCategoriesTree());
    // this.store.pipe(select(fromRoot.getProducts)).pipe(
    //   untilComponentDestroyed(this)
    // ).subscribe((state) => {
    //     this.categoriesTree = state.categoriesTree;
    // });
    console.log(this.categoriesTree)
    this.route.queryParams.subscribe(params => {
      this.searchValue = params['search']
    })
  }

  searchProduct(){
    this.router.navigate([], {relativeTo: this.route, queryParams: { search: this.searchValue }});
  }

}
