import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import { NavController, PopoverController } from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  code: string = "+1"; //default country code
  spin: boolean = false; //spinner
  otpSent: boolean = false; //OTP sent status

  recaptchaVerifier;
  confirmationResult: firebase.auth.ConfirmationResult;

  phoneNumber: string; //set value after OTP is sent

  constructor(public nav: NavController, public popoverController: PopoverController) {
    //keep track of currently selected country code
    setInterval(() => {
      if (sessionStorage.getItem("code")) {
        this.code = sessionStorage.getItem("code");
      }
    }, 100);
  }

  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', { 'size': 'invisible' });
  }

  //Navigate to Country Codes Page
  showCodes() {
    this.nav.navigateForward("/country-codes");
  }

  sendOTP() {
    var phNo = this.code + (<HTMLInputElement>document.getElementById("phoneNumber")).value;
    this.spin = true;

    firebase.auth().signInWithPhoneNumber(phNo, this.recaptchaVerifier).then(result => {
      this.phoneNumber = phNo;
      this.otpSent = true;
      this.confirmationResult = result;
      this.spin = false;
    }).catch(err => {
      this.spin = false;
      alert(err);
    })
  }

  verifyOTP() {
    var otp = (<HTMLInputElement>document.getElementById("otp")).value;
    this.spin = true;

    this.confirmationResult.confirm(otp).then((data) => {
      this.spin = false;
      //Save user uid to localStorage
      localStorage.setItem("uid", data.user.uid);
      //Save phoneNumber to localStorage
      localStorage.setItem("phoneNumber", data.user.phoneNumber);

      //If user has name
      //navigate to home page
      if (data.user.displayName) {
        this.nav.navigateRoot("/");
      }
      //navigate to profile setup page
      else {
        this.nav.navigateRoot("/setup");
      }
    }).catch(err => {
      alert(err);
      this.spin = false;
    })
  }
}
