import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { PostComponent } from './post/post.component';
import { FeedComponent } from './feed/feed.component';
import { PostviewComponent } from './postview/postview.component';
import { CommentComponent } from './comment/comment.component';
import { ProfileComponent } from './profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ForumBrowserComponent } from './forum-browser/forum-browser.component';
import { ForumComponent } from './forum/forum.component';
import { ForumViewComponent } from './forum-view/forum-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    PostComponent,
    FeedComponent,
    PostviewComponent,
    CommentComponent,
    ProfileComponent,
    ForumBrowserComponent,
    ForumComponent,
    ForumViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
