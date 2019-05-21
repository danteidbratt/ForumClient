import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { AuthUser } from '../misc/models';
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
  private authUser: AuthUser

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private modal: NgbModal
  ) { }

  ngOnInit() {
    this.auth.user.subscribe(data => {
      this.authUser = data
    })
    this.auth.loginTrigger.subscribe(() => this.openLoginModal())
  }

  login() {
    this.auth.login(this.loginUsername, this.loginPassword).subscribe(data => {
      this.auth.setUser(data)
    })
  }

  createUser() {
    let username = this.createUsername
    let password = this.createPassword
    this.userService.createUser(username, password).subscribe(resp =>
      this.auth.login(username, password).subscribe(data => this.auth.setUser(data))
    )
  }

  openLoginModal() {
    this.modal.open(this.loginModal, { centered: true })
      .result.then(
        result => {
          if (result == 'login') {
            this.login()
          } else if (result == 'signup') {
            this.openSignupModal()
          }
        },
        () => { }
      ).then(() => {
        this.loginUsername = ''
        this.loginPassword = ''
      })
  }

  openSignupModal() {
    this.modal.open(this.signUpModal, { centered: true })
      .result.then(
        result => {
          if (result == 'signup') {
            this.createUser()
          } else if (result == 'login') {
            this.openLoginModal()
          }
        },
        () => { }
      ).then(() => {
        this.createUsername = ''
        this.createPassword = ''
      })
  }

  logOut() {
    this.auth.logOut()
  }

}
