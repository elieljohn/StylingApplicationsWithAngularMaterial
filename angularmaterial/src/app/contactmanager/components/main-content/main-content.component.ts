import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  user?: User;
  constructor(
    private route: ActivatedRoute,
    private service: UserService
  ) { }

  ngOnInit() {
    // Get the id from the route
    this.route.params.subscribe(params => { // Subscribe to the params object
      const id = params['id'];  // Extract id parameter from the params object
      this.user = this.service.userById(id);  // Assign the User object returned by userById to the user property
    });
  }

}
