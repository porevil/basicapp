import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { EventData } from '../../providers/event-data';
import { DayPlansPage } from '../dayplans/dayplans';
import { PageGmapAutocomplete } from '../page-gmap-autocomplete/page-gmap-autocomplete';
import { DayActivityPage } from '../day-activity/day-activity';

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
  @ViewChild('slider') slider: Slides;
  journeyId: any;
  journeyName: string;
  eventDetailList: any;
  dayActivitiesList: any;
  constructor(public nav: NavController, public navParams: NavParams, public eventData: EventData) {
    this.journeyId = this.navParams.get('journeyId');
    this.journeyName = this.navParams.get('journeyName');

    this.eventData.getPlanList(this.journeyId).on('value', snapshot => {
      console.log('getPlanList')
      let rawList = [];
      snapshot.forEach(snap => {
        rawList.push({
          index: snap.val().index,
          id: snap.key,
          city: snap.val().city,
          activity: snap.val().activity,
          time: snap.val().time
        });
        //console.log('push ' + snap.key + ' name ' + snap.val().name)
      });
      this.eventDetailList = rawList;
    });

  }

  showBanner(index) {
    var oldElm = document.querySelector('.slider ion-slide.slider-slide.current');
    var q = '.slider ion-slide.slider-slide[data-index="' + index + '"]';
    var elm = document.querySelector(q);

    console.log("Show banner " + index);

    // Remove class "current"
    if (null !== oldElm) {
      oldElm.classList.remove("current");
    }

    // Add class "current" to current slide
    if (null !== elm) {
      elm.classList.add("current");
    }
  }

  viewActivities(plans_id, city) {
    console.log('Goto viewActivities')

    this.eventData.getPlanActivitys(this.journeyId, plans_id).on('value', snap => {
      console.log('viewActivities')
      let rawList = [];
      snap.forEach(snap => {
        rawList.push({
          id: snap.key,
          activity: snap.val().activity,
          time: snap.val().time
        });
        //console.log('viewActivities push ' + snap.key + ' activity ' + snap.val().activity)
      });
      this.dayActivitiesList = rawList;
    })

    this.nav.push(DayActivityPage, { dayActivitiesList: this.dayActivitiesList, city: city });
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
