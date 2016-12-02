import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class EventData {
  public currentUser: any;
  public eventList: any;
  public profilePictureRef: any;

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
      price: eventPrice * 1,
      cost: eventCost * 1,
      revenue: eventCost * -1
    }).then(newEvent => {
      this.eventList.child(newEvent.key).child('id').set(newEvent.key);
    });

  }

  addGuest(guestName, eventId, eventPrice, guestPicture = null): any {
    console.log('addGuest on UID ' + this.currentUser.uid);
    return this.eventList.child(eventId).child('guestList').push({
      guestName: guestName
    }).then((newGuest) => {
      this.eventList.child(eventId).transaction( (event) => {
        event.revenue += eventPrice;
        return event;
      });

      if (guestPicture != null) {
        this.profilePictureRef.child(newGuest.key).child('profilePicture.png')
      .putString(guestPicture, 'base64', {contentType: 'image/png'})
        .then((savedPicture) => {
          this.eventList.child(eventId).child('guestList').child(newGuest.key).child('profilePicture')
          .set(savedPicture.downloadURL);
        });
      }
      

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
        console.log('EventData onAuthStateChanged get new eventList');
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