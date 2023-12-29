import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
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

  async register(
    email: string,
    password: string,
    username: string
  ): Promise<any> {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      const uid = credential.user?.uid;

      console.log('Updating profile with username:', username);
      await credential.user?.updateProfile({ displayName: username });

      console.log('Profile updated successfully');
      await this.firestore.collection('users').doc(uid).set({
        uid: uid,
        email: email,
        username: username,
        favoriteRecipes: [],
      });

      return credential;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      console.log('Successfully signed in:', user?.displayName);
      return user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
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

  private handleAuthError(error: any): Error {
    const firebaseError = error as FirebaseError;
    switch (firebaseError.code) {
      case 'auth/user-not-found':
        return new Error(
          'User not found. Please check your email and try again.'
        );
      case 'auth/wrong-password':
        return new Error('Invalid password. Please try again.');
      case 'auth/email-already-in-use':
        return new Error(
          'Email is already in use. Please use a different email.'
        );
      default:
        return new Error('Authentication failed. Please try again later.');
    }
  }
}
