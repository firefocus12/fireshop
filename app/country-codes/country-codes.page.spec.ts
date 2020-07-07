import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CountryCodesPage } from './country-codes.page';

describe('CountryCodesPage', () => {
  let component: CountryCodesPage;
  let fixture: ComponentFixture<CountryCodesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryCodesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CountryCodesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
