import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SearchService {
  private searchSource = new Subject<string>();

  searchText$ = this.searchSource.asObservable();

  announceSearch(text: string) {
    this.searchSource.next(text);
  }
}
