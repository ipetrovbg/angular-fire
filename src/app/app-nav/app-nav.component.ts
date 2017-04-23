import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css']
})
export class AppNavComponent implements OnInit {
public user: User;
  constructor(
      private router:Router,
      private _us: UserService
    ) {}

  ngOnInit() {
     this._us.getUser().subscribe(user => this.user = user);
  }

  login() {
    this._us.login();
  }

  logout() {
     this._us.logout();
     this.router.navigate(['/']);
     
  }

}
