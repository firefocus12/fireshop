import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as firebase from "firebase";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  categories: Array<any> = [
    {
      name: "Lifestyle",
      icon: "heart-outline",
      color: "danger"
    },
    {
      name: "Entertainment",
      icon: "tv-outline",
      color: "success"
    }
    ,
    {
      name: "Fitness",
      icon: "walk-outline",
      color: "warning"
    },
    {
      name: "Medical",
      icon: "medical-outline",
      color: "secondary"
    }
  ]
  constructor(public nav: NavController) { }

  ngOnInit() {
  }

  exploreCategory(name) {
    sessionStorage.setItem("categoryName", name);
    this.nav.navigateForward("/category");
  }

}
