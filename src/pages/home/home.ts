import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { EventCreatePage } from '../event-create/event-create';
import { EventListPage } from '../event-list/event-list';
import { EventData } from '../../providers/event-data';
import { EventDetailPage } from '../event-detail/event-detail';
import { DashboardPage } from '../dashboard/dashboard';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})


export class HomePage {
  uid: any;
  public eventList: any;

  constructor(public nav: NavController, public navParams: NavParams, public eventData: EventData) {
    this.uid = this.navParams.get('uid');
    console.log(' constructor HomePage UID ' + this.uid)
    this.nav = nav;

    this.eventData.getEventList().on('value', snapshot => {
      console.log('getEventList')
      let rawList = [];
      snapshot.forEach(snap => {
        rawList.push({
          id: snap.key,
          name: snap.val().name,
          price: snap.val().price,
          date: snap.val().date,
        });
        console.log('push '+snap.key+' name '+snap.val().name)
      });
      this.eventList = rawList;
    });

  }

  goToProfile() {
    this.nav.push(ProfilePage, { uid: this.uid });
  }

  goToCreate() {
    this.nav.push(EventCreatePage, { uid: this.uid });
  }

  goToList() {
    this.nav.push(EventListPage, { uid: this.uid });
  }

  goToEventDetail(eventId) {
    this.nav.push(EventDetailPage, {
      eventId: eventId,
    });
  }

  goToDashBoard(eventId) {
    console.log(' goto dashboard '+eventId)
    this.nav.push(DashboardPage, {
      eventId: eventId,
    });
  }
}
