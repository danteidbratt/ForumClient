import { Component, OnInit } from '@angular/core';
import { Post } from '../misc/models';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  private posts: Post[]

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getAllPosts().subscribe(resp => {
      this.posts = resp
    })
  }

}
