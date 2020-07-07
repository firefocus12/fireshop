import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {
  orders: Array<any> = [];
  uid: string;

  constructor() {
    this.uid = localStorage.getItem("uid");
    firebase.database().ref("orders/" + this.uid).once("value", snap => {
      snap.forEach(childSnap => {
        this.orders.push({ ...childSnap.val(), id: childSnap.key });
      });
    });
  }

  ngOnInit() {
  }

  deleteOrder(id) {
    var i = this.orders.findIndex(x => x.id == id);
    firebase.database().ref("orders/" + this.uid + "/" + id).remove().then(() => {
      this.orders.splice(i, 1);
    })
  }
}
