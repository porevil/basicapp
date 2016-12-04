import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventData } from '../../providers/event-data';
import { Camera } from 'ionic-native';

@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  currentEventGuest:any;
  currentEvent: any;
  date_no: string = '';
  activity: string = '';
  guestPicture: any = null;
  constructor(public nav: NavController, public navParams: NavParams, public eventData: EventData) {
    console.log(' Eventdetail constructor...')
    this.navParams = navParams;

    // Get Journal
    this.eventData.getEventDetail(this.navParams.get('eventId')).on('value', (snapshot) => {
      this.currentEvent = snapshot.val();
      
    });

    // Get Track
    this.eventData.getEventGuestList(this.navParams.get('eventId')).on('value', (snapshotguest) => {
      this.currentEventGuest = snapshotguest.val();
      let rawList = [];
      snapshotguest.forEach(guest => {
        rawList.push(
          {
            date_no:guest.val().date_no,
            activity:guest.val().activity
          }
        );
      });
      this.currentEventGuest = rawList;
    });

  }

  addGuest(date_no,activity) {
    console.log('addGuest ' +date_no+' '+activity)
    this.eventData.addGuest(date_no,activity, this.currentEvent.id, this.currentEvent.price, this.guestPicture).then(() => {
      this.date_no = '';
      this.activity = '';
      this.guestPicture = null;
    });
  }

  takePicture(){
    Camera.getPicture({
      quality : 95,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit : true,
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
