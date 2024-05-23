import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnthemComponent } from './anthem.component';

describe('AnthemComponent', () => {
  let component: AnthemComponent;
  let fixture: ComponentFixture<AnthemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnthemComponent]
    });
    fixture = TestBed.createComponent(AnthemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
