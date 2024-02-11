import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ITask} from "../models/task";
import {strings} from "@angular-devkit/core";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5000'
  constructor(private http: HttpClient) { }

  createTask(data: ITask): Observable<ITask>{
    return this.http.post<ITask>(`${this.apiUrl}/task/create`,data)
  }

  getAllTasks(): Observable<ITask[]>{
    return this.http.get<ITask[]>(`${this.apiUrl}/task/all`)
  }

  deleteTask(title: string){
    return this.http.delete<object>(`${this.apiUrl}/task/delete/${title}`)
  }

  getTaskByTitle(title: string): Observable<ITask>{
    return this.http.get<ITask>(`${this.apiUrl}/task/${title}`);
  }

  toCheck(title: string){
    return this.http.put<object>(`${this.apiUrl}/task/check/${title}`, null)
  }

  updateTask(data: object){
    return this.http.put<object>(`${this.apiUrl}/task/update/`, data)
  }
}
