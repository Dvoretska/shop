import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  phone: string  = '';
  city: string  = '';
  name: string  = '';
  email: string  = '';
  comment: string  = '';
  @ViewChild('productForm') productForm:ElementRef;
  constructor() { }

  ngOnInit() {
  }

  downloadPdf() {
    //   doc.save(`Order${Date.now()}.pdf`);

     var data = document.getElementById('form');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }

}
