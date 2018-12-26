import { Component, OnInit, HostListener, ElementRef, Renderer2, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StorageService} from "../storage.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  @ViewChild('triggerSection') triggerSection: ElementRef;
  state = 'hide';

  constructor(private renderer: Renderer2,
              private route: ActivatedRoute,
              private storageService: StorageService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if(params.token) {
        this.storageService.setItem('token', JSON.stringify(params.token));
        this.authService.tokenVerify()
          .subscribe((res)=>{
             this.storageService.setItem('user', JSON.stringify(res['user']));
            this.router.navigate(['']);
            })
      }
    });
  }

  public onIntersection({ target, visible }: { target: Element; visible: boolean }): void {
    this.renderer.addClass(target, visible ? 'active' : 'inactive');
    this.renderer.removeClass(target, visible ? 'inactive' : 'active');
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.triggerSection.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;
    if (scrollPosition >= componentPosition) {
      this.state = 'show'
    } else {
      this.state = 'hide'
    }
  }
}

