import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../misc/models';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @ViewChild('replyModal') replyModal: ElementRef
  @Input() comment: Comment
  @Input() layer: number
  hidden: boolean = false
  replyContent: string

  constructor(
    private commentService: CommentService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private modal: NgbModal
  ) { }


  ngOnInit() {

  }

  toggleHidden() {
    this.hidden = !this.hidden
  }

  upvote() {
    if (!this.auth.demandLogin()) {
      return
    }
    if (this.comment.myVote == null) {
      this.commentService.voteOnComment(this.comment.uuid, 'UP').subscribe(() => {
        if (this.comment.myVote == null) {
          this.comment.myVote = 'UP'
          this.comment.score++
        }
      })
    } else if (this.comment.myVote == 'UP') {
      this.deleteVote()
    }
  }

  downvote() {
    if (!this.auth.demandLogin()) {
      return
    }
    if (this.comment.myVote == null) {
      this.commentService.voteOnComment(this.comment.uuid, 'DOWN').subscribe(() => {
        if (this.comment.myVote != 'DOWN') {
          this.comment.myVote = 'DOWN'
          this.comment.score--
        }
      })
    } else if (this.comment.myVote == 'DOWN') {
      this.deleteVote()
    }
  }

  openReplyModal() {
    if (!this.auth.demandLogin()) {
      return
    }
    this.modal.open(this.replyModal, { centered: true })
      .result.then(
        result => {
          if (result == 'send') {
            this.sendReply()
          }
        }
      )
  }

  deleteVote() {
    this.commentService.deleteVoteOnComment(this.comment.uuid).subscribe(() => {
      if (this.comment.myVote != null) {
        this.comment.score += this.comment.myVote == 'UP' ? -1 : 1
        this.comment.myVote = null
      }
    })
  }

  sendReply() {
    let content = this.replyContent.trim()
    if (content.length > 0) {
      let parentUuid = this.comment.uuid
      let postUuid = this.route.snapshot.paramMap.get('postUuid')
      this.commentService.createComment(postUuid, parentUuid, content).subscribe(data => {
        this.comment.children.unshift(data)
      })
    }
    this.replyContent = '';
  }

}
