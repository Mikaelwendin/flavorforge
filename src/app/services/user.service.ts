import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { Meal } from '../recipe/recipe.model';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}

  addToFavorites(userId: string, recipe: Meal): Promise<void> {
    const userRef = this.firestore.collection('users').doc(userId);

    return userRef.update({
      favoriteRecipes: firebase.firestore.FieldValue.arrayUnion(recipe),
    });
  }

  getUser(userId: string): Observable<User | undefined> {
    return this.firestore.doc<User>(`users/${userId}`).valueChanges();
  }

  updateUser(uid: string, data: Partial<User>): Promise<void> {
    return this.firestore.collection('users').doc(uid).update(data);
  }
}
