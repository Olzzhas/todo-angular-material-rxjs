import {Component, OnInit} from '@angular/core';
import {ITask} from "../../models/task";
import {BehaviorSubject, Observable} from "rxjs";
import {TaskService} from "../../services/task.service";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {type} from "node:os";
import {FormControl, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit{

  constructor(
    private taskService: TaskService
  ) {
  }

  tasks: ITask [] = []

  public itemListSubject: BehaviorSubject<ITask[]> = new BehaviorSubject<ITask[]>([]);
  public itemList$: Observable<ITask[]> = this.itemListSubject.asObservable();

  toCheck(title: string){
    this.taskService.toCheck(title).subscribe(()=>{
      console.log('success')
    })
  }

  getAllTasks(): Observable<ITask[]>{
    return this.taskService.getAllTasks()
  }

  deleteTask(taskTitle: string){
    return this.taskService.deleteTask(taskTitle).subscribe(response=>{
      console.log(taskTitle)
      window.location.reload()
    })
  }

  toEdit(task: ITask){
    task.isEditMode = !task.isEditMode;
  }

  form = new FormGroup({
    taskTitle: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    taskDescription: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ])
  })
  updateTask(title: string, description: string){
    if (this.form.value.taskTitle === ""){
      this.form.value.taskTitle = title
    }

    if (this.form.value.taskDescription === ""){
      this.form.value.taskDescription = description
    }

    this.taskService.updateTask({
      title: title,
      newTitle: this.form.value.taskTitle as string,
      newDescription: this.form.value.taskDescription as string
    }).subscribe(()=>{
      window.location.reload()
      console.log(123)
    })
  }

  ngOnInit(): void {
    this.getAllTasks().subscribe(tasks =>{
      this.itemListSubject.next(tasks)
    })
  }

}
