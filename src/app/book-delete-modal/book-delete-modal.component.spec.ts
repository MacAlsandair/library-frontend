import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDeleteModalComponent } from './book-delete-modal.component';

describe('BookDeleteModalComponent', () => {
  let component: BookDeleteModalComponent;
  let fixture: ComponentFixture<BookDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BookDeleteModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
