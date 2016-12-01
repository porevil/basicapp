import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class EventData {
  public currentUser: any;
  public eventList: any;

  constructor() {
    this.currentUser = firebase.auth().currentUser.uid;
    this.eventList = firebase.database().ref('userProfile/' + this.currentUser + '/eventList');

  }

  createEvent(eventName: string, eventDate: string, eventPrice: number, eventCost: number): any {
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
    return this.eventList;
  }

  getEventDetail(eventId): any {
    return this.eventList.child(eventId);
  }

}