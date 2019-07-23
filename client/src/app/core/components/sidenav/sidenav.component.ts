import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {SidenavService} from '../../services/sidenav.service';
import {map} from 'rxjs/operators';

interface ROUTE {
  icon?: string;
  route?: string;
  title?: string;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent implements OnInit {
  @ViewChild('navigationSidenav') public sidenav: MatSidenav;

  opened = true;
  fixedInViewport = true;
  mode = 'side';
  layoutGap = '64';

  navRoutes: ROUTE[] = [
    {
      icon: 'dashboard',
      route: 'list/me',
      title: 'Created by me',
    }, {
      icon: 'dashboard',
      route: 'list/sample',
      title: 'Sample Documents',
    }
  ];

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2,
              private bpo: BreakpointObserver,
              private sidenavService: SidenavService,
  ) {}

  public ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);

    const breakpoints = Object.keys(Breakpoints).map(key => Breakpoints[key]);
    this.bpo.observe(breakpoints)
      .pipe(map(bst => bst.matches))
      .subscribe(matched => {
        this.determineSidenavMode();
        this.determineLayoutGap();
      });
  }

  private determineSidenavMode(): void {
    if (
      this.isExtraSmallDevice() ||
      this.isSmallDevice()
    ) {
      this.fixedInViewport = true;
      this.mode = 'over';
      this.opened = true;
      return;
    }

    this.fixedInViewport = true;
    this.mode = 'side';
  }

  private determineLayoutGap(): void {
    if (this.isExtraSmallDevice() || this.isSmallDevice()) {
      this.layoutGap = '0';
      return;
    }

    this.layoutGap = '64';
  }

  public isExtraSmallDevice(): boolean {
    return this.bpo.isMatched(Breakpoints.XSmall);
  }

  public isSmallDevice(): boolean {
    return this.bpo.isMatched(Breakpoints.Small);
  }
}
