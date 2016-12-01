import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { EventCreatePage } from '../event-create/event-create';
import { EventListPage } from '../event-list/event-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

  
export class HomePage {
  uid:any;
  constructor(public nav: NavController, public navParams: NavParams) {
    this.uid = this.navParams.get('uid');
    console.log(' constructor HomePage UID '+this.uid)
    this.nav = nav;
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



}
