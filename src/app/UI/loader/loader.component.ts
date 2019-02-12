import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoaderService } from '../loader.service';
import { LoaderState } from '../loader';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy, AfterViewInit {

  show;

  private subscription: Subscription;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
     this.subscription = this.loaderService.loaderState
    .subscribe((state: LoaderState) => {
      setTimeout(() => {
        this.show = state.show;
      }, 0)
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
