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
	@Input() deleteBook!: Book;
  @Input() parentComponent!: BookCardComponent;
  @Output() someEvent = new EventEmitter<string>();

  callParent(): void {
    this.someEvent.next("das");
  }


	constructor(public activeModal: NgbActiveModal,
    public bookService: BookService) {}

  public deleteBook(): void {
    this.activeModal.close('Close click')
    this.bookService.deleteBook(this.deleteBook.id!).subscribe(
      (response: void) => {
        console.log(response);
        // BookCardComponent.getBooks();
        this.parentComponent.getBooks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}