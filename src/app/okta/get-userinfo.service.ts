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
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetUserinfoService {
  strThisUserInfo;
  strThisSession;
  strUserID;
  private authService = new OktaAuth(this.OktaClientService.config);

  constructor(private OktaClientService: OktaClientService, private OktaConfigService: OktaConfigService,
    private OktaApiEnpointsService: OktaApiEnpointsService, private HttpClient: HttpClient) { }

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
    let headers = new HttpHeaders()
    headers = headers.set('content-type', 'application/json')
    headers = headers.set('Authorization', 'Bearer ' + token)
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Access-Control-Allow-Origin', '*')
    headers = headers.set('Access-Control-Allow-Origin', '*');
    headers = headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');

    
    this.strThisUserInfo = await this.HttpClient.get(url, { headers: headers })

      .toPromise()
      .then(data => {
        
        console.log(data)
        //...
        return data;

      }).catch(function (err) {
        console.log('Error!');
      });

    console.log(this.strThisUserInfo);
    this.strUserID = this.strThisUserInfo.id;
    this.UserGivenName = this.strThisUserInfo.profile.firstName;
    this.UserLastName = this.strThisUserInfo.profile.lastName;
    this.strFullname = this.UserGivenName + " " + this.UserLastName;
    this.UserStreetAddress = this.strThisUserInfo.profile.streetAddress;
    this.UserLocality = this.strThisUserInfo.profile.city;
    this.UserCountry = this.strThisUserInfo.profile.countryCode;
    this.UserZip = this.strThisUserInfo.profile.zipCode;
    const strCIAM = this.strThisUserInfo.profile.ciam;
    const strWF = this.strThisUserInfo.profile.workforce;
    this.UserStatus = this.strThisUserInfo.status;
    this.UserPasswordLastChanged = this.strThisUserInfo.passwordChanged;
    this.UserCreatedDate = this.strThisUserInfo.created;
    this.UserVerifiedEMail = this.strThisUserInfo.credentials.emails[0].status;
    this.UserCredType = this.strThisUserInfo.credentials.provider.type;
    this.UserCredName = this.strThisUserInfo.credentials.provider.name;
    this.UserEmail = this.strThisUserInfo.profile.email;

    switch (strCIAM) {
      case true:
        this.UserCIAM = false;
        break;
      case false:
        this.UserCIAM = true;
        break;
    }

    switch (strWF) {
      case true:
        this.UserWF = false;
        break;
      case false:
        this.UserWF = true;
        break;
    };
  }

  
}
