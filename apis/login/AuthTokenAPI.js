import { AuthAPI } from "./AuthAPI";

export class AuthTokenAPI extends AuthAPI {
  constructor({
    grantType,
    clientId,
    clientSecret,
    code = "",
    state = "",
    accessToken = "",
    serviceProvider = "NAVER",
  }) {
    super();
    this.url += `/token?grant_type=${grantType}&client_id=${clientId}&client_secret=${clientSecret}`;

    if (grantType == "authorization_code") {
      this.url += `&code=${code}&state=${state}`;
    } else if (grantType == "delete") {
      this.url += `&access_token=${accessToken}&service_provider=${serviceProvider}`;
    }
  }
}
