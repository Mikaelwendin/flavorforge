// fake-backend.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FakeBackendService {
  private users: { username: string; password: string; items: string[] }[] = [
    { username: 'user1', password: 'password1', items: ['item1', 'item2'] },
    { username: 'user2', password: 'password2', items: ['item3', 'item4'] },
  ];

  register(username: string, password: string): Observable<boolean> {
    const userExists = this.users.some((user) => user.username === username);

    if (userExists) {
      return of(false); // Registration failed, username already exists
    }

    this.users.push({ username, password, items: [] });
    return of(true).pipe(delay(1000)); // Registration successful
  }

  login(username: string, password: string): Observable<boolean> {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      return of(true).pipe(delay(1000)); // Login successful
    } else {
      return of(false).pipe(delay(1000)); // Login failed
    }
  }

  getUsers(): { username: string; password: string; items: string[] }[] {
    return this.users;
  }
}
