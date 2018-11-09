import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {
  diff;
  hours = '00';
  minutes = '00';
  seconds = '00';

  constructor() { }

  ngOnInit() {
    interval(1000).pipe(
      map(() => {
        this.diff = Math.floor(new Date().setHours(23,59,59,999) - new Date().getTime());
        this.serializeClockTime(this.diff);
      })
    ).subscribe()
  }

  serializeClockTime(duration) {
    let clockHours = duration / (1000*60*60);
    let absoluteHours = Math.floor(clockHours);
    this.hours = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

    let clockMinutes = (clockHours - absoluteHours) * 60;
    let absoluteMinutes = Math.floor(clockMinutes);
    this.minutes = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;

    let clockSeconds = (clockMinutes - absoluteMinutes) * 60;
    let absoluteSeconds = Math.floor(clockSeconds);
    this.seconds = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;
  }


}
