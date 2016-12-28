import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventData } from '../../providers/event-data';
import { ViewMapsPage } from '../../pages/view-maps/view-maps';

/*
  Generated class for the DayActivity page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-day-activity',
  templateUrl: 'day-activity.html'
})
export class DayActivityPage {

  currentEvent: any;
  activity: string = '';
  dayActivitiesList: any;
  eventId: any;
  city: string;

  private prevValue: number;
  private value: number;

  constructor(public nav: NavController, public navParams: NavParams, public eventData: EventData) {
    this.navParams = navParams;
    this.value = 1;
    console.log('DayActivityPage')
    this.dayActivitiesList = this.navParams.get('dayActivitiesList')
    this.city = this.navParams.get('city')
  }

  showViewMapPage() {
    this.nav.push(ViewMapsPage);
  }

}
