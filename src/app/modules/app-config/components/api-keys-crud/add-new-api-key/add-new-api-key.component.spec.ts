import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewApiKeyComponent } from './add-new-api-key.component';

describe('AddNewApiKeyComponent', () => {
  let component: AddNewApiKeyComponent;
  let fixture: ComponentFixture<AddNewApiKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewApiKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewApiKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
