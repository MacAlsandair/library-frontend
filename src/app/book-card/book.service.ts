import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  public getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiServerUrl}/api/book/all`);
  }

  public addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiServerUrl}/api/book/add`, book)
  }

  public updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiServerUrl}/api/book/update`, book);
  }

  public deleteBook(bookId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/api/book/delete/${bookId}`);
  }




  public addBookToFavorites(bookId: number): Observable<void> {
    return this.http.post<void>(`${this.apiServerUrl}/api/recommendations/add/${bookId}`, null)
  }

  public deleteBookFromFavorites(bookId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/api/recommendations/remove/${bookId}`);
  }

  public getPersonalRecommendations(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiServerUrl}/api/recommendations/personal`);
  }

  public isBookInFavorites(bookId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiServerUrl}/api/recommendations/checkFavorite/${bookId}`);
  }



  public getBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiServerUrl}/api/book/find/${bookId}`);
  }

  public searchBooks(text: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiServerUrl}/api/book/search/${text}`);
  }

  

}
