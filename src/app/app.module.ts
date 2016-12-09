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
// Import providers
import { AuthData } from '../providers/auth-data';
import { EventData } from '../providers/event-data';
import { ProfileData } from '../providers/profile-data';


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
    DayActivityPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
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
    DayActivityPage
  ],
  providers: [AuthData,
    EventData,
    ProfileData]
})
export class AppModule { }
