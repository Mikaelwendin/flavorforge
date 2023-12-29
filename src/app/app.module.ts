import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { FirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayRecipesComponent } from './display-recipes/display-recipes.component';
import { FoodPlannerComponent } from './food-planner/food-planner.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { MyPageComponent } from './my-page/my-page.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeModalComponent } from './recipe-modal/recipe-modal.component';
import { RegisterComponent } from './register/register.component';
import { UserEffects } from './user/user.effects';
import { userReducer } from './user/user.reducer';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    RecipeDetailComponent,
    MyPageComponent,
    DisplayRecipesComponent,
    RecipeModalComponent,
    FoodPlannerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FirestoreModule,
    FormsModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreModule.forRoot({ user: userReducer }),
    EffectsModule.forRoot([UserEffects]),
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
