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
    public OktaApiEnpointsService: OktaApiEnpointsService, public GetUserinfoService: GetUserinfoService,
    public HttpClient: HttpClient) { }

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


  async GetMe(url, token) {


    let headers = new HttpHeaders(token)
    headers = headers.set('content-type', 'application/json')
    headers = headers.set('Authorization', 'Bearer ' + token)
    headers = headers.set('Accept', 'application/json')
    // headers = headers.set('Origin', 'this.OktaConfigService.strOrigin')
    // headers = headers.set('Sec-Fetch-Site', 'same-origin')
    console.log(headers)

    this.HttpClient.get(url, { headers: headers })
      .toPromise()
      .then(data => {
        console.log(data)
        //...
        return data;
      });

    // const thisFetch = fetch(url, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + token,
    //     'Accept': 'application/json',
    //     'Origin': this.OktaConfigService.strOrigin,
    //     'Sec-Fetch-Site' : 'same-origin',
    //   },

    // })

    //   .then(response => response.json())
    // this.strThisUserInfo = await thisFetch;
    // console.log('Getting me using service')
    // console.log(this.strThisUserInfo)


  }

  async ngOnInit() {
    //let noAuth;
    // var CheckUserSession = await this.authService.token.getUserInfo()
    //   .then(function (user) {
    //     //console.log(user)
    //     noAuth = true
    //     return noAuth
    //   })
    //   .catch((error) => {
    //     //console.log(error);
    //     noAuth = false
    //     return noAuth
    //   });
    this.authService.tokenManager.getTokens()
      .then(({ accessToken, idToken }) => {
        // handle accessToken and idToken
        console.log(accessToken);
        return accessToken;
      })
      .catch(function (err) {
        // handle OAuthError or AuthSdkError (AuthSdkError will be thrown if app is in OAuthCallback state)
        //console.error(err);
        //return err
      });
    // console.log(CheckUserSession);
    // switch (CheckUserSession) {
    //   case false:
    //     // If the user is not logged and gets to this page, redirect them back to the home login page
    //     this.Notloggedin();
    //     window.location.replace(this.OktaConfigService.strPostLogoutURL)
    //     break;

    // case true:
    // this.authService.authStateManager.subscribe((authState) => {
    //   // handle the latest evaluated authState, like integrate with client framework's state management store
    //   console.log(authState)
    // });  

    ///this works in Studio///
    this.strProfilePageSession = await this.authService.tokenManager.getTokens();
    //console.log(this.OktaApiEnpointsService.strUserMe);
    console.log(this.strProfilePageSession.accessToken.value);
    ///this works in Studio///
    //  this.GetUserinfoService.GetMe(this.OktaConfigService.strBaseURI + this.OktaApiEnpointsService.strUserMe, this.strProfilePageSession.accessToken.value);

    this.GetMe(this.OktaConfigService.strBaseURI + this.OktaApiEnpointsService.strUserMe, this.strProfilePageSession.accessToken.value);









    // // access and ID tokens are retrieved automatically from the TokenManager
    // this.authService.token.getWithoutPrompt()
    //   .then(function (user) {
    //     // user has details about the user
    //     console.log(user)
    //     return user;
    //     //return Promise.resolve(this.authService);
    //   })
    //   .catch(function (err) {
    //     console.log('Error!');
    //   });
  }
  //this.strProfilePageSession = await this.authService.tokenManager.getTokens();
  //console.log(this.strProfilePageSession.noAuth);



  //console.log(this.strProfilePageSession.accessToken.value);
  //this.GetUserinfoService.GetMe(this.OktaConfigService.strBaseURI + this.OktaApiEnpointsService.strUserMe, this.strProfilePageSession.accessToken.value);


  // this.authService.token.getWithoutPrompt({
  //   responseType: 'id_token', // or array of types
  //   sessionToken: 'testSessionToken' // optional if the user has an existing Okta session
  // })
  // .then(function(res) {
  //   var tokens = res.tokens;

  //   // Do something with tokens, such as
  //   this.authService.tokenManager.setTokens(tokens);
  // })
  // .catch(function(err) {
  //   // handle OAuthError or AuthSdkError (AuthSdkError will be thrown if app is in OAuthCallback state)
  // });



  // this.strProfilePageSession = await this.authService.session.exists()
  //   .then(function (exists) {
  //     if (exists) {
  //       // logged in
  //       console.log('Session to Okta : ' + exists);
  //       return exists
  //     } else {
  //       // not logged in
  //       console.log('Session to Okta : ' + exists);
  //       return exists
  //     }
  //   }).catch(function (err) {
  //       console.error(err);
  //   });


  // this.strProfilePageSession = await this.authService.session.exists()
  // .then(function (exists) {
  //   console.log(exists)
  // });

  // switch (this.strUserSession) {
  //   case false:
  //     // If the user is not logged and gets to this page, redirect them back to the home login page
  //     this.Notloggedin();
  //     window.location.replace(this.OktaConfigService.strPostLogoutURL)
  //     break;

  //   case true:
  //     // access and ID tokens are retrieved automatically from the TokenManager
  // this.authService.token.getWithoutPrompt()
  //   .then(function (user) {
  //     // user has details about the user
  //     console.log(user)
  //     return user;
  //     //return Promise.resolve(this.authService);
  //   })
  //   .catch(function (err) {
  //     console.log('Error!');
  //   });
  // this.strThisSession = await this.authService.token.getWithoutPrompt();
  // this.GetUserinfoService.GetMe(this.OktaConfigService.strBaseURI + this.OktaApiEnpointsService.strUserMe, this.strThisSession.tokens.accessToken.accessToken);


  //     break;

  // }
}




  // navigateTo()
  // {
  //   //console.log("Next Clicked")
  //   this.CIAMChecked = true;
  //   console.log(this.CIAMChecked)
  // }
//}
