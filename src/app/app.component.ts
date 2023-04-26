import { Component } from '@angular/core';
import { Book } from './book';
import { BookService } from './book.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

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

  public onAddBook(addForm: NgForm): void {
    document.getElementById('add-book-form')?.click();
    this.bookService.addBook(addForm.value).subscribe({
      next: (response: Book) => {
        console.log(response);
        this.getBooks();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    }
    )
  }

  public onUpdateBook(book: Book): void {
    this.bookService.updateBook(book).subscribe({
      next: (response: Book) => {
        console.log(response);
        this.getBooks();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    }
    );
  }

  public onDeleteBook(bookId: number): void {
    this.bookService.deleteBook(bookId).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getBooks();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public searchBooks(key: string): void {
    console.log(key);
    const result: Book[] = [];
    for (const book of this.books) {
      if (book.author.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || book.genre.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || book.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || book.yearOfPublication.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        result.push(book);
      }
    }
    this.books = result;
    if (result.length === 0 || !key) {
      this.getBooks();
    }
  }

}
