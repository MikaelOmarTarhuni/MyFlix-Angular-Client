import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserProfileUpdateComponent } from '../user-profile-update/user-profile-update.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { FetchApiDataService, User } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
 
  user: any = {};
  Username = localStorage.getItem('user');
  favourite: any[] = [];;


  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
    ) {}
   

  ngOnInit(): void {
    this.getUser();
    this.getFavoriteMovies();
  }

  getUser(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUser(user).subscribe((resp: User) => {
        this.user = resp;

        console.log(this.user);
      });
    }
  }
 
  getFavoriteMovies(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favourite = resp.FavoriteMovies;
      console.log(this.favourite);
      return this.favourite;
    });
  }
  
  removeFavorites(id: string, title: string): void {
    this.fetchApiData.removeFavorite(id).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(`${title} has been removed from your favorites!`, 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    });
  }

  editUserData(): void {
    this.dialog.open(UserProfileUpdateComponent, {
      width: '280px'
    });
  }
  
  deleteUser(): void {
    this.fetchApiData.deleteUser(this.Username).subscribe(() => {
      this.snackBar.open(`${this.Username} has been removed!`, 'OK', {
        duration: 4000,
      });
      localStorage.clear();
    });
    this.router.navigate(['welcome']);
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { name: name, description: description },
      width: '300px',
    });
  }

  openDirectorDialog(
    name: string,
    bio: string,
    birth: string,
    death: string
  ): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { name: name, bio: bio, birth: birth, death: death },
      width: '300px',
    });
  }
}