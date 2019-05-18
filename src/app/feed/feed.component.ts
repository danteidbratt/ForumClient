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
  sort: string
  filter: string

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.sort = this.route.snapshot.paramMap.get('sort')
    this.filter = this.route.snapshot.paramMap.get('filter')
    this.route.params.subscribe(data => {
      this.sort = data.sort
      this.filter = data.filter
      this.loadPosts()
    })
    this.loadPosts()
  }

  loadPosts() {
    if (this.filter == 'all') {
      this.postService.getAllPosts(this.sort.toUpperCase()).subscribe(resp => {
        this.posts = resp
      })
    } else if (this.filter == 'subs') {
      this.postService.getSubscribedPosts(this.sort.toUpperCase()).subscribe(resp => {
        this.posts = resp
      })
    }
  }

  setSortType(type: string) {
    this.router.navigateByUrl(`feed/${this.filter}/${type}`)
    this.loadPosts()
  }

  setFilter(type: string) {
    this.router.navigateByUrl(`feed/${type}/${this.sort}`)
    this.loadPosts()
  }

  navigateToForums() {
    this.router.navigateByUrl('forums/all/hot')
  }

}
