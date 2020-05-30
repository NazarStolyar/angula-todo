import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {TodoService} from '../shared/todo.service';
import {Todo} from '../shared/interface';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {


  todos: Todo[] = []
  tSub: Subscription
  isTodo: boolean = false

  constructor(
    private todoServices: TodoService
  ) { }

  ngOnInit() {
    this.tSub = this.todoServices.getAll().subscribe((todo) => {
        this.todos = todo
        this.todos.map(todo => {
          if (todo.isTodo) {
            this.isTodo = true
          }
        })
    })
  }

  deletePost(id: string) {
    this.todoServices.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter(todo => todo.id !== id)
      this.todos.map(todo => {
        if (todo.isTodo) {
          this.isTodo = true
        } else {
          this.isTodo = false
        }
      })
    })
  }

  ngOnDestroy() {
    if (this.tSub) {
      this.tSub.unsubscribe()
    }
  }
}
