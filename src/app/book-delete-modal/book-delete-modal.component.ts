import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from '../book-card/book.service';
import { BookCardComponent } from '../book-card/book-card.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Book } from '../book-card/book';

@Component({
  selector: 'app-book-delete-modal',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './book-delete-modal.component.html',
  styleUrls: ['./book-delete-modal.component.scss']
})
export class BookDeleteModalComponent {
	@Input() deletedBook!: Book;
  @Output() deleteBookEvent = new EventEmitter<Book>();




	constructor(public activeModal: NgbActiveModal,
    public bookService: BookService) {}

  public deleteBook(): void {
    this.deleteBookEvent.emit(this.deletedBook);
    this.activeModal.close('Close click')
  }
}