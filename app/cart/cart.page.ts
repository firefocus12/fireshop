import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
//Popover component
import { PlaceOrderPage } from "../place-order/place-order.page";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  products: Array<any> = [];


  constructor(public nav: NavController, public popoverCtrl: PopoverController) {
    if (localStorage.getItem("carts")) {
      this.products = JSON.parse(localStorage.getItem("carts"));
    }

    setInterval(() => {
      if (localStorage.getItem("carts")) {
        this.products = JSON.parse(localStorage.getItem("carts"));
      }
    }, 100);
  }

  ngOnInit() {
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

  goto() {
    this.nav.navigateRoot("/");
  }

  async placeOrder() {
    const popover = await this.popoverCtrl.create({
      component: PlaceOrderPage
    });
    
    popover.present();
  }
}
