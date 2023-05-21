import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadFromJsonFormatComponent } from './download-from-json-format.component';

describe('DownloadFromJsonFormatComponent', () => {
  let component: DownloadFromJsonFormatComponent;
  let fixture: ComponentFixture<DownloadFromJsonFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadFromJsonFormatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadFromJsonFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
