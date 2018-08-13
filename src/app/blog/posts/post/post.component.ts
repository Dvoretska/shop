import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { Post } from '../../post.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { PostDetailsComponent } from '../post-details/post-details.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: Post[];
  @Input() postsIds: number[];
  @Input() modalIndex: number;
  @ViewChild('changedBlock') changedBlock: ElementRef;

  imageUrl: string;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService, private renderer: Renderer2) { }

  ngOnInit() {
    this.imageUrl = `${environment.API_URL}/${this.post['image']}`;
    this.renderer.setStyle(this.changedBlock.nativeElement, 'top', `${this.getRandomTopPosition()}%`);
  }

  getRandomTopPosition() {
    return Math.floor((Math.random()*41) + 30);
  }

  openPostDetails() {
    const initialState = { postsIds: this.postsIds, modalIndex: this.modalIndex};
    this.modalRef = this.modalService.show(PostDetailsComponent,  { class : 'post-details-modal', initialState });
  }

}
