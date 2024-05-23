import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Note } from '../../models/note';
import { MatSort } from '@angular/material/sort';

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
  @ViewChild(MatSort) sort!: MatSort; // Add non-null '!' assertion to avoid error

  ngAfterViewInit() {
    // Assign paginator to dataSource.paginator
    this.dataSource.paginator = this.paginator;

    // Assign sort to dataSource.sort
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    // Create new instance and pass notes array to dataSource
    this.dataSource = new MatTableDataSource<Note>(this.notes);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value; // Retrieve value from the input field
    this.dataSource.filter = filterValue.trim().toLowerCase();  // Clean the input then apply as filter to the dataSource
  }

}
