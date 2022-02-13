import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {
  
  constructor(  public snackBar: MatSnackBar,
    public router: Router) {}
  
  logOutUser(): void {
    localStorage.clear;
    this.snackBar.open('You have logged out', 'OK', {
      duration: 2000
    });
    this.router.navigate(['welcome']).then(() => {
      window.location.reload();
    });
  }

  ngOnInit(): void {}

}