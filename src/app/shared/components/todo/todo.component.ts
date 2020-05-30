import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import { Todo} from '../../interface';
import {TodoService} from '../../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @Input() todo: Todo;
  @Input() isTodo: string;

  @Output() onAdd: EventEmitter<string> = new EventEmitter<string>()

  constructor(
    private route: Router,
    private todoServices: TodoService
  ) { }

  ngOnInit(): void {
  }

  deleteTodo(id: string) {
    this.onAdd.emit(id)
  }

  editTodo(id: string) {
    this.route.navigate(['edit', id,])
  }

}
