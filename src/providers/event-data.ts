import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class EventData {
  public currentUser: any;
  public eventList: any;

  constructor() {


    this.authenUser()
    console.log('EventData current user ' + this.currentUser)
    this.eventList = firebase.database().ref('userProfile/' + this.currentUser + '/eventList');
    console.log('EventData eventList ' + this.eventList)

  }

  createEvent(eventName: string, eventDate: string, eventPrice: number, eventCost: number): any {

    //this.authenUser()
    return this.eventList.push({
      name: eventName,
      date: eventDate,
      price: eventPrice,
      cost: eventCost
    }).then(newEvent => {
      this.eventList.child(newEvent.key).child('id').set(newEvent.key);
    });

  }

  addGuest(guestName, eventId, eventPrice): any {
    console.log('addGuest on UID ' + this.currentUser.uid);
    return this.eventList.child(eventId).child('guestList').push({
      guestName: guestName
    }).then(() => {
      this.eventList.child(eventId).child('revenue').transaction((revenue) => {
        revenue += eventPrice;
        return event;
      });
    });
  }

  getEventList(): any {
    console.log('getEventList');
    return this.eventList;
  }

  getEventDetail(eventId): any {
    console.log('EventData eventId ' + eventId);
    return this.eventList.child(eventId);
  }

  authenUser() {
    console.log('authenUser');
    this.currentUser = firebase.auth().currentUser.uid;

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('EventData onAuthStateChanged UID get new eventList');
        this.currentUser = firebase.auth().currentUser.uid;
        this.eventList = firebase.database().ref('userProfile/' + this.currentUser + '/eventList');
      } else {
        console.log('EventData onAuthStateChanged false' + this.currentUser);
        this.currentUser = firebase.auth().signOut;
      }
    }, (eror) => {
      console.log('EventData onAuthStateChanged error');
    });
  }

}