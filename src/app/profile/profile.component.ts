import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User, Comment, Post } from '../misc/models';
import { CommentService } from '../services/comment.service';
import { PostService } from '../services/post.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User
  userUuid: string
  posts: Post[]
  comments: Comment[]
  category: string
  submissionType: string
  sortType: string
  sortTypes = ['hot', 'top', 'new']
  categories = ['submissions', 'likes']
  submissionTypes = ['posts', 'comments']

  constructor(
    private userService: UserService,
    private commentService: CommentService,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.category = data.category
      this.submissionType = data.submissionType
      this.sortType = data.sortType
      if (this.userUuid != data.userUuid) {
        this.userUuid = data.userUuid
        this.userService.getUser(this.userUuid).subscribe(data => this.user = data)
      }
      this.loadSubmissions()
    })
  }

  setCategory(category: string) {
    this.category = category
    this.posts = null
    this.comments = null
    this.submissionType = null;
  }

  setSubmissionType(submissionType: string) {
    this.submissionType = submissionType;
    this.sortType = 'new'
    let url = `user/${this.userUuid}/${this.category}/${this.submissionType}/${this.sortType}`
    this.router.navigateByUrl(url)
  }

  setSortType(sortType: string) {
    this.sortType = sortType
    let url = `user/${this.userUuid}/${this.category}/${this.submissionType}/${this.sortType}`
    this.router.navigateByUrl(url)
  }

  loadSubmissions() {
    if (this.submissionType == 'posts') {
      this.loadPosts().subscribe(data => {
        this.posts = data
        this.comments = null
      })
    } else if (this.submissionType == 'comments') {
      this.loadComments().subscribe(data => {
        this.comments = data
        this.posts = null
      })
    }
  }

  loadPosts(): Observable<Post[]> {
    if (this.category == 'submissions') {
      return this.postService.getPostsByAuthor(this.userUuid, this.sortType.toUpperCase())
    } else if (this.category == 'likes') {
      return this.postService.getLikedPosts(this.userUuid, this.sortType.toUpperCase())
    }
  }

  loadComments(): Observable<Comment[]> {
    if (this.category == 'submissions') {
      return this.commentService.getCommentsByAuthor(this.userUuid, this.sortType.toUpperCase())
    } else if (this.category == 'likes') {
      return this.commentService.getLikedComments(this.userUuid, this.sortType.toUpperCase())
    }
  }

}
