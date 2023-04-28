import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-book-delete-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-delete-modal.component.html',
  styleUrls: ['./book-delete-modal.component.scss']
})
export class BookDeleteModalComponent {
	@Input() name: any;

	constructor(public activeModal: NgbActiveModal) {}
}