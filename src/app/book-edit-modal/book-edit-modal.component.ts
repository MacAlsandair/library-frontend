import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../book-card/book.service';
import { Book } from '../book-card/book';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-book-edit-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './book-edit-modal.component.html',
  styleUrls: ['./book-edit-modal.component.scss']
})
export class BookEditModalComponent {
  @Input() editableBook!: Book;
  @Output() updateBookEvent = new EventEmitter<Book>();

  constructor () {}

  public updateBook(book: Book): void {
    this.updateBookEvent.emit(book);
  }
}
