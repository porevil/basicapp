import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import firebase from 'firebase';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
//import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})



export class MyApp {
  rootPage = LoginPage;

  constructor(platform: Platform) {
    firebase.initializeApp({
      apiKey: "AIzaSyBnC3KbdjNgksR3BnbgOOIoLykDxhsrc-0",
      authDomain: "basicapp-19695.firebaseapp.com",
      databaseURL: "https://basicapp-19695.firebaseio.com",
      storageBucket: "basicapp-19695.appspot.com",
      messagingSenderId: "661251547262"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.rootPage = LoginPage;
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
