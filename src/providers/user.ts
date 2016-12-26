import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the User provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class User {

  constructor(public storage: Storage) {
    console.log('Hello User Provider');
  }

  getData() {
    let users:any;
    users = this.storage.get('users');
    //let userData = JSON.parse(users);
    console.log('getData users '+users)
    return users;
  }

  remove(){
    this.storage.remove('users');
  }
  save(email,passwd): void {

    this.storage.set('users', {
      email: email,
      password: passwd
    });
  }

}
  