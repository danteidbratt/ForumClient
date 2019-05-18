import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { CommentService } from '../services/comment.service';
import { Post } from '../misc/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-postview',
  templateUrl: './postview.component.html',
  styleUrls: ['./postview.component.scss']
})
export class PostviewComponent implements OnInit {

  post: Post
  comments: Comment[]
  uuid: string

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    let postUuid = this.route.snapshot.paramMap.get('postUuid')
    this.uuid = postUuid
    this.postService.getPost(postUuid).subscribe(data => this.post = data)
    this.commentService.getCommentsByPost(postUuid).subscribe(data => {
      this.comments = data
    })
  }

}
