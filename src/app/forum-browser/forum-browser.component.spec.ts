import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumBrowserComponent } from './forum-browser.component';

describe('ForumBrowserComponent', () => {
  let component: ForumBrowserComponent;
  let fixture: ComponentFixture<ForumBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
