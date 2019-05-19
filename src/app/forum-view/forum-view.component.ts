import { Component, OnInit } from '@angular/core';
import { Forum, Post } from '../misc/models';
import { PostService } from '../services/post.service';
import { ForumService } from '../services/forum.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forum-view',
  templateUrl: './forum-view.component.html',
  styleUrls: ['./forum-view.component.scss']
})
export class ForumViewComponent implements OnInit {

  forum: Forum
  posts: Post[]
  forumUuid: string
  sortType: string

  constructor(
    private postService: PostService,
    private forumService: ForumService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.forumUuid = data.forumUuid
      this.sortType = data.sortType
      this.loadForum()
      this.loadPosts()
    })
  }

  loadForum() {
    this.forumService.getForum(this.forumUuid).subscribe(data => {
      this.forum = data
      this.forum.description = 'This is a text about the forum, it can be very long but always very interesting to read. Good bye lol.'
    })
  }

  loadPosts() {
    this.postService.getPostsByForum(this.forumUuid, this.sortType).subscribe(data => this.posts = data)
  }

}
