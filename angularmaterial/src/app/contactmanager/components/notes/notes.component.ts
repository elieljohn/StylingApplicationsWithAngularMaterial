import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Note } from '../../models/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, AfterViewInit {

  @Input() notes: Note[] = [];  // Initialize notes as an empty array to avoid error

  displayedColumns: string[] = ['position', 'title', 'date'];
  dataSource!: MatTableDataSource<Note>;

  constructor() { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;  // Add non-null '!' assertion to avoid error

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // Assign paginator to dataSource.paginator
  }

  ngOnInit(): void {

    // Create new instance and pass notes array to dataSource
    this.dataSource = new MatTableDataSource<Note>(this.notes);
  }

}
