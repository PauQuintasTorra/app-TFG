import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxTypeDialogComponent } from './box-type-dialog.component';

describe('BoxTypeDialogComponent', () => {
  let component: BoxTypeDialogComponent;
  let fixture: ComponentFixture<BoxTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxTypeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
