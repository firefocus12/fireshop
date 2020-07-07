import { Component, OnInit } from '@angular/core';
import { codes } from "../country_codes";
import { NavController } from "@ionic/angular";

@Component({
  selector: 'app-country-codes',
  templateUrl: './country-codes.page.html',
  styleUrls: ['./country-codes.page.scss'],
})
export class CountryCodesPage implements OnInit {

  countries: Array<any> = codes;

  constructor(public nav: NavController) { }

  ngOnInit() {
  }

  selectCode(code) {
    sessionStorage.setItem("code", code);
    this.nav.pop();
  }

  search(evt) {
    var key: string = evt.target.value;

    //Re-initialize countries array on each input
    this.countries = codes;

    if (key.length > 0) {
      this.countries = this.countries.filter(x => {
        let name: string = x.name;
        let code: string = x.dial_code;

        return name.toLowerCase().includes(key.toLowerCase()) || code.toLowerCase().includes(key.toLowerCase());
      })

    }
    else {
      this.countries = codes;
    }
  }
}
