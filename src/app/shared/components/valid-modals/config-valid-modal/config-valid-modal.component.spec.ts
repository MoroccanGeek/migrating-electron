import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigValidModalComponent } from './config-valid-modal.component';

describe('ConfigValidModalComponent', () => {
  let component: ConfigValidModalComponent;
  let fixture: ComponentFixture<ConfigValidModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigValidModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigValidModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
