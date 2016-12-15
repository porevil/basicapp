import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { EventDetailPage } from '../event-detail/event-detail';
import { DayPlansPage } from '../dayplans/dayplans';
import { PageGmapAutocomplete } from '../page-gmap-autocomplete/page-gmap-autocomplete';
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
  journeyId: any;
  journeyName: string;
  constructor(public nav: NavController, public navParams: NavParams) {
    this.journeyId = this.navParams.get('journeyId');
    this.journeyName = this.navParams.get('journeyName');
  }


  ionViewDidLoad() {
    console.log('Hello Dashboard Page');
  }
  gotoLocation() {
    console.log('gotoLocation Page');
    this.nav.push(PageGmapAutocomplete);
  }

  gotoDayPlans() {
    this.nav.push(DayPlansPage, {
      journeyId: this.journeyId,
      journeyName: this.journeyName
    });
  }
}
