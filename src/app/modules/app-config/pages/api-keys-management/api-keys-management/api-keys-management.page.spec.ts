import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiKeysManagementPage } from './api-keys-management.page';

describe('ApiKeysManagementPage', () => {
  let component: ApiKeysManagementPage;
  let fixture: ComponentFixture<ApiKeysManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiKeysManagementPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiKeysManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
