import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../book-card/book';
import { CommentsService } from './comments.service';
import { Comment } from './comment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = [];
  newCommentContent!: string;
  @Input() book!: Book;
  editingCommentId: number | any = null; 
  updatedCommentText!: string;


  constructor(private commentService: CommentsService, public authService: AuthService) { }

  ngOnInit(): void {
    this.getCommentsByBook();
  }

  getCommentsByBook() {
    this.commentService.getCommentsByBook(this.book.id)
      .subscribe(comments => this.comments = comments);
  }

  addComment(commentText: string): void {
    this.commentService.addComment(this.book.id, commentText)
      .subscribe(comment => {
        this.comments.push(comment);
        this.newCommentContent = '';
      });
  }

  updateComment(id: number, updatedCommentText: string): void {
    this.commentService.updateComment(id, updatedCommentText)
      .subscribe(() => this.getCommentsByBook());
  }

  deleteComment(comment: Comment): void {
    this.comments = this.comments.filter(c => c !== comment);

    this.commentService.deleteComment(comment.id).subscribe(() => {
      this.getCommentsByBook();
    });
  }
}
