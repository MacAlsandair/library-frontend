import { Component, Input } from '@angular/core';
import { Book } from '../book-card/book';
import { BookService } from '../book-card/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  @Input() book!: Book;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
  }

  addToFavorites(): void {
    this.bookService.addBookToFavorites(this.book.id).subscribe();
  }

  removeFromFavorites(): void {
    this.bookService.deleteBookFromFavorites(this.book.id).subscribe();
  }
}
