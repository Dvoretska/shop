import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[image-preview-directive]'
})
export class ImagePreviewDirective {
  @Input() imageKey: any;


  constructor(public elementRef: ElementRef) {}

  ngOnInit() {
  }
}
