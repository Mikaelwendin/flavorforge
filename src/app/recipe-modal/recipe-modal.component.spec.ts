import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeModalComponent } from './recipe-modal.component';

describe('RecipeModalComponent', () => {
  let component: RecipeModalComponent;
  let fixture: ComponentFixture<RecipeModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeModalComponent]
    });
    fixture = TestBed.createComponent(RecipeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
