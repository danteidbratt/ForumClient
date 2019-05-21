import { Component, OnInit, Input } from '@angular/core';
import { Forum } from '../misc/models';
import { ForumService } from '../services/forum.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  @Input() forum: Forum

  constructor(
    private forumService: ForumService,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  subscribe() {
    if (!this.auth.demandLogin()) {
      return
    }
    if (!this.forum.subscribed) {
      this.forumService.subscribeToForum(this.forum.uuid).subscribe(() => {
        if (!this.forum.subscribed) {
          this.forum.subscribed = true
          this.forum.subscribers++
        }
      })
    }
  }

  unsubscribe() {
    if (!this.auth.demandLogin()) {
      return
    }
    if (this.forum.subscribed) {
      this.forumService.unsubscribeToForum(this.forum.uuid).subscribe(() => {
        if (this.forum.subscribed) {
          this.forum.subscribed = false
          this.forum.subscribers--
        }
      })
    }
  }

}
