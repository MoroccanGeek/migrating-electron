import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteApiKeyComponent } from './delete-api-key.component';

describe('DeleteApiKeyComponent', () => {
  let component: DeleteApiKeyComponent;
  let fixture: ComponentFixture<DeleteApiKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteApiKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteApiKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
