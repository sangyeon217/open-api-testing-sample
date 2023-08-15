import { BaseAPI } from "./BaseAPI";

export class NewsAPI extends BaseAPI {
    constructor(query){
        super();
        this.url += "/news.json";
        this.url += "?query=" + query
    }
}