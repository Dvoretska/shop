import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: any;
  @ViewChild('changedBlock') changedBlock: ElementRef;

  imageUrl: string;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.imageUrl = `${environment.API_URL}/${this.post['image']}`;
    this.renderer.setStyle(
      this.changedBlock.nativeElement,
      'top',
      `${this.getRandomTopPosition()}%`
    );
  }

  getRandomTopPosition() {
    return Math.floor((Math.random()*41) + 30);
  }


}
