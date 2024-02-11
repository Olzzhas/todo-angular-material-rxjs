import {Component, OnInit} from '@angular/core';
import {TaskService} from "./services/task.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'todo-angular-material-rxjs';

  inputTitle: string = '';
  inputDescription: string = '';

  constructor(
    private taskService: TaskService
  ) {
  }

  onSubmit(){
    this.taskService.createTask({
      title: this.inputTitle,
      description: this.inputDescription
    })
  }
  ngOnInit(): void {

  }

}
