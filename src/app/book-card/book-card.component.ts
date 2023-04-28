import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from './book';
import { BookService } from './book.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, 
    FormsModule, 
    HttpClientModule, NgbModule,],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
  public books!: Book[];
  public editBook!: Book | null;
  public deleteBook!: Book | null;

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

  public openDeleteModal(book: Book): void {
    this.onDeleteBook(book.id);
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
    this.bookService.updateBook(book).subscribe(
      (response: Book) => {
        console.log(response);
        this.getBooks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteBook(bookId: number): void {
    this.bookService.deleteBook(bookId).subscribe(
      (response: void) => {
        console.log(response);
        this.getBooks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchBooks(key: string): void {
    console.log(key);
    const result: Book[] = [];
    for (const book of this.books) {
      if (book.author.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || book.genre.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || book.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        result.push(book);
      }
    }
    this.books = result;
    if (result.length === 0 || !key) {
      this.getBooks();
    }
  }

  public onOpenModal(book: Book | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === "add") {
      button.setAttribute('data-target', '#addBookModal');
    }
    if (mode === "edit") {
      this.editBook = book;
      button.setAttribute('data-target', '#updateBookModal');
    }
    if (mode === "delete") {
      this.deleteBook = book;
      button.setAttribute('data-target', '#deleteBookModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
