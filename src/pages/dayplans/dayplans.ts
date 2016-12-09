import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventData } from '../../providers/event-data';
import { Camera } from 'ionic-native';
import { ActivityPage } from '../activity/activity';
import { DayActivityPage } from '../day-activity/day-activity';
@Component({
  selector: 'page-dayplans',
  templateUrl: 'dayplans.html',
})
export class DayPlansPage {
  currentEvent: any;
  activity: string = '';
  guestPicture: any = null;
  eventDetailList: any;
  journeyId: any;
  dayActivitiesList: any;
  constructor(public nav: NavController, public navParams: NavParams, public eventData: EventData) {
    this.navParams = navParams;
    this.journeyId = this.navParams.get('journeyId')
    console.log('DayPlansPage construct by journeyId ' + this.journeyId)
    this.eventData.getJourneyById(this.journeyId).on('value', (snapshot) => {
      this.currentEvent = snapshot.val();
    });

    this.eventData.getPlanList(this.journeyId).on('value', snapshot => {
      console.log('getPlanList')
      let rawList = [];
      snapshot.forEach(snap => {
        rawList.push({
          id: snap.key,
          activity: snap.val().activity,
          time: snap.val().time
        });
        console.log('push ' + snap.key + ' name ' + snap.val().name)
      });
      this.eventDetailList = rawList;
    });


  }

  openActivityPage(eventId) {
    this.nav.push(ActivityPage, { eventId: eventId })
  }

  viewActivities(plans_id) {
    console.log('Goto DayActivityPage')

    this.eventData.getPlanActivitys(this.journeyId, plans_id).on('value', snap => {
      console.log('viewActivities')
      let rawList = [];
      snap.forEach(snap => {
        rawList.push({
          id: snap.key,
          activity: snap.val().activity,
          time: snap.val().time
        });
        console.log('viewActivities push ' + snap.key + ' activity ' + snap.val().activity)
      });
      this.dayActivitiesList = rawList;
    })

    this.nav.push(DayActivityPage,{dayActivitiesList:this.dayActivitiesList});
  }

  /*
  takePicture() {
    Camera.getPicture({
      quality: 95,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.guestPicture = imageData;
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }
*/

}
