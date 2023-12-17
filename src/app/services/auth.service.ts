import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> =
    this.isAuthenticatedSubject.asObservable();
  private currentUserSubject =
    new BehaviorSubject<firebase.default.User | null>(null);
  currentUser$: Observable<firebase.default.User | null> =
    this.currentUserSubject.asObservable();

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.afAuth.authState
      .pipe(
        tap((user) => {
          const isAuthenticated = !!user;
          this.isAuthenticatedSubject.next(isAuthenticated);
          this.currentUserSubject.next(user);
        })
      )
      .subscribe();
  }

  register(email: string, password: string, username: string): Promise<any> {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((credential) => {
        const uid = credential.user?.uid;
        console.log('Updating profile with username:', username);
        return credential.user
          ?.updateProfile({ displayName: username })
          .then(() => {
            console.log('Profile updated successfully');
            return this.firestore.collection('users').doc(uid).set({
              uid: uid,
              email: email,
              username: username,
              favoriteRecipes: [],
            });
          })
          .then(() => {
            return credential;
          });
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        throw error;
      });
  }

  login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<any> {
    return this.afAuth.signOut().then(() => {
      this.isAuthenticatedSubject.next(false);
    });
  }
  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }
  getCurrentUser(): firebase.default.User | null {
    return this.currentUserSubject.value;
  }
}
