import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingTubeTreatsComponent } from './missing-tube-treats.component';

describe('MissingTubeTreatsComponent', () => {
  let component: MissingTubeTreatsComponent;
  let fixture: ComponentFixture<MissingTubeTreatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MissingTubeTreatsComponent]
    });
    fixture = TestBed.createComponent(MissingTubeTreatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
