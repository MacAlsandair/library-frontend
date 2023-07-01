import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../book-card/book';
import { BookService } from '../book-card/book.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  @Input() book!: Book;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getBook();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  addToFavorites(): void {
    this.bookService.addBookToFavorites(this.book.id).pipe(takeUntil(this.unsubscribe$)).subscribe();
  }

  removeFromFavorites(): void {
    this.bookService.deleteBookFromFavorites(this.book.id).pipe(takeUntil(this.unsubscribe$)).subscribe();
  }

  private getBook(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookService.getBookById(+id).pipe(takeUntil(this.unsubscribe$)).subscribe(book => this.book = book);
    } else {
      console.error('Book id is not available');
    }
  }
}