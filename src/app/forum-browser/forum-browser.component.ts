import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ForumService } from '../services/forum.service';
import { Forum } from '../misc/models';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-forum-browser',
  templateUrl: './forum-browser.component.html',
  styleUrls: ['./forum-browser.component.scss']
})
export class ForumBrowserComponent implements OnInit {

  @ViewChild('createForumModal') createForumModal: ElementRef
  forums: Forum[]
  sortTypes = ['hot', 'top', 'new']
  filterTypes = ['all', 'subs']
  sort: string
  filter: string
  newName: string
  newDescription: string

  constructor(
    private forumService: ForumService,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NgbModal
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
      this.forumService.getAllForums(this.sort.toUpperCase()).subscribe(data =>
        this.forums = data
      )
    } else if (this.filter == 'subs') {
      this.forumService.getSubscribedForums(this.sort.toUpperCase()).subscribe(data =>
        this.forums = data
      )
    }
  }

  openCreateForumModal() {
    this.modal.open(this.createForumModal, { centered: true })
      .result.then(
        result => {
          if (result == 'create') {
            this.createForum()
          }
        },
        reason => {
          console.log('Canceled forum creation')
        }
      )
  }

  createForum() {
    if (this.newName && this.newDescription) {
      this.newName = this.newName.trim()
      this.newDescription = this.newDescription.trim()
      if (this.newName.length > 0 && this.newDescription.length > 0) {
        this.forumService.createForum(this.newName, this.newDescription).subscribe(data => 
          this.forums.unshift(data)
        )
      }
    }
    this.newName = null
    this.newDescription = null
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
