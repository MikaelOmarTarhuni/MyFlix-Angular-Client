import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service'

@Component({
  selector: 'app-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  styleUrls: ['./user-profile-update.component.scss']
})

export class UserProfileUpdateComponent implements OnInit {

  user: any = {};
  Username = localStorage.getItem('user');

  @Input() userProfile = {
    Username: this.user.Username,
    Password: this.user.Password,
    Email: this.user.Email,
    Birthday: this.user.Birthday,
  };

  constructor(
    public fetchApiData:FetchApiDataService,
    public dialogRef: MatDialogRef<UserProfileUpdateComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.user = resp;
    });
  }
  
  editUser(): void {
    this.fetchApiData
      .EditUserInfo(this.Username, this.userProfile)
      .subscribe((resp) => {
        this.dialogRef.close();

        localStorage.setItem('Username', this.userProfile.Username);
        localStorage.setItem('Password', this.userProfile.Password);

        this.snackBar.open('Your profile was updated successfully!', 'OK', {
          duration: 4000,
        });
        setTimeout(() => {
          window.location.reload();
        });
      });
  }
}