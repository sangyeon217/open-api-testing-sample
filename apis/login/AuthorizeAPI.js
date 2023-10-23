import { AuthAPI } from "./AuthAPI";

export class AuthorizeAPI extends AuthAPI {
  constructor({ clientId, redirectURI, state }) {
    super();
    this.url += `/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectURI}&state=${state}`;
  }
}
