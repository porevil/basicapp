import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventData } from '../../providers/event-data';

/*
  Generated class for the ViewActivities page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-view-activities',
  templateUrl: 'view-activities.html'
})
export class ViewActivitiesPage {

  dayActivitiesList: any;
  journeyId: any;
  planId: any;
  dayActivity:any;

  constructor(public nav: NavController, public navParams: NavParams, public eventData: EventData) {
    this.navParams = navParams;
    this.planId = this.navParams.get("plan_id");
    this.journeyId = this.navParams.get("journey_id");
    console.log('ViewActivitiesPage')
    this.dayActivitiesList = this.navParams.get('dayActivitiesList')
     this.dayActivitiesList.forEach(element => {
      console.log(' activities : '+element.activity);
    });
  }
  
  updateActivities(dayActivitiesList){
    this.dayActivitiesList.forEach(element => {
      console.log(' updateActivities : '+element.id);
    });
    this.eventData.updateActivities(this.journeyId,this.planId,dayActivitiesList);

    
  }
  ionViewDidLoad() {
    console.log('Hello ViewActivities Page');
  }

}
