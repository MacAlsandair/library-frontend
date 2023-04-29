import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../book-card/book';

@Component({
  selector: 'app-book-add-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-add-modal.component.html',
  styleUrls: ['./book-add-modal.component.scss']
})
export class BookAddModalComponent {
  @Input() addedBook!: Book;
  @Output() addBookEvent = new EventEmitter<Book>();

  constructor () {}

  public addBook(book: Book): void {
    this.addBookEvent.emit(book);
  }
}
