import Movie from './movie.js';

export default class MovieList{

    constructor(stateManager) {
        this.stateManager = stateManager;
        this.stateManager.subscribe('found-movie', this.drawMoviesToScreen.bind(this));
    }

    //this method draws/displays all movies to the screen
    //function executes when the server gives back a movie result after...
    // user clicks search
    drawMoviesToScreen(movieDataList) {
        console.log(movieDataList);
        
        for (let i = 0; i < movieDataList.length; i++) {

            //creating the movie object 
            const movie = new Movie(this.stateManager, movieDataList[i]);

            //the region of the HTML that we want to add our movie
            const parentElement = document.querySelector(".movies");

            //attach the movie to the DOM
            movie.attachMovieToDOM (parentElement);

            //get html representation from movie data:
            // const html = movie.toHTML(movieDataList[i]);

            //inserts html representing a single movie into the DOM:
            //document.querySelector(".movies").insertAdjacentHTML('beforeend', html);
        }
    }
}