import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../misc/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private user: User

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    let uuid = this.route.snapshot.paramMap.get('userUuid')
    this.userService.getUser(uuid).subscribe(data => this.user = data)
  }

}
