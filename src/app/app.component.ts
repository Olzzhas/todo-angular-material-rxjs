import {Component, OnInit} from '@angular/core';
import {TaskService} from "./services/task.service";
import {ITask} from "./models/task";
import {FormControl, FormGroup, Validators} from "@angular/forms";




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'todo-angular-material-rxjs';

  tasks: ITask[] = []

  constructor(
    private taskService: TaskService,
) {
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

  get taskTitle(){
    return this.form.controls.taskTitle as FormControl
  }

  get taskDescription(){
    return this.form.controls.taskDescription as FormControl
  }

  onSubmit(){
    console.log("button pressed!")

    this.taskService.createTask({
      title: this.form.value.taskTitle as string,
      description: this.form.value.taskDescription as string
    }).subscribe(task =>{
      console.log(task)
      window.location.reload();
    })
  }

}
