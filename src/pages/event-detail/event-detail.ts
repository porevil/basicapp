import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventData } from '../../providers/event-data';
import { Camera } from 'ionic-native';
import { ActivityPage } from '../activity/activity';

@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  currentEvent: any;
  activity: string = '';
  guestPicture: any = null;
  eventDetailList: any;
  eventId: any;

  constructor(public nav: NavController, public navParams: NavParams, public eventData: EventData) {
    this.navParams = navParams;
    console.log('event detail id ' + this.navParams.get('eventId'))
    this.eventId = this.navParams.get('eventId')

    this.eventData.getEventDetail(this.navParams.get('eventId')).on('value', (snapshot) => {
      this.currentEvent = snapshot.val();
    });

    this.eventData.getEventDetailList(this.eventId).on('value', snapshot => {
      console.log('getEventDetailList')
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
    this.nav.push(ActivityPage,{eventId:eventId})
  }
/*
  addGuest(activity) {
    this.eventData.addActivity(activity, this.currentEvent.id, this.currentEvent.price).then(() => {
      this.activity = '';
      this.guestPicture = null;
    });
  }
*/
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

}
