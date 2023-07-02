import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Book } from '../book-card/book';
import { BookService } from '../book-card/book.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  public books!: Book[];
  public searchText!: string;

  constructor(public authService: AuthService, private router: Router, private bookService: BookService) {
  }


  public search(text: string) {
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
