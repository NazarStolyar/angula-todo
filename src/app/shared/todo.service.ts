import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FbCreateResponse, Todo} from './interface';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class TodoService {
  constructor(private http: HttpClient) {}

  create(todo: Todo): Observable<Todo> {
    return this.http.post(`${environment.fbUrl}/todos.json`,todo)
      .pipe(
        map((response: FbCreateResponse) => {
          return  {
            ...todo,
            id: response.name,
            date: new Date(todo.date)
          };
        })
      )
  }

  getAll(): Observable<Todo[]> {
    return this.http.get(`${environment.fbUrl}/todos.json`)
      .pipe(
        map((response: {[key: string]: any}) => {
          return Object
            .keys(response)
            .map(key => ({
              ...response[key],
              id: key,
              date: new Date(response[key].date)
            }))
        })
      )
  }

  getById(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${environment.fbUrl}/todos/${id}.json`)
      .pipe(
        map((todo: Todo) => {
          return  {
            ...todo,
            id,
            date: new Date(todo.date)
          };
        })
      )
  }

  deleteTodo(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbUrl}/todos/${id}.json`)
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.patch<Todo>(`${environment.fbUrl}/todos/${todo.id}.json`, todo)
      .pipe(

      )
  }



}
