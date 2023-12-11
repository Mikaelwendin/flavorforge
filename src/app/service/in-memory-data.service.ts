import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 1, username: 'user1', password: 'password1', items: [] },
      { id: 2, username: 'user2', password: 'password2', items: [] },
    ];

    return { users };
  }
}
