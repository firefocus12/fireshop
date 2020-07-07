import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import { NavController, AlertController } from '@ionic/angular';
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.page.html',
  styleUrls: ['./product-view.page.scss'],
})
export class ProductViewPage implements OnInit {

  productId: string;
  productName: string;
  productImg: string;
  productPrice: string;
  productCompany: string;
  productCategory: string;
  cartText: string;

  segment: string = "relatedProducts";

  related: Array<any> = [];
  from: Array<any> = [];

  constructor(public nav: NavController, public alertCtrl: AlertController) {
    this.productId = sessionStorage.getItem("productId");
    this.productName = sessionStorage.getItem("productName");
    this.productImg = sessionStorage.getItem("productImg");
    this.productPrice = sessionStorage.getItem("productPrice");
    this.productCompany = sessionStorage.getItem("productCompany");
    this.productCategory = sessionStorage.getItem("productCategory");

    if (localStorage.getItem("carts")) {
      let carts: Array<any> = JSON.parse(localStorage.getItem("carts"));
      let index = carts.findIndex(x => x.id == this.productId);
      if (index == -1) {
        this.cartText = "Add to Cart";
      }
      else {
        this.cartText = "Added";
      }
    }
    else {
      this.cartText = "Add to Cart";
    }

    //Related Products
    firebase.database().ref("products").orderByChild("category").equalTo(this.productCategory).limitToFirst(10).once("value", snap => {
      snap.forEach(childSanp => {
        if (childSanp.key != this.productId) {
          this.related.push({ id: childSanp.key, ...childSanp.val() });
        }
      });
    });

  }

  ngOnInit() {
  }

  changeSeg() {
    if (this.segment == "fromCompany") {
      if (this.from.length == 0) {
        //Products from this company
        firebase.database().ref("products").orderByChild("company").equalTo(this.productCompany).limitToFirst(10).once("value", snap => {
          snap.forEach(childSanp => {
            if (childSanp.key != this.productId) {
              this.from.push({ id: childSanp.key, ...childSanp.val() });
            }
          });
        });
      }
    }
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

  addToCart() {
    let carts: Array<any> = [];
    if (localStorage.getItem("carts")) {
      carts = JSON.parse(localStorage.getItem("carts"));

      let index = carts.findIndex(x => x.id == this.productId);
      if (index == -1) {
        this.cartText = "Added";
        var obj = {
          id: this.productId,
          name: this.productName,
          img: this.productImg,
          price: this.productPrice,
          company: this.productCompany,
          category: this.productCategory,
        }

        carts.push(obj);
      }
      else {
        carts.splice(index, 1);
        this.cartText = "Add to Cart";
      }
    }
    else {
      this.cartText = "Added";
      var obj = {
        id: this.productId,
        name: this.productName,
        img: this.productImg,
        price: this.productPrice,
        company: this.productCompany,
        category: this.productCategory,
      }

      carts.push(obj);
    }

    localStorage.setItem("carts", JSON.stringify(carts));
  }

  async buyNow() {
    const alertDialog = await this.alertCtrl.create({
      header: "Place Order",
      message: "Are you sure to order this?",
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Yes",
          handler: () => {
            var obj = {
              id: this.productId,
              name: this.productName,
              img: this.productImg,
              price: this.productPrice,
              company: this.productCompany,
              category: this.productCategory,
            }
            let uid = localStorage.getItem("uid");
            firebase.database().ref("orders/" + uid).push(obj).then(() => {
              this.nav.pop();
            })
          }
        }
      ]
    });

    alertDialog.present();
  }
}
