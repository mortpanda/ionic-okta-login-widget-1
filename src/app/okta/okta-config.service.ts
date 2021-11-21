import { Injectable } from '@angular/core';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

@Injectable({
  providedIn: 'root'
})
export class OktaConfigService {
  constructor() { }

//Localhost
strBaseURI = 'https://kent-nagao-test.oktapreview.com';  
//strRedirectURL = 'https://localhost:4200/okta-login-widget-1/home';
strRedirectURL = 'https://localhost:4200/okta-login-widget-1/profile';
strClientID = '0oa1xjkrp11jbGS0N1d7';
strIssuer = 'https://kent-nagao-test.oktapreview.com/';
strPostLogoutURL = 'https://localhost:4200/okta-login-widget-1/home';
strScope = ['openid', 'email', 'profile','address','okta.users.read.self','okta.users.manage.self'];
strResponseType = ['token','id_token'];
strResponseMode = 'fragment';
strPrompt = ['consent','login'];
strPkce = false;
strLang = 'ja';
strBrand =  '#FFFFFF';
strLogo = "assets/img/oktajapan.png";

//AS Rock
// strBaseURI = 'https://kent-nagao-test.oktapreview.com';  
// strRedirectURL = 'https://192.168.1.210:4200/okta-login-widget-1/profile';
// strClientID = '0oa1xjkrp11jbGS0N1d7';
// strIssuer = 'https://kent-nagao-test.oktapreview.com/';
// strPostLogoutURL = 'https://192.168.1.210:4200/okta-login-widget-1/home';
// strScope = ['openid', 'email', 'profile','address'];
// strResponseType = ['token','id_token'];
// strResponseMode = 'fragment';
// strPrompt = ['consent','login'];
// strPkce = false;
// strLang = 'ja';
// strBrand =  '#FFFFFF';
// strLogo = "assets/img/oktajapan.png";


}


