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
   start_date: string, end_date: string){
  
    this.eventData.createJourney(event_name, from_location, to_location, start_date, end_date).then(() => {
      this.nav.pop();
    });
  }

}
