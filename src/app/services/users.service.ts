import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UsersService {
  private user = new BehaviorSubject<string>('Sathish');
  cast = this.user.asObservable();

  constructor() { }

  editUser(newUser){
    this.user.next(newUser);
  }

}
