import { Component, OnInit, TemplateRef } from '@angular/core';
import { BlogService } from '../blog.service';
import { Post } from "../post.model";
import { Comment } from "../comment.model";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  post: Post;
  imageURL: string;
  selectedFile: File;
  modalRef: BsModalRef;
  errorImgMessage: string;
  editMode:boolean = false;
  text: string;
  title: string;
  optToolbar = [
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'size': ['small', 'large', 'huge'] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'align': [] }]
  ];

  constructor(private modalService: BsModalService,
              private blogService: BlogService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  initForm() {
    this.text = '';
    this.title = '';
    this.imageURL = '';
    if(this.editMode) {
      this.blogService.getPostDetails(this.route.snapshot.params.id).subscribe(
        (res:{post: Post, comments: Comment[]}) => {
          this.post = res.post;
          this.title = this.post.title;
          this.text = this.post.content;
          this.imageURL = `${environment.API_URL}/${this.post['image']}`;
        },
        (err) => {
          console.log(err)
        })
    }
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    if (/\.(jpe?g|png|gif)$/i.test(event.target.files[0].name)) {
      let reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onDeletePost() {
    this.blogService.deletePost(this.post.id).subscribe(
      () => {
        this.toastr.success('Post was deleted successfully!');
        this.router.navigate(['blog']);
      },
      (err) => {
        this.toastr.error(`${err.error.rights}`);
      });
  }

  onSubmit() {
    if(this.editMode) {
      this.onUpdatePost();
    } else {
      this.onCreatePost();
    }
  }

  onCreatePost() {
    const savedData:FormData = new FormData();
    savedData.append('title', this.title);
    savedData.append('text', this.text);
    savedData.append('file', this.selectedFile);
    this.blogService.createPost(savedData).subscribe(
      () => {
        this.router.navigate(['blog']);
      },
      (err) => {
        console.log(err)
      })
  }


  onUpdatePost() {
     let savedData:FormData = new FormData();
     savedData.append('title', this.title);
     savedData.append('content', this.text);
     savedData.append('file', this.selectedFile);
     savedData.append('id', this.post.id);
     this.blogService.updatePost(savedData).subscribe(
      () => {
        this.toastr.success('Post was saved successfully!');
        this.router.navigate(['blog']);
      },
      (err) => {
        if(err.error.image) {
          this.errorImgMessage = err.error.image;
        }
        if(err.error.rights) {
          this.toastr.error(`${err.error.rights}`);
        }
      });
  }

  isDisabled(form: NgForm) {
    if(this.editMode) {
      return !(this.title && this.text)
    } else {
      return !(this.title && this.text && this.selectedFile)
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.onDeletePost();
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

}
