import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PostService } from '../services/post.service';
import { CommentService } from '../services/comment.service';
import { Post, Comment } from '../misc/models';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-postview',
  templateUrl: './postview.component.html',
  styleUrls: ['./postview.component.scss']
})
export class PostviewComponent implements OnInit {

  @ViewChild('replyModal') replyModal: ElementRef
  sortTypes: string[] = ['hot', 'top', 'new']
  sortType: string
  postUuid: string
  post: Post
  comments: Comment[]
  reply: string

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NgbModal
  ) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.postUuid = data.postUuid
      this.sortType = data.sortType
      this.postService.getPost(this.postUuid).subscribe(data => this.post = data)
      this.commentService.getCommentsByPost(this.postUuid, this.sortType).subscribe(data => this.comments = data)
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
      this.commentService.createComment(this.postUuid, this.postUuid, this.reply).subscribe(data =>
        this.comments.unshift(data)
      )
    }
    this.reply = ''
  }

  setSortType(type: string) {
    this.router.navigateByUrl(`post/${this.postUuid}/${type}`)
  }

}
