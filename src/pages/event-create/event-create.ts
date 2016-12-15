import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventData } from '../../providers/event-data';

@Component({
  selector: 'page-event-create',
  templateUrl: 'event-create.html',
})
export class EventCreatePage {

  constructor(public nav: NavController, public eventData: EventData) {
    this.nav = nav;
    this.eventData = eventData;
  }

  createJourney(event_name: string, from_location: string, to_location: string,
    start_date: string, end_date: string) {
    let days = new Date(end_date).getTime()  - new Date(start_date).getTime();
    days = Math.floor(days/86400000)
    console.log('Date range : ' + days);

    this.eventData.createJourney(event_name, from_location, to_location, start_date, end_date, days).then(() => {
      this.nav.pop();
    });
  }

}
