import { Component, OnInit } from '@angular/core';
import { UserCabinetService } from './user-cabinet.service';

@Component({
  selector: 'app-user-cabinet',
  templateUrl: './user-cabinet.component.html',
  styleUrls: ['./user-cabinet.component.css']
})
export class UserCabinetComponent implements OnInit {
  currentPassword: string = '';
  newPassword: string = '';
  
  constructor(private userCabinetService: UserCabinetService) { }

  ngOnInit(): void {
  }

  changePassword(): void {
    this.userCabinetService.changePassword(this.currentPassword, this.newPassword)
      .subscribe(
        response => {
          console.log(response);
          alert("Password changed successfully!");
        },
        error => {
          console.error(error);
          alert("Unable to change password.");
        }
      );
    this.currentPassword = '';
    this.newPassword = '';
  }

  deleteUserAccount(): void {
    this.userCabinetService.deleteAccount()
      .subscribe(
        response => {
          console.log(response);
          alert("Account deleted successfully!");
          // here you may want to redirect the user to the login page or home page
          // using Router service
        },
        error => {
          console.error(error);
          alert("Unable to delete account.");
        }
      );
  }
}
