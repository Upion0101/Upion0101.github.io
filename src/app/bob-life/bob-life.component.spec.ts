import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BobLifeComponent } from './bob-life.component';

describe('BobLifeComponent', () => {
  let component: BobLifeComponent;
  let fixture: ComponentFixture<BobLifeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BobLifeComponent]
    });
    fixture = TestBed.createComponent(BobLifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
