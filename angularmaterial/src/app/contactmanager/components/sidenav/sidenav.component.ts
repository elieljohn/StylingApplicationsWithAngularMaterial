import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../../models/user';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public isScreenSmall!: boolean;

  users!: Observable<User[]>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService) { }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([ `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)` ])  // Observe if screen is smaller than 720px
      // Listen for changes to the screen size
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches; // Update isScreenSmall based on the screen size
      });

      this.users = this.userService.users;
      this.userService.loadAll();

      this.users.subscribe(data => {
        console.log(data);
      })
  }

}
