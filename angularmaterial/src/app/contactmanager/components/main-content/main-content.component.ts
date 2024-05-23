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

  user?: User | null;
  constructor(
    private route: ActivatedRoute,
    private service: UserService) { }

  ngOnInit() {
    // Get the id from the route
    this.route.params.subscribe(params => { // Subscribe to the params object
      let id = params['id'];  // Extract id parameter from the params object
      if (!id) id = 1; // If id is undefined, set it to 1
      this.user = null;
      this.service.users.subscribe(users => {
        if (users.length == 0) return;

        // Wait 500ms before assigning the user
        setTimeout(() => {
          // Assign the User object returned by userId to the user
          this.user = this.service.userById(id);
        }, 500)
      })
    });
  }

}
