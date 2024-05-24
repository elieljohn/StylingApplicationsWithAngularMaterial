import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>(); // Expose toggleSidenav for SidenavComponent to listen to

  constructor(private dialog: MatDialog) { }

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
    });
  }

}
