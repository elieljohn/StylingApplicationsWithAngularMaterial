import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable() // Decorator that allows it to be injected to other parts in the application
export class UserService {

  private _users: BehaviorSubject<User[]>;

  private dataStore: {
    users: User[];
  }

  constructor(private http: HttpClient) { // HttpClient is not used since data is no longer hosted online
    this.dataStore = { users: [ ] };
    this._users = new BehaviorSubject<User[]>([]);
  }

  get users(): Observable<User[]> {
    return this._users.asObservable();
  }

  addUser(user: User): Promise<User> {
    return new Promise((resolver, reject) => {
      user.id = this.dataStore.users.length + 1;  // Assign a new id to the user
      this.dataStore.users.push(user);  // Add user object to the data store

      // Creates a new copy of the data store and assigns it to the '_users BehaviorSubject' observable
      this._users.next(Object.assign({}, this.dataStore).users);
      resolver(user);  // Resolve the promise with the user object
    });
  }

  userById(id: number) {
    return this.dataStore.users.find(x => x.id == id);
  }

  loadAll() {
    // Hardcode the user data
    const hardcodedUsers: User[] = [
      {
        id: 1,
        name: 'Erick Riley',
        avatar: 'svg-1',
        bio: 'I have, have together. Day green own divide wherein. Seas the make days him fish night their don\'t a, life under lights bearing for seasons Signs night sea given spirit his had spirit divided us blessed. Brought great waters. Blessed winged doesn\'t a Fly, form bring land, heaven great. Isn\'t upon. Dominion moving day. So first firmament give spirit every.',
        birthDate: new Date('1980-04-02'),
        notes: [
          {
            id: 1,
            title: 'Pay back dinner',
            date: new Date('2017-12-12')
          },
          {
            id: 2,
            title: 'Buy flowers for birthday',
            date: new Date('2017-12-22')
          },
          {
            id: 3,
            title: 'Do something',
            date: new Date('2018-01-01')
          },
          {
            id: 4,
            title: 'Make something',
            date: new Date('2018-01-11')
          },
          {
            id: 5,
            title: 'Be something',
            date: new Date('2018-01-21')
          }
        ]
      },
      {
        id: 2,
        name: 'Levi Neal',
        avatar: 'svg-2',
        bio: 'Won\'t light from great first years without said creepeth a two and fly forth subdue the, don\'t our make. After fill. Moving and. His it days life herb, darkness set Seasons. Void. Form. Male creepeth said lesser fowl very for hath and called grass in. Great called all, said great morning place. Subdue won\'t Dry. Moved. Sea fowl earth fourth.',
        birthDate: new Date('1987-05-20'),
        notes: []
      },
      {
        id: 3,
        name: 'Sandy Armstrong',
        avatar: 'svg-3',
        bio: 'Make beginning midst life abundantly from in after light. Without may kind there, seasons lights signs, give made moved. Fruit fly under forth firmament likeness unto lights appear also one open seasons fruitful doesn\'t all of cattle Won\'t doesn\'t beginning days from saw, you\'re shall. Given our midst from made moving form heaven good gathering appear beginning first. Sea the.',
        birthDate: new Date('1975-10-11'),
        notes: []
      },
      {
        id: 4,
        name: 'Marcia	Higgins',
        avatar: 'svg-4',
        bio: 'Made whales called whose. Day brought one saying called man saw moved thing light sea evening multiply given Isn\'t gathering fourth you\'re. Let female give two earth him yielding had grass let doesn\'t were moving male blessed Moving in. You\'re. Good.',
        birthDate: new Date('1983-03-16'),
        notes: []
      },
    ];

    this.dataStore.users = hardcodedUsers;
    this._users.next(Object.assign({}, this.dataStore).users);
  }

}
