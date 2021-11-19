import { Injectable } from '@angular/core';
import { OktaClientService } from '../okta/okta-client.service';
import { OktaConfigService } from '../okta/okta-config.service';
import { OktaApiEnpointsService } from '../okta/okta-api-enpoints.service';
import {
  OktaAuth,
  OktaAuthOptions,
  TokenManager,
  AccessToken,
  IDToken,
  UserClaims,
  TokenParams
} from '@okta/okta-auth-js'

@Injectable({
  providedIn: 'root'
})
export class GetUserinfoService {
  strThisUserInfo;
  strThisSession;
  strUserID;
  private authService = new OktaAuth(this.OktaClientService.config);

  constructor(private OktaClientService: OktaClientService, private OktaConfigService: OktaConfigService, private OktaApiEnpointsService: OktaApiEnpointsService) { }

  UserGivenName;
  UserLastName;
  UserEmail;
  strFullname;
  UserStreetAddress;
  UserLocality;
  UserCountry;
  UserZip;
  UserCIAM;
  UserWF;
  UserStatus: any;
  UserPasswordLastChanged;
  UserCreatedDate;
  UserVerifiedEMail;
  UserCredType;
  UserCredName;
  
  async GetMe(url, token) {
    const thisFetch = fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json',
      },

    })
      .then(response => response.json())
    this.strThisUserInfo = await thisFetch;
    console.log('Getting me using service')
    console.log(this.strThisUserInfo);
    this.strUserID = this.strThisUserInfo.id;
    this.UserGivenName = this.strThisUserInfo.profile.firstName;
    this.UserLastName = this.strThisUserInfo.profile.lastName;
    this.strFullname = this.UserGivenName + " " + this.UserLastName;
    this.UserStreetAddress = this.strThisUserInfo.profile.streetAddress;
    this.UserLocality = this.strThisUserInfo.profile.city;
    this.UserCountry = this.strThisUserInfo.profile.countryCode;
    this.UserZip = this.strThisUserInfo.profile.zipCode;
    this.UserCIAM = this.strThisUserInfo.profile.ciam;
    this.UserWF = this.strThisUserInfo.profile.workforce;
    this.UserStatus = this.strThisUserInfo.status;
    this.UserPasswordLastChanged = this.strThisUserInfo.passwordChanged;
    this.UserCreatedDate = this.strThisUserInfo.created;
    this.UserVerifiedEMail = this.strThisUserInfo.credentials.emails[0].status;
    this.UserCredType = this.strThisUserInfo.credentials.provider.type;
    this.UserCredName = this.strThisUserInfo.credentials.provider.name;
    this.UserEmail = this.strThisUserInfo.profile.email;
  }

  async GetUserInfo() {
    this.strThisSession = await this.authService.token.getWithoutPrompt();
    this.GetMe(this.OktaConfigService.strBaseURI + this.OktaApiEnpointsService.strUserMe, this.strThisSession.tokens.accessToken.accessToken);
  }



}
