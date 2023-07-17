import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-favorites-button',
  templateUrl: './favorites-button.component.html',
  styleUrls: ['./favorites-button.component.scss']
})
export class FavoritesButtonComponent {
  @Input() isFavorite!: boolean;

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
}
