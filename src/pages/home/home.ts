import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { EventCreatePage } from '../event-create/event-create';
import { EventListPage } from '../event-list/event-list';
import { EventDetailPage } from '../event-detail/event-detail';
import { EventData } from '../../providers/event-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

  
export class HomePage {
  uid:any;
  public eventList: any;

  constructor(public nav: NavController, public navParams: NavParams, public eventData: EventData) {
    
    this.uid = this.navParams.get('uid');
    console.log(' constructor HomePage UID '+this.uid)
    this.nav = nav;

     this.eventData = eventData;

    this.eventData.getEventList().on('value', snapshot => {
      let rawList = [];
      snapshot.forEach( snap => {
        rawList.push({
          id: snap.key,
          name: snap.val().name,
          price: snap.val().price,
          date: snap.val().date,
        });
      });
      this.eventList = rawList;
    });

  }

  goToProfile(){
    this.nav.push(ProfilePage,{uid:this.uid});
  }

  goToCreate(){
    this.nav.push(EventCreatePage,{uid:this.uid});
  }

  goToList(){
    this.nav.push(EventListPage,{uid:this.uid});
  }

  goToEventDetail(eventId){
    this.nav.push(EventDetailPage, {
      eventId: eventId,
    });
  }

}
