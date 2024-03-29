import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from './book';
import { BookService } from './book.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookDeleteModalComponent } from '../book-delete-modal/book-delete-modal.component';
import { BookEditModalComponent } from '../book-edit-modal/book-edit-modal.component';
import { BookAddModalComponent } from '../book-add-modal/book-add-modal.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { FavoritesButtonComponent } from '../favorites-button/favorites-button.component';
import { AppModule } from '../app.module';


@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, 
    FormsModule, 
    HttpClientModule, NgbModule,
    BookEditModalComponent, BookAddModalComponent, BookDeleteModalComponent, RouterModule, FavoritesButtonComponent],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
  public books!: Book[];
  public editBook!: Book | null;
  public deleteBook!: Book | null;
  public searchText: string = "";

  constructor (public bookService: BookService, private modalService: NgbModal, public authService: AuthService) {}

  ngOnInit(): void {
    this.getBooks();
    // this.searchService.searchText$.subscribe(
    //   text => {
    //     this.bookService.searchBooks(text).subscribe(
    //       (response: Book[]) => {
    //         this.books = response;
    //       },
    //       (error: HttpErrorResponse) => {
    //         console.warn(error);
    //       },
    //     );
    //   }
    // );
  }

  public search(text: string) {
    if (this.searchText == "") {
      this.getBooks();
    }
    else {
      this.bookService.searchBooks(text).subscribe(
        (response: Book[]) => {
          this.books = response;
        },
        (error: HttpErrorResponse) => {
          console.warn(error);
        },
      );
    }
  }

  public addToFavorites(bookId: number): void {
    this.bookService.addBookToFavorites(bookId).subscribe();
  }
  public deleteFromFavorites(bookId: number): void {
    this.bookService.deleteBookFromFavorites(bookId).subscribe();
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

  openDeleteModal(deleteBook: Book) {
		const modalRef = this.modalService.open(BookDeleteModalComponent);
		modalRef.componentInstance.deleteBook = deleteBook;
    modalRef.componentInstance.deleteBookEvent = this.onDeleteBook;
	}

  public onAddBook(addForm: NgForm): void {
    document.getElementById('add-book-form')?.click();
    this.bookService.addBook(addForm.value).subscribe({
      next: (response: Book) => {
        console.log(response);
        this.getBooks();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    }
    )
  }

  public onDeleteBook (deleteBook: Book): void {
    this.bookService.deleteBook(deleteBook.id).subscribe(
      (response: void) => {
        console.log(response);
        this.getBooks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateBook (updateBook: Book): void {
    this.bookService.updateBook(updateBook).subscribe(
      (response: Book) => {
        console.log(response);
        this.getBooks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }





  // public searchBooks(key: string): void {
  //   console.log(key);
  //   const result: Book[] = [];
  //   for (const book of this.books) {
  //     if (book.author.toLowerCase().indexOf(key.toLowerCase()) !== -1
  //     || book.genre.toLowerCase().indexOf(key.toLowerCase()) !== -1
  //     || book.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
  //       result.push(book);
  //     }
  //   }
  //   this.books = result;
  //   if (result.length === 0 || !key) {
  //     this.getBooks();
  //   }
  // }

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
