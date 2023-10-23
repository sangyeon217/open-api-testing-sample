import { AuthAPI } from "./AuthAPI";

export class AuthTokenAPI extends AuthAPI {
  constructor({
    grantType,
    clientId,
    clientSecret,
    redirectURI,
    code,
    state,
    accessToken = "",
  }) {
    super();
    this.url += `/token?grant_type=${grantType}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectURI}&code=${code}&state=${state}`;
    if (grantType == "delete") {
      this.url += `&access_token=${accessToken}&service_provider=NAVER`;
    }
  }
}
