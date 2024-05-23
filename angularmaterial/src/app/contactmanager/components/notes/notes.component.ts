import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Note } from '../../models/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  @Input() notes: Note[] = [];  // Initialize notes as an empty array to avoid error

  displayedColumns: string[] = ['position', 'title', 'date'];
  dataSource!: MatTableDataSource<Note>;

  constructor() { }

  ngOnInit(): void {

    // Create new instance and pass notes array to dataSource
    this.dataSource = new MatTableDataSource<Note>(this.notes);
  }

}
