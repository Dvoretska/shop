import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import {ActivatedRoute, Router} from "@angular/router";
import {OrderForm} from '../models/orderForm.model';

@Component({
  selector: 'app-order',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})

export class OrderFormComponent implements OnInit {
  orderForm: OrderForm = {
    phone: '',
    city: '',
    first_name: '',
    surname: '',
    email: '',
    comment: '',
    post_code:  '',
    country: ''
  };

  @ViewChild('productForm') productForm:ElementRef;

  constructor(private route: ActivatedRoute, private router: Router) { }

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

  saveOrder() {
    let savedData:FormData = new FormData();
    for(let key in this.orderForm){
      savedData.append(key, this.orderForm[key]);
    }

    // this.router.navigate(['../../checkout'], {relativeTo: this.route});
  }


}
