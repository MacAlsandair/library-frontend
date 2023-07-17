import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../book-card/book';
import { BookService } from '../book-card/book.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FavoritesButtonComponent } from '../favorites-button/favorites-button.component';
import { CommentsComponent } from '../comments/comments.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [FavoritesButtonComponent, CommentsComponent, CommonModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  book!: Book;
  private unsubscribe$ = new Subject<void>();
  isBookFavorite: boolean = false;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getBook();
    //this.isBookInFavorites();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // isBookInFavorites(): void {
  //   this.bookService.isBookInFavorites(this.book.id).pipe(takeUntil(this.unsubscribe$)).subscribe(
  //     (isFavorite: boolean) => {
  //       this.isBookFavorite = isFavorite;
  //     }
  //   );
  // }

  private getBook(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookService.getBookById(+id).pipe(takeUntil(this.unsubscribe$)).subscribe(book => {
        this.book = book;
      });
    } else {
      console.error('Book id is not available');
    }
  }
}
