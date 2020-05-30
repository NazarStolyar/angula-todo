import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Todo} from '../shared/interface';
import {ActivatedRoute, Params} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {TodoService} from '../shared/todo.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  todo: Todo;
  tSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private todoServices: TodoService
  ) {
  }

  ngOnDestroy(): void {
    if (this.tSub) {
      this.tSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params: Params) => {
        return this.todoServices.getById(params['id']);
      })).subscribe((todo: Todo) => {
      this.todo = todo;
      this.form = new FormGroup({
        title: new FormControl(todo.title, [Validators.required, Validators.minLength(5)]),
        author: new FormControl(todo.author, [Validators.required]),
        isTodo: new FormControl(todo.isTodo)
      });
    });

  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.tSub = this.todoServices.updateTodo({
      ...this.todo,
      title: this.form.value.title,
      author: this.form.value.author,
      isTodo: this.form.value.isTodo,
    }).subscribe(() => {
      this.form.reset();
    });
  }

}
