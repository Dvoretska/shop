import { Component, OnInit, HostListener, ElementRef, Renderer2, ViewChild } from '@angular/core';
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
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  @ViewChild('triggerSection') triggerSection: ElementRef;
  state = 'hide'

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  public onIntersection({ target, visible }: { target: Element; visible: boolean }): void {
    this.renderer.addClass(target, visible ? 'active' : 'inactive');
    this.renderer.removeClass(target, visible ? 'inactive' : 'active');
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.triggerSection.nativeElement.offsetTop
    const scrollPosition = window.pageYOffset
    if (scrollPosition >= componentPosition) {
      this.state = 'show'
    } else {
      this.state = 'hide'
    }
  }
}
