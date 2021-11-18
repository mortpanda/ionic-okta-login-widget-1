import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { OktaWidgetService } from '../okta/okta-widget.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private OktaWidgetService: OktaWidgetService) {}

  ngOnInit() {
    this.OktaWidgetService.login();

  }

}
