import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[fileUpload]'
})
export class FileUploadDirective {
  selectedFile: File;
  url: string;
  @Output() imageURLUploaded =  new EventEmitter<string>();
  @Output() fileUploaded =  new EventEmitter<File>();

  constructor() {}

  @HostListener('change', ['$event'])
    onChange($event) {
      $event.preventDefault();

      this.selectedFile = $event.target.files[0];
      if (/\.(jpe?g|png|gif)$/i.test($event.target.files[0].name)) {
        let reader = new FileReader();
        reader.onload = () => {
          this.url = reader.result;
          this.imageURLUploaded.emit(this.url);
        };
        reader.readAsDataURL(this.selectedFile);
      }

      this.fileUploaded.emit(this.selectedFile);
    }
}