import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
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
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfilePage implements OnInit {
  strProfilePageSession;
  strThisSession;
  strWorkforce;
  strError;
  strThisUserInfo;
  public authService = new OktaAuth(this.OktaClientService.config);

  constructor(public menu: MenuController, public OktaClientService: OktaClientService,
    public alertController: AlertController, public OktaConfigService: OktaConfigService,
    public OktaApiEnpointsService: OktaApiEnpointsService, public GetUserinfoService: GetUserinfoService) { }

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


  async ngOnInit() {
    let noAuth;
    var CheckUserSession = await this.authService.token.getUserInfo()
      .then(function (user) {
        //console.log(user)
        noAuth = true
        return noAuth
      })
      .catch((error) => {
        //console.log(error);
        noAuth = false
        return noAuth
      });
    this.authService.tokenManager.getTokens()
      .then(({ accessToken, idToken }) => {
        // handle accessToken and idToken
        console.log(accessToken);
        return accessToken;
      })
      .catch(function (err) {
        // handle OAuthError or AuthSdkError (AuthSdkError will be thrown if app is in OAuthCallback state)

      });
    console.log(CheckUserSession);
    switch (CheckUserSession) {
      case false:
        // If the user is not logged and gets to this page, redirect them back to the home login page
        this.Notloggedin();
        window.location.replace(this.OktaConfigService.strPostLogoutURL)
        break;

      case true:
        this.authService.authStateManager.subscribe((authState) => {
          // handle the latest evaluated authState, like integrate with client framework's state management store
          console.log(authState)
        });

        ///this works in Studio///
        this.strProfilePageSession = await this.authService.tokenManager.getTokens();
        //console.log(this.OktaApiEnpointsService.strUserMe);
        console.log(this.strProfilePageSession.accessToken.value);
        ///this works in Studio///
        this.GetUserinfoService.GetMe(this.OktaConfigService.strBaseURI + this.OktaApiEnpointsService.strUserMe, this.strProfilePageSession.accessToken.value); 
    } 
  }
}
