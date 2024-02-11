import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ITask} from "../models/task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5000'
  constructor(private http: HttpClient) { }

  createTask(data: ITask): Observable<ITask>{
    return this.http.post<ITask>(`${this.apiUrl}/task`,data)
  }
}
