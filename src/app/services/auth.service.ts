import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> =
    this.isAuthenticatedSubject.asObservable();

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState
      .pipe(
        tap((user) => {
          const isAuthenticated = !!user;
          console.log('Is authenticated:', isAuthenticated);
          this.isAuthenticatedSubject.next(isAuthenticated);
        }),
        distinctUntilChanged()
      )
      .subscribe();
  }

  register(email: string, password: string): Promise<any> {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
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
}
