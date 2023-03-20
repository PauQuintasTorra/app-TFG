import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetsCreateComponent } from './lets-create.component';

describe('LetsCreateComponent', () => {
  let component: LetsCreateComponent;
  let fixture: ComponentFixture<LetsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetsCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LetsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
