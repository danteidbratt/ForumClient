import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User, AuthUser } from '../misc/models';
import { CookieService } from 'ngx-cookie-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @ViewChild('loginModal') loginModal: ElementRef
  @ViewChild('signupModal') signUpModal: ElementRef
  private createUsername: string
  private createPassword: string
  private loginUsername: string
  private loginPassword: string

  private user: AuthUser

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private modal: NgbModal
  ) { }

  ngOnInit() {
    this.authService.authUser.subscribe(data => {
      this.user = data
    })
  }

  login() {
    this.authService.login(this.loginUsername, this.loginPassword).subscribe(data => {
      this.authService.setUser(data)
    })
    this.loginUsername = ''
    this.loginPassword = ''
  }

  createUser() {
    let username = this.createUsername
    let password = this.createPassword
    this.userService.createUser(username, password).subscribe(resp =>
      this.authService.login(username, password).subscribe(data => this.authService.setUser(data))
    )
    this.createUsername = ''
    this.createPassword = ''
  }

  openLoginModal() {
    this.modal.open(this.loginModal, { centered: true })
      .result.then(
        result => {
          if (result == 'login') {
            this.login()
          }
        },
        reason => console.log('Login canceled')
      )
  }

  openSignupModal() {
    this.modal.open(this.signUpModal, { centered: true })
      .result.then(
        result => {
          if (result == 'signup') {
            this.createUser()
          }
         },
        reason => console.log('Signup canceled')
      )
  }

  logOut() {
    this.authService.logOut()
  }

}
