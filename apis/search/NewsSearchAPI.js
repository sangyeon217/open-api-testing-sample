import { SearchAPI } from "./SearchAPI";

export class NewsSearchAPI extends SearchAPI {
  constructor(query) {
    super();
    this.url += "/news.json";
    this.url += "?query=" + query;
  }
}
