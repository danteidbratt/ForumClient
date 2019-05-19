import { Component, OnInit } from '@angular/core';
import { ForumService } from '../services/forum.service';
import { Forum } from '../misc/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forum-browser',
  templateUrl: './forum-browser.component.html',
  styleUrls: ['./forum-browser.component.scss']
})
export class ForumBrowserComponent implements OnInit {

  forums: Forum[]
  sortTypes = ['hot', 'top', 'new']
  filterTypes = ['all', 'subs']
  sort: string
  filter: string

  constructor(
    private forumService: ForumService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.sort = this.route.snapshot.paramMap.get('sortType')
    this.filter = this.route.snapshot.paramMap.get('filter')
    this.route.params.subscribe(data => {
      this.sort = data.sortType
      this.filter = data.filter
      this.loadForums()
    })
  }

  loadForums() {
    if (this.filter == 'all') {
      this.forumService.getAllForums(this.sort).subscribe(data => 
        this.forums = data
      )
    } else if (this.filter == 'subs') {
      this.forumService.getSubscribedForums(this.sort).subscribe(data => 
        this.forums = data
      )
    }
  }

  setSortType(type: string) {
    this.router.navigateByUrl(`forums/${this.filter}/${type}`)
  }

  setFilter(type: string) {
    this.router.navigateByUrl(`forums/${type}/${this.sort}`)
  }

  navigateToPosts() {
    this.router.navigateByUrl('feed/all/hot')
  }

}
