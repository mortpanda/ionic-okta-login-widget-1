import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { OktaAuth } from "@okta/okta-auth-js";
import { BehaviorSubject } from "rxjs";
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import { OktaConfigService } from './okta-config.service';
@Injectable({
  providedIn: 'root'
})
export class OktaWidgetService {
  private authClient = new OktaAuth({
    issuer: this.OktaConfigService.strIssuer,
    clientId: this.OktaConfigService.strClientID,
  });
  public isAuthenticated = new BehaviorSubject<boolean>(false);
  public strstateToken;
  public oktaSignIn;
  public idToken;
  public LogoutURI = this.OktaConfigService.strPostLogoutURL;
  //public strLoggedinUser;

  constructor(private router: Router, public OktaConfigService: OktaConfigService) { }

  async checkAuthenticated() {
    const authenticated = await this.authClient.session.exists();
    this.isAuthenticated.next(authenticated);
    return authenticated;
  }

  async login() {
    const OktaClientID = this.OktaConfigService.strClientID;
    const OktaBaseURI = this.OktaConfigService.strBaseURI;
    const OktaLang = this.OktaConfigService.strLang;
    const OktaRedirect = this.OktaConfigService.strRedirectURL;
    const OktaBrand = this.OktaConfigService.strBrand;
    const OktaPostlogoutURI = this.OktaConfigService.strPostLogoutURL;
    const OktaIssuer = this.OktaConfigService.strIssuer;
    const OktaScope = this.OktaConfigService.strScope;
    const OktaResType = this.OktaConfigService.strResponseType;
    const OktaResMode = this.OktaConfigService.strResponseMode;
    const OktaWidgetLogo = this.OktaConfigService.strLogo;
    var oktaSignIn = new OktaSignIn({
      logo: OktaWidgetLogo,
      clientId: OktaClientID,
      baseUrl: OktaBaseURI,
      language: OktaLang,
      redirectUri: OktaRedirect,
      colors: {
        brand: OktaBrand,
      },
      postLogoutRedirectUri: OktaPostlogoutURI,
      authParams: {
        issuer: OktaIssuer,
        responseMode: 'fragment',
        responseType: OktaResType,
        scopes: OktaScope,
        pkce: false,
        prompt: OktaResMode
      },
    });

    oktaSignIn.authClient.token.getUserInfo().then(function (user) {
      console.log("Hello, " + user.email + "! You are *still* logged in! :)");
      window.location.replace(OktaRedirect);
      //this.strLoggedinUser = user.email;
    }, function (error) {
      oktaSignIn.showSignInToGetTokens({
        el: '#okta-signin-container'
      }).then(function (tokens) {
        oktaSignIn.authClient.tokenManager.setTokens(tokens);
        oktaSignIn.remove();

        const idToken = tokens.idToken;
        const accessToken = tokens.accessToken;
        console.log("Hello, " + idToken.claims.email + "! You just logged in! :)");
        window.location.replace(OktaRedirect);
        //this.strLoggedinUser = idToken.claims.email;
        // console.log(idToken);
        // console.log(accessToken);
        return oktaSignIn.authClient.token.getUserInfo(accessToken, idToken)
          .then(function (user) {
            // user has details about the user
            console.log(user);
            // console.log(JSON.stringify(user));
            ////window.location.replace(window.location.origin);
            //console.log(this.OktaConfig.strRedirectURL);
            //window.location.replace(this.OktaConfig.strRedirectURL);
            //window.location.replace("/profile");
            //  window.location.replace(OktaRedirect);
          })
          .catch(function (err) {
            console.error(err);
            // handle OAuthError or AuthSdkError (AuthSdkError will be thrown if app is in OAuthCallback state)
          });

      }).catch(function (err) {
        console.error(err);
      });
    });

  }

  CloseWidget() {
    const OktaClientID = this.OktaConfigService.strClientID;
    const OktaBaseURI = this.OktaConfigService.strBaseURI;
    const OktaLang = this.OktaConfigService.strLang;
    const OktaRedirect = this.OktaConfigService.strRedirectURL;
    const OktaBrand = this.OktaConfigService.strBrand;
    const OktaPostlogoutURI = this.OktaConfigService.strPostLogoutURL;
    const OktaIssuer = this.OktaConfigService.strIssuer;
    const OktaScope = this.OktaConfigService.strScope;
    const OktaResType = this.OktaConfigService.strResponseType;
    const OktaResMode = this.OktaConfigService.strResponseMode;
    var oktaSignIn = new OktaSignIn({
      clientId: OktaClientID,
      baseUrl: OktaBaseURI,
      language: OktaLang,
      redirectUri: OktaRedirect,
      colors: {
        brand: OktaBrand,
      },
      postLogoutRedirectUri: OktaPostlogoutURI,
      authParams: {
        issuer: OktaIssuer,
        responseMode: 'fragment',
        responseType: OktaResType,
        scopes: OktaScope,
        pkce: false,
        prompt: OktaResMode
      },
    });
    oktaSignIn.remove();

  }

}
