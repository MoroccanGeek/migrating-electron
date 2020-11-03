import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedAppNameComponent } from './animated-app-name.component';

describe('AnimatedAppNameComponent', () => {
  let component: AnimatedAppNameComponent;
  let fixture: ComponentFixture<AnimatedAppNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimatedAppNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedAppNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
