import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheGreatNeckComponent } from './the-great-neck.component';

describe('TheGreatNeckComponent', () => {
  let component: TheGreatNeckComponent;
  let fixture: ComponentFixture<TheGreatNeckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TheGreatNeckComponent]
    });
    fixture = TestBed.createComponent(TheGreatNeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
