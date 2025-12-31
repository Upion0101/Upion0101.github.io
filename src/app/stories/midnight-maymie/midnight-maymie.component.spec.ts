import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidnightMaymieComponent } from './midnight-maymie.component';

describe('MidnightMaymieComponent', () => {
  let component: MidnightMaymieComponent;
  let fixture: ComponentFixture<MidnightMaymieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MidnightMaymieComponent]
    });
    fixture = TestBed.createComponent(MidnightMaymieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
