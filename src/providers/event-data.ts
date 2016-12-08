import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class EventData {
  public currentUser: any;
  public eventList: any;
  public profilePictureRef: any;
  public eventDetailList: any;

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

  addActivity(eventId, dateKey,activity, time): any {
    console.log('addActivity on UID ' + this.currentUser.uid+' update on dateKey '+dateKey);
    return this.eventList.child(eventId).child('activityList').child('dateList').child(dateKey).update({
      activity: activity,
      time: time
    }).then((newActitity) => {
      this.eventList.child(eventId).transaction((event) => {
        //event.time = time;
        return event;
      });

    });
  }

  addFirstActivity(eventId): any {
    console.log('addFirstActivity on UID ' + this.currentUser.uid);
    return this.eventList.child(eventId).child('activityList').child('dateList').push({
      day: 1,
    }).then((newActitity) => {
      //this.eventList.child(eventId).child('activityList').child('dateList').child('id').set(newActitity.key);
      console.log('add child of activityList with key : ' + newActitity.key);
      return newActitity.key;
    });
    
  }

  getEventList(): any {
    console.log('getEventList');
    return this.eventList;
  }

  getEventDetail(eventId): any {
    console.log('getEventDetail eventId ' + eventId);
    return this.eventList.child(eventId);
  }

  getEventDetailList(eventId): any {
    console.log('getEventDetailList eventId ' + eventId);
    return this.eventList.child(eventId).child('activityList').child('dateList');
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