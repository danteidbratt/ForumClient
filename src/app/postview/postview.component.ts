import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PostService } from '../services/post.service';
import { CommentService } from '../services/comment.service';
import { Post, Comment } from '../misc/models';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-postview',
  templateUrl: './postview.component.html',
  styleUrls: ['./postview.component.scss']
})
export class PostviewComponent implements OnInit {

  @ViewChild('replyModal') replyModal: ElementRef
  post: Post
  comments: Comment[]
  reply: string

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private modal: NgbModal
  ) { }

  ngOnInit() {
    let postUuid = this.route.snapshot.paramMap.get('postUuid')
    this.postService.getPost(postUuid).subscribe(data => this.post = data)
    this.commentService.getCommentsByPost(postUuid).subscribe(data => {
      this.comments = data
    })
  }

  openReplyModal() {
    this.modal.open(this.replyModal, { centered: true })
      .result
      .then(
        result => {
          if (result = 'send') {
            this.sendReply()
          }
        },
        reason => this.reply = ''
      )
  }

  sendReply() {
    this.reply = this.reply.trim()
    if (this.reply.length > 0) {
      this.commentService.createComment(this.post.uuid, this.post.uuid, this.reply).subscribe(data =>
        this.comments.unshift(data)
      )
    }
    this.reply = ''
  }

}
