import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountryCodesPage } from './country-codes.page';

const routes: Routes = [
  {
    path: '',
    component: CountryCodesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountryCodesPageRoutingModule {}
