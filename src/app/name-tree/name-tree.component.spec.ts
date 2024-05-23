import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameTreeComponent } from './name-tree.component';

describe('NameTreeComponent', () => {
  let component: NameTreeComponent;
  let fixture: ComponentFixture<NameTreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NameTreeComponent]
    });
    fixture = TestBed.createComponent(NameTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
