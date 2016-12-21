import { Component } from '@angular/core';
import { NavController, NavParams, reorderArray } from 'ionic-angular';
import { EventData } from '../../providers/event-data';
import { Camera } from 'ionic-native';
import { ActivityPage } from '../activity/activity';
import { DayActivityPage } from '../day-activity/day-activity';
import { ViewActivitiesPage } from '../view-activities/view-activities';

@Component({
  selector: 'page-dayplans',
  templateUrl: 'dayplans.html',
})
export class DayPlansPage {
  currentEvent: any;
  activity: string = '';
  guestPicture: any = null;
  eventDetailList: any;
  journeyId: any;
  planId: any;
  dayActivitiesList: any;
  city: string;
  reorder_items:boolean=false;
  reorder_item_name:string='reorder';

  items = [];
  constructor(public nav: NavController, public navParams: NavParams, public eventData: EventData) {
    this.navParams = navParams;
    this.journeyId = this.navParams.get('journeyId')

    console.log('DayPlansPage construct by journeyId ' + this.journeyId)
    this.eventData.getJourneyById(this.journeyId).on('value', (snapshot) => {
      this.currentEvent = snapshot.val();
    });

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

  reorderButton(){
    console.log('this.reorder_items '+ this.reorder_items)
    if(this.reorder_items){
      this.reorder_items = false;
      this.reorder_item_name = 'reorder'
    }else{
      this.reorder_items = true;
      this.reorder_item_name = 'checkmark-circle-outline'
    }
  }

  reorderItems(indexes) {
    this.items = reorderArray(this.eventDetailList, indexes);
    let index = 0;
    this.items.forEach(item=>{
      console.log('Move : id '+item.id+' to index ['+index+']')
      this.eventData.updatePlansSequence(this.journeyId,item.id,index);
      index++;
    }
    )
  }

  openActivityPage(eventId) {
    this.nav.push(ActivityPage, { journey_id: eventId, city: this.city })
  }

  editPlans(planId) {
    this.planId = planId;
    this.eventData.getPlanActivitys(this.journeyId, planId).on('value', snap => {
      console.log('editPlans')
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

    this.nav.push(ViewActivitiesPage, { dayActivitiesList: this.dayActivitiesList, plan_id: this.planId, journey_id: this.journeyId })
  }

  removePlans(planId) {
    this.eventData.removePlans(this.journeyId, planId)
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

  /*
  takePicture() {
    Camera.getPicture({
      quality: 95,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.guestPicture = imageData;
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }
*/

}
