import {SelectionModel} from '@angular/cdk/collections';
import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ApiService } from '../../services/api.service';
import { NgClass } from '@angular/common';


export interface Data{
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule,NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  data:Data[] = [];
  displayedColumns: string[] = ['select', 'title','completed', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Data>(this.data);
  selection = new SelectionModel<Data>(true, []);

  constructor(public api:ApiService){}
  ngOnInit():void{
    this.api.getTodo().subscribe(
      (data1) => {
        this.data=data1;
        this.dataSource.data = this.data;
        console.log(this.data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    )
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Data): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  isCompleted(row: Data): boolean {
    return row.completed;
  }

  getTitleClass(row: Data): string {
    return row.completed ? 'completed' : '';
  }
}

