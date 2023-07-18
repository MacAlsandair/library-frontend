import { Component } from '@angular/core';
import { Book } from '../book-card/book';
import { BookService } from '../book-card/book.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { FavoritesButtonComponent } from '../favorites-button/favorites-button.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recommended-books',
  templateUrl: './recommended-books.component.html',
  standalone: true,
  imports: [FavoritesButtonComponent, CommonModule, RouterModule],
  styleUrls: ['./recommended-books.component.scss']
})
export class RecommendedBooksComponent {
  public books!: Book[];

  constructor (public bookService: BookService, private modalService: NgbModal, public authService: AuthService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  public getBooks(): void {
    this.bookService.getPersonalRecommendations().subscribe(
      (response: Book[]) => {
        this.books = response
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
