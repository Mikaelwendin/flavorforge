import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserCredential } from 'firebase/auth';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import * as UserActions from './user.actions';
import { User } from './user.model';

@Injectable()
export class UserEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      switchMap((action) =>
        from(this.authService.login(action.email, action.password)).pipe(
          switchMap((userCredential: UserCredential) => {
            return this.firestore
              .collection('users')
              .doc(userCredential.user?.uid || '')
              .get();
          }),
          map((userDoc) => {
            interface UserData {
              email: string;
              username: string;
              items: [];
            }
            const userData: UserData = userDoc.data() as UserData;

            const user: User = {
              uid: userDoc.id,
              email: userData.email || '',
              username: userData.username || '',
              favoriteRecipes: userData.items || [],
            };
            return UserActions.loginSuccess({ user });
          }),
          catchError((error) => of(UserActions.loginFailure({ error })))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}
}
