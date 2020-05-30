import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Todo} from '../shared/interface';
import {TodoService} from '../shared/todo.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  form: FormGroup

  constructor(
    private todoServices: TodoService
  ) { }

  ngOnInit(): void {
   this.form = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      author: new FormControl(null, [Validators.required])
   })
  }
  submit() {
    if (this.form.invalid) {
      return
    }

    const todo: Todo = {
      title: this.form.value.title,
      author: this.form.value.author,
      date: new Date(),
      isTodo: false,
    }

    this.todoServices.create(todo).subscribe(() => {
      this.form.reset()
    })


  }
}
