import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/internal/Observable';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { MatSidenav } from '@angular/material/sidenav';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public isScreenSmall!: boolean;

  users!: Observable<User[]>;
  isDarkTheme: boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private router: Router) { }

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([ `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)` ])  // Observe if screen is smaller than 720px
      // Listen for changes to the screen size
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches; // Update isScreenSmall based on the screen size
      });

      this.users = this.userService.users;
      this.userService.loadAll();

      // Subscribe to router events and execute callback function when route changes
      this.router.events.subscribe(() => {
        // Close sidenav if screen is smaller than 720px
        if (this.isScreenSmall) {
          this.sidenav.close();
        }
      });
  }

}
