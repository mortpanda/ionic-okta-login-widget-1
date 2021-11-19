import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { ViewEncapsulation } from '@angular/core';
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
import { AlertController } from '@ionic/angular';
import { OktaConfigService } from '../okta/okta-config.service';
import { OktaApiEnpointsService } from '../okta/okta-api-enpoints.service';
import { GetUserinfoService } from '../okta/get-userinfo.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfilePage implements OnInit {
  strUserSession;
  strThisSession;
  strWorkforce;
  private authService = new OktaAuth(this.OktaClientService.config);

  constructor(private menu: MenuController, private OktaClientService: OktaClientService,
    public alertController: AlertController, private OktaConfigService: OktaConfigService,
    private OktaApiEnpointsService: OktaApiEnpointsService, private GetUserinfoService: GetUserinfoService) { }


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
        // If the user is not logged and gets to this page, redirect them back to the home login page
        this.Notloggedin();
        window.location.replace(this.OktaConfigService.strPostLogoutURL)
        break;

      case true:
        this.strThisSession = await this.authService.token.getWithoutPrompt();
        this.GetUserinfoService.GetMe(this.OktaConfigService.strBaseURI + this.OktaApiEnpointsService.strUserMe, this.strThisSession.tokens.accessToken.accessToken);
        

        break;

    }
  }

  async Notloggedin() {
    const alert = await this.alertController.create({
      cssClass: 'notLoggedinAlert',
      header: 'エラー',
      //subHeader: 'Subtitle',
      message: 'ログインしてません。ログインして再度プロファイルページを開いてください。',
      buttons: ['OK']
    });

    await alert.present();
  }

  
  // navigateTo()
  // {
  //   //console.log("Next Clicked")
  //   this.CIAMChecked = true;
  //   console.log(this.CIAMChecked)
  // }
}
