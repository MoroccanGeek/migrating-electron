import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigErrorModalComponent } from './config-error-modal.component';

describe('ConfigErrorModalComponent', () => {
  let component: ConfigErrorModalComponent;
  let fixture: ComponentFixture<ConfigErrorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigErrorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigErrorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
