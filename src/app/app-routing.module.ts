import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { BookCardComponent } from './book-card/book-card.component';
import { BookEditModalComponent } from './book-edit-modal/book-edit-modal.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { BookDetailsComponent } from './book-details/book-details.component';

const routes: Routes = [
  {path: '', redirectTo: 'books', pathMatch: 'full'},
  {path: 'books', component: BookCardComponent, canActivate: [AuthGuard], data: {role: 'USER'}},
  {path: 'book/:id', component: BookEditModalComponent, canActivate: [AuthGuard], data: {role: 'USER'}},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: SignupComponent},
  {path: '**', redirectTo: 'book-card'},
  { path: 'book-details/:id', component: BookDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
