import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FeedComponent } from './feed/feed.component';
import { PostviewComponent } from './postview/postview.component';
import { ProfileComponent } from './profile/profile.component';
import { ForumBrowserComponent } from './forum-browser/forum-browser.component';
import { ForumComponent } from './forum/forum.component';
import { ForumViewComponent } from './forum-view/forum-view.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'feed/:filter/:sortType',
    component: FeedComponent
  },
  {
    path: 'post/:postUuid/:sortType',
    component: PostviewComponent
  },
  {
    path: 'user/:userUuid',
    component: ProfileComponent
  },
  {
    path: 'forums/:filter/:sortType',
    component: ForumBrowserComponent
  },
  {
    path: 'forum/:forumUuid/:sortType',
    component: ForumViewComponent
  },
  {
    path: '',
    redirectTo: 'feed/all/hot',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
