import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, Profile } from 'passport-auth0';
import { ConfigService } from '@nestjs/config';
// import { Profile } from 'passport';
import { VerifyCallback } from 'passport-oauth2';

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, 'auth0') {
  constructor( private configService: ConfigService) {
    super(
      {
        domain: configService.get('AUTH0_DOMAIN'),
        clientID: configService.get('AUTH0_CLIENT_ID'),
        clientSecret: configService.get('AUTH0_CLIENT_SECRET'),
        callbackURL: configService.get('AUTH0_CALLBACK_URL'),
        scope: ['openid', 'profile', 'email']
      },
      (
        accessToken: string,
        refreshToken: string,
        params: any,
        profile: Profile,
        done: VerifyCallback,
      ) => {
        const { expires_in, id_token } = params;
        const { user_id, nickname, email, picture, email_verified } = profile._json;
    
        const user = {
          providerAccountId: user_id,
          email: email,
          email_verified,
          firstName: nickname,
          picture: picture,
          accessToken,
          refreshToken,
          id_token,
          expires_in,
        };
        
        done(null, user);
      },
    );
  }
}