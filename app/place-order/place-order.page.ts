import { Component, OnInit } from '@angular/core';
import { PopoverController } from "@ionic/angular";
import * as firebase from "firebase";

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.page.html',
  styleUrls: ['./place-order.page.scss'],
})
export class PlaceOrderPage implements OnInit {
  carts: Array<any> = [];
  uid: string;
  totalCost: number = 0;

  constructor(public popoverCtrl: PopoverController) {
    this.uid = localStorage.getItem("uid");
    this.carts = JSON.parse(localStorage.getItem("carts"));

    this.carts.forEach(cart => {
      let price: string = cart.price;
      this.totalCost = Number(price.substring(1)) + this.totalCost;
    })
  }

  ngOnInit() {
  }

  placeOrder() {
    this.carts.forEach(cart => {
      firebase.database().ref("orders/" + this.uid).push(cart);
    });

    localStorage.setItem("carts", JSON.stringify([]));

    this.popoverCtrl.dismiss();
  }
}
