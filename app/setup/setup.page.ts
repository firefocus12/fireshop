import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.page.html',
  styleUrls: ['./setup.page.scss'],
})
export class SetupPage implements OnInit {
  spin: boolean = false;

  constructor(public nav: NavController) { }

  ngOnInit() {
  }

  finishSetup() {
    var name = (<HTMLInputElement>document.getElementById("name")).value;
    this.spin = true;

    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name
    }).then(() => {
      localStorage.setItem("name", name);
      this.nav.navigateRoot("/");
    }).catch(err => {
      alert(err);
    })
  }
}
