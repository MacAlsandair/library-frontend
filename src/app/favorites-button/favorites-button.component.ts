import { Component, Input } from '@angular/core';
import { BookService } from '../book-card/book.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites-button.component.html',
  styleUrls: ['./favorites-button.component.scss']
})
export class FavoritesButtonComponent {
  isFavorite: boolean = false;
  @Input() bookId!: number;
  private unsubscribe$ = new Subject<void>();

  constructor(private bookService: BookService) {}


  ngOnInit(): void {
    this.isBookInFavorites();
  }

  
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  isBookInFavorites(): void {
    if (this.bookId != undefined) {
      this.bookService.isBookInFavorites(this.bookId).pipe(takeUntil(this.unsubscribe$)).subscribe(
        (isBookFavorite: boolean) => {
          this.isFavorite = isBookFavorite;
        }
      );
    }
  }

  toggleFavorite() {
    if (this.isFavorite) {
      this.isFavorite = false;
      this.bookService.deleteBookFromFavorites(this.bookId).subscribe(() => {
      });
    } else {
      this.isFavorite = true;
      this.bookService.addBookToFavorites(this.bookId).subscribe(() => {
      });
    }
  }
}
