import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EventCreatePage } from '../pages/event-create/event-create';
import { DayPlansPage } from '../pages/dayplans/dayplans';
import { JourneysPage } from '../pages/journeys/journeys';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignupPage } from '../pages/signup/signup';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ActivityPage } from '../pages/activity/activity';
import { DayActivityPage } from '../pages/day-activity/day-activity';
import { ViewActivitiesPage } from '../pages/view-activities/view-activities';
// Import providers
import { AuthData } from '../providers/auth-data';
import { EventData } from '../providers/event-data';
import { ProfileData } from '../providers/profile-data';
import { User }  from '../providers/user';
import { PageGmapAutocomplete } from '../pages/page-gmap-autocomplete/page-gmap-autocomplete';
import { ModalAutocompleteItems } from '../pages/modal-autocomplete-items/modal-autocomplete-items';
import { GoogleMaps } from '../providers/google-maps';
import { GoogleMapsCluster } from '../providers/google-maps-cluster';
import { Connectivity } from '../providers/connectivity';
import { ViewMapsPage } from '../pages/view-maps/view-maps';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EventCreatePage,
    DayPlansPage,
    JourneysPage,
    LoginPage,
    ProfilePage,
    ResetPasswordPage,
    SignupPage,
    DashboardPage,
    ActivityPage,
    DayActivityPage,
    ViewActivitiesPage,
    PageGmapAutocomplete,
    ModalAutocompleteItems,
    ViewMapsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, [
      'ionic',
      'ion-google-place'
    ])
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EventCreatePage,
    DayPlansPage,
    JourneysPage,
    LoginPage,
    ProfilePage,
    ResetPasswordPage,
    SignupPage,
    DashboardPage,
    ActivityPage,
    DayActivityPage,
    ViewActivitiesPage,
    PageGmapAutocomplete,
    ModalAutocompleteItems,
    ViewMapsPage

  ],
  providers: [AuthData,
    EventData,
    ProfileData,
    Storage,
    User, GoogleMaps, GoogleMapsCluster, Connectivity]
})
export class AppModule { }
