import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ViewEncapsulation } from '@angular/core';
import { OktaClientService } from './okta/okta-client.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(private menu: MenuController, private OktaClientService: OktaClientService) { }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  LogOut() {
    this.OktaClientService.OktaClient.signOut();
  }

 
  

}