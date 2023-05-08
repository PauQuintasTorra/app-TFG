import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReverseBoxTypeDialogComponent } from './reverse-box-type-dialog.component';

describe('ReverseBoxTypeDialogComponent', () => {
  let component: ReverseBoxTypeDialogComponent;
  let fixture: ComponentFixture<ReverseBoxTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReverseBoxTypeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReverseBoxTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
