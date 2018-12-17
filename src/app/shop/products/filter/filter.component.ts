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
    this.route.queryParams.subscribe(params => {
      this.searchValue = params['search']
    })
  }

  searchProduct(){
    this.router.navigate([], {relativeTo: this.route, queryParams: { search: this.searchValue }});
  }

}
