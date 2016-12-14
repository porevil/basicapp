import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { EventCreatePage } from '../event-create/event-create';
import { JourneysPage } from '../journeys/journeys';
import { EventData } from '../../providers/event-data';
import { DayPlansPage } from '../dayplans/dayplans';
import { DashboardPage } from '../dashboard/dashboard';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})


export class HomePage {
  uid: any;
  public journeys: any;

  constructor(public nav: NavController, public navParams: NavParams, public eventData: EventData) {
    this.uid = this.navParams.get('uid');
    console.log(' constructor HomePage UID ' + this.uid)
    this.nav = nav;

    this.eventData.getJourneyList().on('value', snapshot => {
      console.log('getJourneys')
      let rawList = [];
      snapshot.forEach(snap => {
        rawList.push({
          id: snap.key,
          event_name: snap.val().event_name,
          from_location: snap.val().from_location,
          to_location: snap.val().to_location,
          start_date: snap.val().start_date,
          end_date: snap.val().end_date,
        });
        //console.log('push '+snap.key+' name '+snap.val().name)
      });
      this.journeys = rawList;
    });

  }

  goToProfile() {
    this.nav.push(ProfilePage, { uid: this.uid });
  }

  createNewJourney() {
    this.nav.push(EventCreatePage, { uid: this.uid });
  }

  goToList() {
    this.nav.push(JourneysPage, { uid: this.uid });
  }

  goToEventDetail(eventId) {
    this.nav.push(DayPlansPage, {
      eventId: eventId,
    });
  }

  goToDashBoard(journeyId,journeyName) {
    console.log(' goto dashboard '+journeyId)
    this.nav.push(DashboardPage, {
      journeyId: journeyId,
      journeyName : journeyName
    });
  }
}
