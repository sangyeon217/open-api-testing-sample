import { AuthAPI } from "./AuthAPI";

export class AuthorizeAPI extends AuthAPI {
  constructor({ responseType = "code", clientId, redirectURI, state }) {
    super();
    this.url += `/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectURI}&state=${state}`;
  }
}
