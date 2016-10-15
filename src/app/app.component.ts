import {Component} from '@angular/core';
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {JokerService} from "./joker.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    freshList:any[];
    hotList:any[];
    fresh:FirebaseListObservable<any>;
    // hot:FirebaseListObservable<any>;
    jokes:any[] = [];
    query:string = 'cowboy';
    constructor(public af: AngularFire, public joker: JokerService) {
        // this.hot = af.database.list('allJokes/hot');
        // this.hot.subscribe((hot) => { this.hotList = hot.sort((a,b) => b.votes - a.votes); })
        this.fresh = af.database.list('allJokes/fresh');
        this.fresh.subscribe((fresh) => {
            this.freshList = fresh.concat([]).sort((a,b) => b.timeAdded - a.timeAdded);;
            this.hotList = fresh.concat([]).sort((a,b) => b.votes - a.votes);;
        })
    }

    makeJoke() {
        this.joker.makeJoke(this.query, (jokes) => this.jokes = jokes);
    }

    acceptJoke(joke:string) {
        this.fresh.push({
            timeAdded: new Date().getTime() / 1000,
            votes: 1,
            actualJoke: joke
        })
    }

    upvote(category:string, joke:any) {
        let jokes:FirebaseListObservable<any> = this[category];
        jokes.update(joke.$key, {votes: joke.votes + 1})
    }
    remove(category:string, joke:any) {
        let jokes:FirebaseListObservable<any> = this[category];
        jokes.remove(joke.$key)
    }
}
