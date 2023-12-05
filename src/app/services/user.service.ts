import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private afs: AngularFirestore) {}

  getUserData(userId: string): Observable<any> {
    return this.afs.doc(`users/${userId}`).valueChanges();
  }

  updateUserData(userId: string, data: any): Promise<void> {
    return this.afs.doc(`users/${userId}`).set(data, { merge: true });
  }
}
