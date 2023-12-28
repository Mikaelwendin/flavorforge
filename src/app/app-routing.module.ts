import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayRecipesComponent } from './display-recipes/display-recipes.component';
import { FoodPlannerComponent } from './food-planner/food-planner.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { MyPageComponent } from './my-page/my-page.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth.guard';
const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'recipe/:id', component: RecipeDetailComponent },
  { path: 'recipe', component: DisplayRecipesComponent },
  { path: 'food-planner', component: FoodPlannerComponent },
  {
    path: 'my-page',
    component: MyPageComponent,
    canActivate: [AuthGuard], // TODO: Put authguard on foodplanner maybe?
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
