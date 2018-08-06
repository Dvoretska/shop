import { Component, OnInit, HostListener, ElementRef, Renderer2 } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  // animations: [
  //   trigger('scrollAnimation', [
  //     state('show', style({
  //       opacity: 1,
  //       transform: "translateX(0)"
  //     })),
  //     state('hide',   style({
  //       opacity: 0,
  //       transform: "translateX(-100%)"
  //     })),
  //     transition('show => hide', animate('700ms ease-out')),
  //     transition('hide => show', animate('700ms ease-in'))
  //   ])
  // ]
})
export class LandingComponent implements OnInit {
  // state = 'hide';
  // @ViewChild('someVar') el:ElementRef;
  // @HostListener('window:scroll', ['$event'])
  //   checkScroll() {
  //     const componentPosition = this.el.nativeElement.offsetTop;
  //     const scrollPosition = window.pageYOffset;
  //     console.log('componentPosition', componentPosition, 'scrollPosition', scrollPosition)
  //     if (scrollPosition >= componentPosition) {
  //       this.state = 'show'
  //     } else {
  //       this.state = 'hide'
  //     }
  //
  //   }

  constructor(public el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
  }

  public onIntersection({ target, visible }: { target: Element; visible: boolean }): void {
    this.renderer.addClass(target, visible ? 'active' : 'inactive');
    this.renderer.removeClass(target, visible ? 'inactive' : 'active');
  }
}
