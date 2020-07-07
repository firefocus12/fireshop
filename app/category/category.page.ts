import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from "firebase";
import { IonInfiniteScroll, NavController } from '@ionic/angular';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  categoryName: string;
  products: Array<any> = [];
  lastKey: string;

  constructor(public nav:NavController) {
    this.categoryName = sessionStorage.getItem("categoryName");

    firebase.database().ref("products").orderByChild("category").equalTo(this.categoryName).limitToFirst(20).once("value", snap => {
      snap.forEach(childSanp => {
        this.lastKey = childSanp.key;
        this.products.push({ id: childSanp.key, ...childSanp.val() });
      });
    });
  }

  ngOnInit() {
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

  viewProduct(id, name, img, price, company, category) {
    sessionStorage.setItem("productId", id);
    sessionStorage.setItem("productName", name);
    sessionStorage.setItem("productImg", img);
    sessionStorage.setItem("productPrice", price);
    sessionStorage.setItem("productCompany", company);
    sessionStorage.setItem("productCategory", category);
    this.nav.navigateForward("/product-view/" + id);
  }
}
