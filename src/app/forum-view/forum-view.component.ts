import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Forum, Post } from '../misc/models';
import { PostService } from '../services/post.service';
import { ForumService } from '../services/forum.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-forum-view',
  templateUrl: './forum-view.component.html',
  styleUrls: ['./forum-view.component.scss']
})
export class ForumViewComponent implements OnInit {

  @ViewChild('submitPostModal') submitPostModal: ElementRef
  forum: Forum
  posts: Post[] = []
  sortTypes = ['hot', 'top', 'new']
  forumUuid: string
  sortType: string
  submissionTitle: string
  submissionContent: string

  constructor(
    private postService: PostService,
    private forumService: ForumService,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NgbModal
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
    })
  }

  loadPosts() {
    this.postService.getPostsByForum(this.forumUuid, this.sortType.toUpperCase()).subscribe(data => this.posts = data)
  }

  setSortType(type: string) {
    this.router.navigateByUrl(`forum/${this.forumUuid}/${type}`)
  }

  subscribe() {
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
    if (this.forum.subscribed) {
      this.forumService.unsubscribeToForum(this.forum.uuid).subscribe(() => {
        if (this.forum.subscribed) {
          this.forum.subscribed = false
          this.forum.subscribers--
        }
      })
    }
  }

  openSubmitPostModal() {
    this.modal.open(this.submitPostModal, { centered: true })
      .result.then(
        result => {
          if (result == 'submit') {
            this.submitPost()
          }
        },
        reason => console.log('Canceled post submission')
      )
  }

  submitPost() {
    if (this.submissionTitle && this.submissionContent) {
      this.submissionTitle = this.submissionTitle.trim()
      this.submissionContent = this.submissionContent.trim()
      if (this.submissionTitle.length > 0 && this.submissionContent.length > 0) {
        this.postService.submitPost(this.forumUuid, this.submissionTitle, this.submissionContent).subscribe(data => 
          this.posts.unshift(data)
        )
      }
    }
    this.submissionTitle = null
    this.submissionContent = null
  }

}
