import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretBlogComponent } from './secret-blog.component';

describe('SecretBlogComponent', () => {
  let component: SecretBlogComponent;
  let fixture: ComponentFixture<SecretBlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecretBlogComponent]
    });
    fixture = TestBed.createComponent(SecretBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
