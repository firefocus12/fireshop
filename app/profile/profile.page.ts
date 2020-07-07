import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  name: string;
  phoneNumber: string;
  dp: string;
  cart: Array<any> = [];

  constructor(public nav: NavController) {


    this.name = localStorage.getItem("name");
    this.phoneNumber = localStorage.getItem("phoneNumber");
    this.dp = this.dp = "https://ui-avatars.com/api/?background=ff7f50" + "&color=ffffff&size=128&bold=true&name=" + this.name;

    if (localStorage.getItem("carts")) {
      this.cart = JSON.parse(localStorage.getItem("carts"));
    }

    //Keep track of CART DATA
    setInterval(() => {
      if (localStorage.getItem("carts")) {
        this.cart = JSON.parse(localStorage.getItem("carts"));
      }
    }, 500);
  }

  ngOnInit() {
  }

  viewCart() {
    this.nav.navigateForward("/cart");
  }

  viewOrders() {
    this.nav.navigateForward("/my-orders");
  }
}
