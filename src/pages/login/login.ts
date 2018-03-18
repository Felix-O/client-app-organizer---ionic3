import { Component } from '@angular/core';
import { App, IonicPage, NavController, ViewController, LoadingController, ToastController, ToastOptions, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
//import { GooglePlus } from '@ionic-native/google-plus';

declare var window: any;

@IonicPage({
  defaultHistory: ['HomePage']
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  //providers: [GooglePlus]
})
export class LoginPage {

    email: string;
    password: string;
    loading: any;
    user: Observable<firebase.User>;
    body: any;
    toastOptions: ToastOptions;

    constructor(
      private alertCtrl: AlertController,
      protected app: App,
      private afAuth: AngularFireAuth,
      public toast: ToastController,
      //private googlePlus: GooglePlus,
      public viewCtrl: ViewController,
      public navCtrl: NavController,
      public authService: AuthProvider,
      public loadingCtrl: LoadingController) {
        this.user = this.afAuth.authState;
    }

    ionViewDidEnter(){
      var m1, m2, m3;
      m1 = this.user; 
      this.showAlert(m1, m2, m3);
    }

    ionViewDidLoad() {
        //this.showLoader();
        //Check if already authenticated
        this.authService.checkAuthentication().then((res) => {
            console.log("Already authorized");
            //this.loading.dismiss();
            this.app.getRootNav().setRoot('ProfilePage');
            //this.close();
        }, (err) => {
            console.log("Not already authorized");
            //this.loading.dismiss();
        });
    }

    showAlert(m1, m2?, m3?) {
      if(m2 === undefined){
        m2 = '';
      }
      if(m3 === undefined){
        m3 = '';
      }
      let alert = this.alertCtrl.create({
        title: 'Credentials',
        subTitle: m1 + m2 + m3,
        buttons: ['Dismiss']
      });
      alert.present();
      console.log(m1);
      console.log(m2);
      console.log(m3);
    }

/*
    googleLogin(): void {
      this.googlePlus.login({
        'webClientId': '602320724221-45ne6ra24g7n2b9velck9dv94hlaqghp.apps.googleusercontent.com',
        'offline': true
      }).then( res => {
        console.log(res);
      })
        .catch(err => console.error(err));
    }/**/

    googleLogin(){
      this.googlePopup();
    }

    async googlePopup(): Promise<void>{
      var m1, m2, m3;
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const credential = await this.afAuth.auth.signInWithPopup(provider).then( result => {
          //var user = this.objectifiedUser(result);
          m1 = result.user.uid;
          m2 = this.user.subscribe();
        });
      } catch (err) {
        m1 = err;
      }
      //this.showAlert(m1, m2, m3);
    }

    googleRedirect(){
      var m1, m2, m3;
      return this.afAuth.auth.getRedirectResult().then(result => {
        if(result){
          if (result.credential) {
            var token = result.credential.accessToken;
          }
          if(result.user){
            var user = result.user;
            m1 = "success";
          } else {
            m1 = "weird, no user";
          }
        } else {
          m1 = "didnt work";
        }
        this.showAlert(m1, m2, m3);
      }).catch(function(error) {
        var errorCode = error.code;
        var errorm1 = error.m1;
        var email = error.email;
        var credential = error.credential;
        m1 = "error with getRedirectResult";
        //stack flow test
        this.showAlert(m1, m2, m3);
      });
    }

    pushGoogleCredetials(credentials){
      this.toastA("success").present();
      this.authService.googleLogin(credentials)
      .then((googleLoginResult) => {
          this.loading.dismiss();
          console.log(googleLoginResult);
          this.reloadCurrentPage();
      }, (err) => {
          this.loading.dismiss();
          console.log(err);
      });
    }

    login(){
        this.showLoader();
        let credentials = {
            email: this.email,
            password: this.password
        };
        this.authService.login(credentials).then((result) => {
            this.loading.dismiss();
            //console.log(result);
            //this.app.getRootNav().setRoot('ProfilePage');
            this.reloadCurrentPage();
        }, (err) => {
            this.loading.dismiss();
            //console.log(err);
        });
    }

    objectifiedUser(result){
      return this.body = {
        googleId: result.user.uid,
        googleProfilePic: result.user.photoURL,
        firstname: result.additionalUserInfo.profile.given_name,
        lastname: result.additionalUserInfo.profile.family_name,
        username: result.user.displayName,
        email: result.user.email,
        password: 'bust4all'
      };
    }

    toastA(message){
      this.toastOptions = {
        message: message,
        duration: 3000
      }
      return this.toast.create(this.toastOptions);
    }

    reloadCurrentPage(){
      this.app.getRootNav().setRoot(this.app.getRootNav().getActive().component);
      this.close();
    }

    launchSignup(){
        this.app.getRootNav().setRoot('RegisterPage');
        this.close();
    }

    showLoader(){
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
        this.loading.present();
    }

    close(){
      this.viewCtrl.dismiss();
    }

}
