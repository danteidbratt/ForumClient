import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FeedComponent } from './feed/feed.component';
import { PostviewComponent } from './postview/postview.component';
import { ProfileComponent } from './profile/profile.component';
import { ForumBrowserComponent } from './forum-browser/forum-browser.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'feed/:feedFilter',
    component: FeedComponent
  },
  {
    path: 'post/:postUuid',
    component: PostviewComponent
  },
  {
    path: 'users/:userUuid',
    component: ProfileComponent
  },
  {
    path: 'forums',
    component: ForumBrowserComponent
  },
  {
    path: '',
    redirectTo: 'feed/all',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
