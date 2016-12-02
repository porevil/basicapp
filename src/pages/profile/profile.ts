import { NavController, AlertController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { ProfileData } from '../../providers/profile-data';
import { AuthData } from '../../providers/auth-data';
import { LoginPage } from '../login/login';
import firebase from 'firebase';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public userProfile: any;
  public birthDate: string;
  uid: any
  fire_uid: any
  current_user: any
  constructor(public nav: NavController, public profileData: ProfileData,
    public authData: AuthData, public alertCtrl: AlertController, public navParams: NavParams) {
    console.log(' ProfilePage constructor')
    this.fire_uid = firebase.auth().currentUser.uid;
    this.current_user = firebase.auth().currentUser
    this.uid = this.navParams.get('uid');
    console.log(' constructor fire_uid ' + this.fire_uid)

    this.profileData.getUserProfile(this.fire_uid).on('value', (data) => {

      this.userProfile = data.val();
      this.birthDate = this.userProfile.birthDate;
    });

  }

  logOut() {
    firebase.auth().signOut;
    this.authData.logoutUser().then(() => {
      this.nav.setRoot(LoginPage);
    });
  }

  updateName() {
    let alert = this.alertCtrl.create({
      message: "Your first name & last name",
      inputs: [
        {
          name: 'firstName',
          placeholder: 'Your first name',
          value: this.userProfile.firstName
        },
        {
          name: 'lastName',
          placeholder: 'Your last name',
          value: this.userProfile.lastName
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.profileData.updateName(data.firstName, data.lastName);
          }
        }
      ]
    });
    alert.present();
  }

  updateDOB(birthDate) {
    console.log('update DOB')
    this.profileData.updateDOB(birthDate);
  }

  updateEmail() {
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'newEmail',
          placeholder: 'Your new email',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.profileData.updateEmail(data.newEmail);
          }
        }
      ]
    });
    alert.present();
  }

  updatePassword() {
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'newPassword',
          placeholder: 'Your new password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.profileData.updatePassword(data.newPassword);
          }
        }
      ]
    });
    alert.present();
  }
}