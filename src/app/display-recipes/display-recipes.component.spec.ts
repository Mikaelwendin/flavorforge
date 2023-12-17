import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayRecipesComponent } from './display-recipes.component';

describe('DisplayRecipesComponent', () => {
  let component: DisplayRecipesComponent;
  let fixture: ComponentFixture<DisplayRecipesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayRecipesComponent]
    });
    fixture = TestBed.createComponent(DisplayRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
