import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedTwitterBirdComponent } from './animated-twitter-bird.component';

describe('AnimatedTwitterBirdComponent', () => {
  let component: AnimatedTwitterBirdComponent;
  let fixture: ComponentFixture<AnimatedTwitterBirdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimatedTwitterBirdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedTwitterBirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
