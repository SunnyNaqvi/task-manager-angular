import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private _http: HttpClient) {}

  addTask(data: any): Observable<any> {
    return this._http.post('http://localhost:8081/task/manager/create', data);
  }

  updateTask(taskId: any, data: any): Observable<any> {
    return this._http.put(`http://localhost:8081/task/manager/update/${taskId}`, data);
  }

  getTaskById(taskId: any, data: any): Observable<any> {
    return this._http.get(`http://localhost:8081/task/manager/get/${taskId}`, data);
  }

  getTaskList(): Observable<any> {
    return this._http.get('http://localhost:8081/task/manager/get');
  }

  deleteTask(id: number): Observable<any> {
    return this._http.delete(`http://localhost:8081/task/manager/delete/${id}`);
  }
}
