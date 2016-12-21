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

  // Create journey : first child under user node
  createJourney(event_name: string, from_location: string, to_location: string,
    start_date: string, end_date: string, days: number) {

    return this.journeyList.push({
      event_name: event_name,
      from_location: from_location,
      to_location: to_location,
      start_date: start_date,
      end_date: end_date,
      no_of_item: 0
    }).then(newEvent => {
      this.journeyList.child(newEvent.key).child('id').set(newEvent.key);
      console.log('Initial All plans')
      for (let index = 0; index < days; index++) {
        this.addFirstActivity(newEvent.key, index)
      }

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

  // update all activities under plans
  updateActivities(journeyId, planId, activities): any {
    console.log('updateActivity on journeyId ' + journeyId + ' planId ' + planId);
    activities.forEach(element => {
      console.log(' updateActivities : ' + element.id);
      this.journeyList.child(journeyId).child('day_plans').child('plans').child(planId).child('activities').child(element.id).update({
        activity: element.activity,
        time: element.time
      });
    });

  }

  updatePlansSequence(journeyId, planId, index): any {
    console.log('move planId ' + planId + ' to index ' + index);
    this.journeyList.child(journeyId).child('day_plans').child('plans').child(planId).update({
      index: index,
    });


  }

  addActivity(journey_id, dateKey, activity, time, place, picture): any {
    console.log('addActivity on journey_id ' + journey_id + ' update on plansId ' + dateKey);
    return this.journeyList.child(journey_id).child('day_plans').child('plans').child(dateKey).child('activities').push({
      activity: activity,
      time: time
    }).then((newActitity) => {
      console.log('add place ' + place)
      this.journeyList.child(journey_id).child('day_plans').child('plans').child(dateKey).child('place').set(place)
      /*
      this.journeyList.child(journey_id).transaction((event) => {
        this.journeyList.child(journey_id).child('day_plans').child('plans').child(dateKey).child('city').set(city)
        //event.time = time;
        return event;
      });
*/
      if (picture != null) {
        this.journeyList.child(journey_id).child('day_plans').child('plans').child(dateKey).child('profilePicture.png')
          .putString(picture, 'base64', { contentType: 'image/png' })
          .then((savedPicture) => {
            this.journeyList.child(journey_id).child('day_plans').child('plans').child(dateKey).child('profilePicture')
              .set(savedPicture.downloadURL);
          });
      }
    });
  }
  updateNoOfItem(journey_id, has_item: boolean): number {
    console.log('updateNoOfItem on journey_id ' + journey_id);

    return this.journeyList.child(journey_id).child('no_of_item').transaction((event) => {
      if (has_item) {
        event.no_of_item += 1;
      } else {
        event.no_of_item = 1;
      }
      console.log('no of item' + event.no_of_item);
      return event.no_of_item;
    });

  }
  addFirstActivity(journey_id, index): any {
    console.log('addFirstActivity on UID ' + journey_id);
    let noOfItem = 0//this.updateNoOfItem(journey_id, false)

    return this.journeyList.child(journey_id).child('day_plans').child('plans').push({
      index: index
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
    return this.journeyList.child(journey_id).child('day_plans').child('plans').orderByChild('index');
  }

  getPlanActivitys(journey_id, activity_id): any {
    console.log('getPlanActivitys eventId ' + journey_id + ' activity_id ' + activity_id);
    return this.journeyList.child(journey_id).child('day_plans').child('plans').child(activity_id).child('activities');
  }

  removePlans(journey_id, activity_id): any {
    console.log('removePlans journey_id ' + journey_id + ' activity_id ' + activity_id);
    return this.journeyList.child(journey_id).child('day_plans').child('plans').child(activity_id).remove();
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