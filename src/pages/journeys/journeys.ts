import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DayPlansPage } from '../dayplans/dayplans';
import { EventData } from '../../providers/event-data';

@Component({
  selector: 'page-journeys',
  templateUrl: 'journeys.html',
})
export class JourneysPage {
  public eventList: any;

  constructor(public nav: NavController, public eventData: EventData) {
    this.nav = nav;
    this.eventData = eventData;

    this.eventData.getJourneyList().on('value', snapshot => {
      let rawList = [];
      snapshot.forEach( snap => {
        rawList.push({
          id: snap.key,
          name: snap.val().name,
          price: snap.val().price,
          date: snap.val().date,
        });
      });
      this.eventList = rawList;
    });
    
  }

  goToEventDetail(eventId){
    this.nav.push(DayPlansPage, {
      eventId: eventId,
    });
  }
}
