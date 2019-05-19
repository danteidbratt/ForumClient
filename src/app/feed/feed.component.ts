import { Component, OnInit } from '@angular/core';
import { Post } from '../misc/models';
import { PostService } from '../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  posts: Post[]
  sortTypes = ['hot', 'top', 'new']
  filterTypes = ['all', 'subs']
  sortType: string
  filter: string

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.sortType = data.sortType
      this.filter = data.filter
      this.loadPosts()
    })
  }

  loadPosts() {
    if (this.filter == 'all') {
      this.postService.getAllPosts(this.sortType.toUpperCase()).subscribe(resp => {
        this.posts = resp
      })
    } else if (this.filter == 'subs') {
      this.postService.getSubscribedPosts(this.sortType.toUpperCase()).subscribe(resp => {
        this.posts = resp
      })
    }
  }

  setSortType(type: string) {
    this.router.navigateByUrl(`feed/${this.filter}/${type}`)
  }

  setFilter(type: string) {
    this.router.navigateByUrl(`feed/${type}/${this.sortType}`)
  }

  navigateToForums() {
    this.router.navigateByUrl('forums/all/hot')
  }

}
