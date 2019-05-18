import { Component, OnInit, Input } from '@angular/core';
import { Forum } from '../misc/models';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  @Input() forum: Forum

  constructor() { }

  ngOnInit() {
  }

}
