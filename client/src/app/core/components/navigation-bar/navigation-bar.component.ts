import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/session.service';
import {MatSidenav} from '@angular/material';
import {SidenavService} from '../../services/sidenav.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private session: SessionService,
    private sidenav: SidenavService,
  ) { }

  ngOnInit() {

  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  logout() {
    this.auth.logout({ access_token: this.session.accessToken })
      .subscribe(res => {
        this.session.destroy();
      }, error => {
        this.session.destroy();
      });
  }
}
