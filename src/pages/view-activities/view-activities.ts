import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { EventData } from '../../providers/event-data';
import { ActivityPage } from '../activity/activity';
/*
  Generated class for the ViewActivities page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-view-activities',
  templateUrl: 'view-activities.html'
})
export class ViewActivitiesPage implements OnInit {

  dayActivitiesList: any;
  journeyId: any;
  planId: any;
  dayActivity: any;

  ngOnInit() {
    console.log('ngOnInit ViewActivities Page');
  }

  constructor(public nav: NavController, public navParams: NavParams, public eventData: EventData
  , public modalCtrl: ModalController, public viewCtrl: ViewController) {
    this.navParams = navParams;
    this.planId = this.navParams.get("plan_id");
    this.journeyId = this.navParams.get("journey_id");
    console.log('ViewActivitiesPage')
    this.dayActivitiesList = this.navParams.get('dayActivitiesList')
    this.dayActivitiesList.forEach(element => {
      console.log(' activities : ' + element.activity);
    });
  }

  updateActivities(dayActivitiesList) {
    this.dayActivitiesList.forEach(element => {
      console.log(' updateActivities : ' + element.id);
    });
    this.eventData.updateActivities(this.journeyId, this.planId, dayActivitiesList);


  }
  ionViewDidLoad() {
    console.log('Hello ViewActivities Page');
  }
  addActivities() {
    let modal = this.modalCtrl.create(ActivityPage,
      {
        plan_id: this.planId,
        journey_id: this.journeyId
      });

    modal.onDidDismiss(data => {
      console.log('page > modal dismissed > data > ', data);
      if (data) {
        //this.address.place = data.description;
        // get details
        //this.getPlaceDetail(data.place_id);
      }
    })
    modal.present();
  }
}
