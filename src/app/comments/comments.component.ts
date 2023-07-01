import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../book-card/book';
import { CommentsService } from './comments.service';
import { Comment } from './comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = [];
  newCommentContent!: string;
  @Input() book!: Book;
  editingCommentId: number | any = null; 


  constructor(private commentService: CommentsService) { }

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

  updateComment(comment: Comment): void {
    this.commentService.updateComment(comment.id, comment)
      .subscribe(() => this.getCommentsByBook());
  }

  deleteComment(comment: Comment): void {
    this.comments = this.comments.filter(c => c !== comment);

    this.commentService.deleteComment(comment.id).subscribe(() => {
      this.getCommentsByBook();
    });
  }
}
