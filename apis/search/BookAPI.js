import { BaseAPI } from "./BaseAPI";

export class BookAPI extends BaseAPI {
    constructor(query){
        super();
        this.url += "/book.json";
        this.url += "?query=" + query
    }
}