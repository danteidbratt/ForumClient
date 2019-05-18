import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../misc/models';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: Post

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
  }

  upvote() {
    if (this.post.myVote == null) {
      this.postService.voteOnPost(this.post.uuid, 'UP').subscribe(() => {
        if (this.post.myVote == null) {
          this.post.myVote = 'UP'
          this.post.score++
        }
      })
    } else if (this.post.myVote == 'UP') {
      this.deleteVote()
    }
  }

  downvote() {
    if (this.post.myVote == null) {
      this.postService.voteOnPost(this.post.uuid, 'DOWN').subscribe(() => {
        if (this.post.myVote != 'DOWN') {
          this.post.myVote = 'DOWN'
          this.post.score--
        }
      })
    } else if (this.post.myVote == 'DOWN') {
      this.deleteVote()
    }
  }

  deleteVote() {
    this.postService.deleteVoteOnPost(this.post.uuid).subscribe(() => {
      if (this.post.myVote != null) {
        this.post.score += this.post.myVote == 'UP' ? -1 : 1
        this.post.myVote = null
      }
    })
  }
}
