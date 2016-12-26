import {
  NavController,
  LoadingController,
  AlertController
} from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { User } from '../../providers/user';
import { Storage } from '@ionic/storage';
import { Facebook } from 'ionic-native';

@Component({
  providers: [User, Storage],
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public loginForm;
  userProfile: any = null;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;
  loggedIn: boolean = false;
  email: any;
  password: any;

  constructor(public nav: NavController, public authData: AuthData,
    public formBuilder: FormBuilder, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, public user: User) {


    this.user.getData().then(data => {
      console.log('getData' + data);
      if (typeof (data) != "undefined" && data != null) {
        console.log('parse ' + data.email + ' ' + data.password);
        // decode JSON to array savedChecklists
        //let userData = JSON.parse(data);
        console.log('already login userData' + data.email);
        this.loggedIn = true;
        this.login(data.email, data.password);
      }
    });

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });


  }
  /**
     * Receives an input field and sets the corresponding fieldChanged property to 'true' to help with the styles.
     */
  elementChanged(input) {
    let field = input.inputControl.name;
    this[field + "Changed"] = true;

  }

  loginUser() {

    this.submitAttempt = true;

    if (!this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      this.login(this.loginForm.value.email, this.loginForm.value.password);
      console.log('save logged in ' + this.loginForm.value.email)
      this.email = this.loginForm.value.email;
      this.password = this.loginForm.value.password;
      this.user.save(this.email, this.password)

    }

  }

  loginFacebook() {
    Facebook.login(['email']).then((response) => {
    
      let facebookCredential = firebase.auth.FacebookAuthProvider
        .credential(response.authResponse.accessToken);

      firebase.auth().signInWithCredential(facebookCredential)
        .then((success) => {
          console.log("Firebase success: " + JSON.stringify(success));
          this.userProfile = success;
          this.nav.setRoot(HomePage, { uid: this.userProfile.uid });
          console.log('userProfile.uid : '+this.userProfile.uid)
        })
        .catch((error) => {
          console.log("Firebase failure: " + JSON.stringify(error));
        });

    }).catch((error) => { console.log(error) });
  }

  login(user, password) {
    console.log('login with value' + user);
    this.authData.loginUser(user, password).then(authData => {
      this.nav.setRoot(HomePage, { uid: authData.uid });
    }, error => {
      this.loading.dismiss().then(() => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });

    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loading.present();
  }

  goToSignup() {
    this.nav.push(SignupPage);
  }

  goToResetPassword() {
    this.nav.push(ResetPasswordPage);
  }

}
