import { Component, ElementRef, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { GoogleMaps } from '../../providers/google-maps';
import { GoogleMapsCluster } from '../../providers/google-maps-cluster';

/*
  Generated class for the ViewMaps page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-view-maps',
  templateUrl: 'view-maps.html'
})
export class ViewMapsPage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  constructor(public platform: Platform, public maps: GoogleMaps, public mapCluster: GoogleMapsCluster) {

  }

  ionViewDidLoad(): void {

    this.platform.ready().then(() => {

      let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then((map) => {
        this.mapCluster.addCluster(map);
      });

    });

  }

}
