import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManagementPage } from './project-management.page';

describe('ProjectManagementPage', () => {
  let component: ProjectManagementPage;
  let fixture: ComponentFixture<ProjectManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectManagementPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
