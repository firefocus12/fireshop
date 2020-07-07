import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from "firebase";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, public nav: NavController,
  ) {
    this.initializeApp();
    
    const firebaseConfig = {
      apiKey: "AIzaSyAxn25HSuG0DFzqrbCq9ic9aq7gBCuZOMk",
      authDomain: "chat-5070a.firebaseapp.com",
      databaseURL: "https://chat-5070a.firebaseio.com",
      projectId: "chat-5070a",
      storageBucket: "chat-5070a.appspot.com",
      messagingSenderId: "481797160079",
      appId: "1:481797160079:web:1ca2338291eed824"
    };
    firebase.initializeApp(firebaseConfig);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.checkUser();
    });
  }

  checkUser() {
    if(localStorage.getItem("uid")){
      this.nav.navigateRoot("/");
    }
    else{
      this.nav.navigateRoot("/login");
    }
  }
}
