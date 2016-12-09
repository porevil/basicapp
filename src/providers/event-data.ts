import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class EventData {
  public currentUser: any;
  public journeyList: any;
  public profilePictureRef: any;
  public eventDetailList: any;

  constructor() {


    this.authenUser()
    console.log('EventData current user ' + this.currentUser)
    this.journeyList = firebase.database().ref('userProfile/' + this.currentUser + '/journeys');
    console.log('EventData journeyList ' + this.journeyList)

  }
createJourney(event_name: string, from_location: string, to_location: string,
   start_date: string, end_date: string){

    return this.journeyList.push({
      event_name: event_name,
      from_location: from_location,
      to_location: to_location,
      start_date: start_date,
      end_date: end_date
    }).then(newEvent => {
      this.journeyList.child(newEvent.key).child('id').set(newEvent.key);
    });

  }

  updateActivity(journey_id, dateKey, activity, time): any {
    console.log('updateActivity on UID ' + this.currentUser.uid + ' update on dateKey ' + dateKey);
    return this.journeyList.child(journey_id).child('day_plans').child('plans').child(dateKey).update({
      activity: activity,
      time: time
    }).then((newActitity) => {
      this.journeyList.child(journey_id).transaction((event) => {
        //event.time = time;
        return event;
      });

    });
  }


  addActivity(journey_id, dateKey, activity, time): any {
    console.log('addActivity on UID ' + this.currentUser.uid + ' update on dateKey ' + dateKey);
    return this.journeyList.child(journey_id).child('day_plans').child('plans').child(dateKey).child('activities').push({
      activity: activity,
      time: time
    }).then((newActitity) => {
      this.journeyList.child(journey_id).transaction((event) => {
        //event.time = time;
        return event;
      });

    });
  }

  addFirstActivity(journey_id): any {
    console.log('addFirstActivity on UID ' + this.currentUser.uid);
    return this.journeyList.child(journey_id).child('day_plans').child('plans').push({
      day: 1,
    }).then((newActitity) => {
      this.journeyList.child(journey_id).child('day_plans').child('plans').child(newActitity.key).child('id').set(newActitity.key);
      console.log('add child of day_plans with key : ' + newActitity.key);
      return newActitity.key;
    });

  }

  getJourneyList(): any {
    console.log('getJourneyList');
    return this.journeyList;
  }

  getJourneyById(journey_id): any {
    console.log('getJourneyById ' + journey_id);
    return this.journeyList.child(journey_id);
  }

  getPlanList(journey_id): any {
    console.log('getPlanList by eventId ' + journey_id);
    return this.journeyList.child(journey_id).child('day_plans').child('plans');
  }

  getPlanActivitys(journey_id,activity_id): any {
    console.log('getPlanActivitys eventId ' + journey_id +' activity_id '+activity_id);
    return this.journeyList.child(journey_id).child('day_plans').child('plans').child(activity_id).child('activities');;
  }

  authenUser() {
    console.log('authenUser');
    this.currentUser = firebase.auth().currentUser.uid;

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('EventData onAuthStateChanged get new journeyList');
        this.currentUser = firebase.auth().currentUser.uid;
        this.journeyList = firebase.database().ref('userProfile/' + this.currentUser + '/journeys');
      } else {
        console.log('EventData onAuthStateChanged false' + this.currentUser);
        this.currentUser = firebase.auth().signOut;
      }
    }, (eror) => {
      console.log('EventData onAuthStateChanged error');
    });
  }

}