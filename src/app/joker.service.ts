import {Injectable} from '@angular/core';
import {Http, Jsonp, URLSearchParams} from "@angular/http";

@Injectable()
export class JokerService {

    constructor(private jsonp: Jsonp) {

    }

    makeJoke(query:string, callback:Function) {
        this.getSuggestions(query, (suggestions:string[]) => {
            // do josephs amazing joke creation logic
            let jokes = suggestions.map(suggestion => {
                let suggestionMinusQuery = suggestion.replace(query + " ", '').replace(query + "s ", "");
                return `He's such a good salesman he could sell ${suggestionMinusQuery} to a ${query}`;
            })
            callback(jokes);
        })
    }

    getSuggestions(query:string, callback:Function) {
        let url = "//suggestqueries.google.com/complete/search";
        let queryString =
            `?q=${query}&client=youtube&format=json&hl=en&callback=JSONP_CALLBACK`;
        return this.jsonp
            .get(url + queryString)
            .subscribe((data:any) => {
                callback(data._body[1].map((weirdThing) => weirdThing[0]));
            })
    }

}
