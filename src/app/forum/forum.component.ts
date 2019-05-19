import { Component, OnInit, Input } from '@angular/core';
import { Forum } from '../misc/models';
import { ForumService } from '../services/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  @Input() forum: Forum

  constructor(private forumService: ForumService) { }

  ngOnInit() {
  }

  subscribe() {
    if (!this.forum.subscribed) {
      console.log('ja')
      this.forumService.subscribeToForum(this.forum.uuid).subscribe(() => {
        if (!this.forum.subscribed) {
          this.forum.subscribed = true
          this.forum.subscribers++
        }
      })
    }
  }

  unsubscribe() {
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
