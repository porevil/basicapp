import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventDetailPage } from '../event-detail/event-detail';

/*
  Generated class for the Dashboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
  eventId:any;
  constructor(public nav: NavController,public navParams: NavParams) {
    this.eventId = this.navParams.get('eventId');
  }
  

  ionViewDidLoad() {
    console.log('Hello Dashboard Page');
  }
  gotoDayPlans(){
    this.nav.push(EventDetailPage,{
      eventId: this.eventId,
    });
  }
}
