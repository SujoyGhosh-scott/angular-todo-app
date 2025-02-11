import { Component, OnInit, inject, signal } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Todo } from '../../model/todo.type';
import { catchError } from 'rxjs';
import { TodoItemComponent } from '../../components/todo-item/todo-item.component';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterTodosPipe } from '../../pipes/filter-todos.pipe';
// import { NgIf } from '@angular/common';

@Component({
  selector: 'app-todos',
  // imports: [NgIf],
  imports: [TodoItemComponent, UpperCasePipe, FormsModule, FilterTodosPipe],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent implements OnInit {
  todoService = inject(TodosService);
  todoItems = signal<Array<Todo>>([]);
  searchTerm = signal('');

  ngOnInit(): void {
    // console.log(this.todoService.todoItems);
    // this.todoItems.set(this.todoService.todoItems);
    this.todoService
      .getTodosFromApi()
      .pipe(
        catchError((error) => {
          console.log('fetching todo error: ', error);
          throw error;
        })
      )
      .subscribe((todos) => {
        this.todoItems.set(todos);
      });
  }

  updateTodoList(todoItem: Todo) {
    this.todoItems.update((todos) => {
      return todos.map((todo) => {
        if (todo.id === todoItem.id) {
          return {
            ...todo,
            completed: !todoItem.completed,
          };
        }
        return todo;
      });
    });
  }
}
