import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User, AuthUser } from '../misc/models';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  private createUsername: string
  private createPassword: string
  private loginUsername: string
  private loginPassword: string

  private user: AuthUser

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.authService.authUser.subscribe(data => {
      this.user = data
    })
  }

  login() {
    let username = this.loginUsername;
    let password = this.loginPassword;
    this.loginUsername = ''
    this.loginPassword = ''
    this.authService.login(username, password).subscribe(data => {
      this.authService.setUser(data)
    })
  }

  createUser() {
    this.userService.createUser(this.createUsername, this.createPassword).subscribe(resp =>
      console.log(resp)
    )
  }

  logOut() {
    this.authService.logOut()
  }

}
