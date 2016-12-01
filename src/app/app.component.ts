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
      apiKey: "AIzaSyA9L5Zp1i_b00oARWU8MLBQfhOiKcDrWLQ",
      authDomain: "basicapp-5efbd.firebaseapp.com",
      databaseURL: "https://basicapp-5efbd.firebaseio.com",
      storageBucket: "basicapp-5efbd.appspot.com",
      messagingSenderId: "290296818082"
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
