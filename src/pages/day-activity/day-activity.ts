import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventData } from '../../providers/event-data';
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
  eventDetailList: any;
  eventId: any;

  constructor(public nav: NavController, public navParams: NavParams, public eventData: EventData) {
    this.navParams = navParams;
    console.log('DayActivityPage')
    this.eventDetailList = this.navParams.get('eventDetailList')



  }

}
