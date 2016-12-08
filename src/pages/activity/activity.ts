import { Component } from '@angular/core';
import { EventData } from '../../providers/event-data';
import {
  NavController,
  LoadingController,
  AlertController,
  NavParams
} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

/*
  Generated class for the Activity page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html'
})
export class ActivityPage {
  public activityForm;
  currentEvent: any;
  eventId: any;
  activity: any;
  time: any;
  currentDateKey: any;
  dateListCreated: boolean = false;

  constructor(public nav: NavController, public formBuilder: FormBuilder, public alertCtrl: AlertController,
    public navParams: NavParams, public eventData: EventData) {


    this.eventId = this.navParams.get('eventId')
    console.log('ActivityPage eventId ' + this.eventId)
    this.eventData.getEventDetailList(this.navParams.get('eventId')).on('value', (snapshot) => {
      /*
      snapshot.forEach(snap => {
        this.firstDateCreated = true;
        console.log('eventDetail key ' + snap.key)
      });
      */
      if (this.dateListCreated) {
        console.log('dateListCreated ' + this.dateListCreated);
      } else {
        this.dateListCreated = true;
        console.log('dateListCreated ' + this.dateListCreated + ' addFirstActivity ');
        this.eventData.addFirstActivity(this.eventId).then((new_key) => {
          console.log('new_key : ' + new_key)
          this.currentDateKey = new_key
          this.activity = '';
          this.time = '';
        });

      }

    }, (error) => {
      console.log('getEventDetail error ')
    });

    this.activityForm = formBuilder.group({
      activity: ['', Validators.compose([Validators.required])],
      time: ['']
    });

  }

  addActivity(activity, time) {
    console.log('addActivity on eventId : ' + this.eventId + ' with ' + activity)
    if (this.dateListCreated) {
      this.eventData.addActivity(this.eventId, this.currentDateKey, activity, time).then(() => {
        this.activity = '';
        this.time = '';
      });
    } else {
      this.eventData.addActivity(this.eventId, this.currentDateKey, activity, time).then(() => {
        this.activity = '';
        this.time = '';
      });
    }
  }

  /*
      addGuest(activity, eventId, eventPrice, guestPicture = null): any {
      console.log('addGuest on UID ' + this.currentUser.uid);
      return this.eventList.child(eventId).child('activityList').push({
        activitiy: activity
      }).then((newActitity) => {
        this.eventList.child(eventId).transaction( (event) => {
          event.revenue += eventPrice;
          return event;
        });    
  
      });
    }
  
  */
  ionViewDidLoad() {
    console.log('Hello Activity Page');
  }

}
