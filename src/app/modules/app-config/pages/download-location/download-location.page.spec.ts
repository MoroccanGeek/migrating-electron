import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadLocationPage } from './download-location.page';

describe('DownloadLocationPage', () => {
  let component: DownloadLocationPage;
  let fixture: ComponentFixture<DownloadLocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadLocationPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
