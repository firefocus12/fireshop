import { Component, ViewChild } from '@angular/core';
import { NavController, IonInfiniteScroll } from "@ionic/angular";
import * as firebase from "firebase";
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  products: Array<any> = [];
  lastKey: string = null;

  constructor(public nav: NavController,) {
    firebase.database().ref("products").orderByKey().limitToFirst(50).once("value", snap => {
      snap.forEach(childSnap => {
        this.lastKey = childSnap.key;
        this.products.push({ id: childSnap.key, ...childSnap.val() });
        //console.log(childSnap.val());
      })
    })
  }

  loadData(event) {
    firebase.database().ref("products").orderByKey().startAt(this.lastKey).limitToFirst(50).once("value", snap => {
      event.target.complete();

      if (snap.numChildren() == 1) {
        this.infiniteScroll.disabled = true;
        console.log('end')
      }
      else {
        snap.forEach(childSnap => {

          if (this.lastKey != childSnap.key) {
            this.lastKey = childSnap.key;
            this.products.push({ id: childSnap.key, ...childSnap.val() });
          }
        })
      }
    })
  }

  viewProduct(id, name, img, price, company,category) {
    sessionStorage.setItem("productId", id);
    sessionStorage.setItem("productName", name);
    sessionStorage.setItem("productImg", img);
    sessionStorage.setItem("productPrice", price);
    sessionStorage.setItem("productCompany", company);
    sessionStorage.setItem("productCategory", category);
    this.nav.navigateForward("/product-view/" + id);
  }
}
