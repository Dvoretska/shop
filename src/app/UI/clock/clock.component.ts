import { Component, OnInit } from '@angular/core';
import { interval, map } from 'rxjs/operators';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {
  future = new Date().setHours(23,59,59,999);
  diff;

  constructor() { }

  ngOnInit() {
    this.diff = Math.floor(this.future.getTime() - new Date().getTime())
  }

  getCurrentTime() {
    return new Date();
  }

  serializeClockTime(date) {
    interval(1000).pipe(
      map((x) => {
        return {
          hours: this.startHours - date.getHours(),
          minutes: date.getMinutes(),
          seconds: date.getSeconds()
        }
        this.diff = Math.floor((this.future.getTime() - new Date().getTime()) / 1000);
        return x;
      })
  )
  }

}
