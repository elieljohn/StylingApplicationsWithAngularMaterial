import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public isScreenSmall!: boolean;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([ `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)` ])  // Observe if screen is smaller than 720px
      // Listen for changes to the screen size
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches; // Update isScreenSmall based on the screen size
      });
  }

}
