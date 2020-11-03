import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountManagementPage } from './account-management.page';

describe('AccountManagementPage', () => {
  let component: AccountManagementPage;
  let fixture: ComponentFixture<AccountManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountManagementPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
