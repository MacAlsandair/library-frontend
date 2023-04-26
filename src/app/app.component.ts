import { Component } from '@angular/core';
import { Book } from './book';
import { BookService } from './book.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'library-frontend';
  public books!: Book[];

  constructor (private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  public getBooks(): void {
    this.bookService.getBooks().subscribe(
      (response: Book[]) => {
        this.books = response
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
