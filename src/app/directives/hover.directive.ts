import { Directive, Input, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[hover]',
})
export class HoverDirective  {
  @Input() el: HTMLElement[];
  @Input() activeClass: string;

  @HostListener('mouseenter') onMouseenter() {
    for(let i = 0; i < this.el.length; i++) {
      this.renderer.addClass(this.el[i], this.activeClass);
    }
  }

  @HostListener('mouseleave') onMouseleave() {
    for(let i = 0; i < this.el.length; i++) {
      if(window.innerWidth > 768) {
        this.renderer.removeClass(this.el[i], this.activeClass);
      }
    }
  }

  constructor(private renderer: Renderer2) {}
}
