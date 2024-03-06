import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskAddEditComponent } from './task-add-edit/task-add-edit.component';
import { TaskService } from './services/task.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';

export interface TaskElement {
  id: string;
  taskName: string;
  status: string;
  assignedTo: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'taskName',
    'status',
    'assignedTo',
    'action'
  ];
  title: any = 'crud-app'

  dataSource!: MatTableDataSource<TaskElement>

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _taskService: TaskService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getTaskList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(TaskAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getTaskList();
        }
      },
    });
  }

  getTaskList() {
    this._taskService.getTaskList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteTask(id: number) {
    this._taskService.deleteTask(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Task deleted!', 'done');
        this.getTaskList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(TaskAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getTaskList();
        }
      },
    });
  }
}
