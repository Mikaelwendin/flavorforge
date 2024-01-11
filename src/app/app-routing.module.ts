import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DisplayRecipesComponent } from './display-recipes/display-recipes.component';
import { FoodPlannerComponent } from './food-planner/food-planner.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { MyPageComponent } from './my-page/my-page.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: LandingComponent, data: { animation: 'landing' } },
  { path: 'login', component: LoginComponent, data: { animation: 'login' } },
  {
    path: 'register',
    component: RegisterComponent,
    data: { animation: 'register' },
  },
  {
    path: 'landing',
    component: LandingComponent,
    data: { animation: 'landing' },
  },
  {
    path: 'recipe/:id',
    component: RecipeDetailComponent,
    data: { animation: 'recipe-detail' },
  },
  {
    path: 'recipe',
    component: DisplayRecipesComponent,
    data: { animation: 'display-recipes' },
  },
  {
    path: 'food-planner',
    component: FoodPlannerComponent,
    data: { animation: 'food-planner' },
  },
  {
    path: 'my-page',
    component: MyPageComponent,
    canActivate: [AuthGuard],
    data: { animation: 'my-page' },
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { animation: 'about' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
