import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { OktaWidgetService } from '../okta/okta-widget.service';
import { OktaClientService } from '../okta/okta-client.service';
import {
  OktaAuth,
  OktaAuthOptions,
  TokenManager,
  AccessToken,
  IDToken,
  UserClaims,
  TokenParams
} from '@okta/okta-auth-js'


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  strUserSession;
  private authService = new OktaAuth(this.OktaClientService.config);
  strMe;
  constructor(private OktaWidgetService: OktaWidgetService, private OktaClientService: OktaClientService) { }

  async ngOnInit() {
    this.strUserSession = await this.authService.session.exists()
      .then(function (exists) {
        if (exists) {
          // logged in
          console.log('Session to Okta : ' + exists);
          return exists
        } else {
          // not logged in
          console.log('Session to Okta : ' + exists);
          return exists
        }
      });
    switch (this.strUserSession) {
      case false:
        this.OktaWidgetService.login();

        break;

      case true:
        window.location.replace(this.OktaClientService.config.redirectUri);
        break;

    }


  }

}
