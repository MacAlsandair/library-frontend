import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from '../book-card/book.service';
import { BookCardComponent } from '../book-card/book-card.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Book } from '../book-card/book';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-delete-modal',
  standalone: true,
  imports: [CommonModule, BookCardComponent, NgbModule, FormsModule],
  templateUrl: './book-delete-modal.component.html',
  styleUrls: ['./book-delete-modal.component.scss']
})
export class BookDeleteModalComponent {
	@Input() deletedBook!: Book;
  @Output() deleteBookEvent = new EventEmitter<Book>();




	constructor(public activeModal: NgbActiveModal,
    public bookService: BookService) {}

  public deleteBook(): void {
    this.activeModal.close('Close click')
    this.deleteBookEvent.emit(this.deletedBook);

  }
}