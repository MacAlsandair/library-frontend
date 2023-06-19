import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { BookCardComponent } from './book-card/book-card.component';
import { BookEditModalComponent } from './book-edit-modal/book-edit-modal.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: '', redirectTo: 'books', pathMatch: 'full'},
  {path: 'books', component: BookCardComponent, canActivate: [AuthGuard], data: {role: 'ROLE_USER'}},
  {path: 'book/:id', component: BookEditModalComponent, canActivate: [AuthGuard], data: {role: 'ROLE_USER'}},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: 'book-card'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
