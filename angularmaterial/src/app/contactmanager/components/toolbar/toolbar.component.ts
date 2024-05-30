import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>(); // Expose toggleSidenav for SidenavComponent to listen to
  @Output() toggleTheme = new EventEmitter<void>(); // Expose toggleTheme

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
  }

  // Open the Add Contact dialog
  openAddContactDialog(): void{
    let dialogRef = this.dialog.open(NewContactDialogComponent, {
      width: '450px'
    });

    // Subscribe to the dialogRef afterClosed() event then log to console
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);

      // If the dialog was closed with a result, navigate to the contact page
      if(result) {
        this.openSnackBar("Contact added", "Navigate")
          .onAction().subscribe(() => {
            this.router.navigate(['/contactmanager', result.id]);
          });
      }
    });
  }

  // Open a snackbar with a message and action button
  // Returns a MatSnackBarRef object
  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000, // Automatically dismisses itself after 5 seconds
    });
  }

}
