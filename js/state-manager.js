//export default allows class to be imported to other files
/* The state manager's job is to:
 (a) manage the application's data,
 (b) notify components when critical changes have happened, and 
 (c) allow components to notify it that data has changed*/

export default class StateManager {

    constructor() {
        //initialize the data store
        //this is our state
        //when anything concerning these variables changes,.... 
        //we need to notify our components:
        this.movies = [];
        this.searhResults = [];
        this.favorites = [];
        this.subscribers = []; 
        this.searchMode = true;
        this.showNotes = true;
    }

    //A method to read a user's favorites from...
    //IndexedDB when the page first loads.
    loadFavorites() {
    // reads from IndexDB and stores the...
    // data to "this.favorites." Then, notifies...
    // any interested components
    }

    //A method to add a new movie to the user's...
    //favorites and save it to IndexedDB.
    saveMovieToFavorites(movieData) {
    //appends the new movie to this.favorites and...
    //stores in DB
    }

    //A method to notify interested components that something...
    //has changed
    notify(eventName) {
    // loops through all subscribers...
    // and invokes the subscriber's function if they're interested...
    // in the particular event
        for (let i = 0; i < this.subscribers.length; i++) {
            const subscriber = this.subscribers[i];
            const subscriberEvent = subscriber[0];
            const callbackFunction = subscriber[1];

            // is the event that was just fired somethign that...
            // the subscriber is interested in
            if(eventName == subscriberEvent) {
                callbackFunction(data);
            }
        }
    }

    subscribe(eventName, callbackFunction) {
        // when a component wants to subscriber to the statemgr....
        // they need to tell the sm which event they're interested in....
        // and what should happen if that event is fired (callback Function).
        this.subscribers.push([eventName, callbackFunction]);
        // this is a way for the component to listen for...
        // something happening by sm
    }

}