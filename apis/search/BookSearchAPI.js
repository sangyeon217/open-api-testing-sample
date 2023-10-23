import { SearchAPI } from "./SearchAPI";

export class BookSearchAPI extends SearchAPI {
  constructor(query) {
    super();
    this.url += "/book.json";
    this.url += "?query=" + query;
  }
}
