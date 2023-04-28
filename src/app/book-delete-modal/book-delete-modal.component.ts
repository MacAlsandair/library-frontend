import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from '../book-card/book.service';
import { BookCardComponent } from '../book-card/book-card.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-book-delete-modal',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './book-delete-modal.component.html',
  styleUrls: ['./book-delete-modal.component.scss']
})
export class BookDeleteModalComponent {
	@Input() name: any;

	constructor(public activeModal: NgbActiveModal,
    public bookService: BookService) {}

  public onDeleteBook(bookId: number): void {
    this.bookService.deleteBook(bookId).subscribe(
      (response: void) => {
        console.log(response);
        BookCardComponent.getBooks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}