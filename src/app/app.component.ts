import {Component} from '@angular/core';
import {AngularFire, FirebaseListObservable} from "angularfire2";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    freshList:any[];
    hotList:any[];
    fresh:FirebaseListObservable<any>;
    hot:FirebaseListObservable<any>;
    constructor(public af: AngularFire) {
        this.hot = af.database.list('allJokes/hot');
        this.hot.subscribe((hot) => { this.hotList = hot.sort((a,b) => b.votes - a.votes); })
        this.fresh = af.database.list('allJokes/fresh');
        this.fresh.subscribe((fresh) => { this.freshList = fresh.sort((a,b) => b.timeAdded - a.timeAdded);; })
    }

    upvote(category:string, joke:any) {
        let jokes:FirebaseListObservable<any> = this[category];
        jokes.update(joke.$key, {votes: joke.votes + 1})
    }
}
