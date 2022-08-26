import Movie from "./movie.js";

export default class MovieList {
  constructor(stateManager) {
    this.stateManager = stateManager;
    this.stateManager.subscribe("clear-all", this.clear.bind(this));
    this.stateManager.subscribe("favorites-loaded", this.drawMoviesToScreen.bind(this));
    this.stateManager.subscribe("found-movie", this.drawMoviesToScreen.bind(this));
    this.stateManager.subscribe("redraw", this.drawMoviesToScreen.bind(this));
  }

  //this method draws/displays all movies to the screen
  //function executes when the server gives back a movie result after...
  // user clicks search
  drawMoviesToScreen(movieDataList) {
    console.log(movieDataList);
    this.clear();

    //the region of the HTML that we want to add our movie
    const parentElement = document.querySelector(".movies");

    for (let i = 0; i < movieDataList.length; i++) {
      //creating the movie object
      const movie = new Movie(this.stateManager, movieDataList[i]);

      //attach the movie to the DOM
      movie.attachMovieToDOM(parentElement);

      //get html representation from movie data:
      // const html = movie.toHTML(movieDataList[i]);

      //inserts html representing a single movie into the DOM:
      //document.querySelector(".movies").insertAdjacentHTML('beforeend', html);
    }
    //adding the show notes button to the top
    let buttonText = "View Notes";
    if(this.stateManager.showComments) {
      buttonText = "Hide Notes";
    }

    const buttonHTML = `<button id="show-comments">${buttonText}</button>`;
    parentElement.insertAdjacentHTML("afterbegin", buttonHTML);

    document
      .querySelector("#show-comments")
      .addEventListener("click", this.toggleComments.bind(this));
  }

  toggleComments(ev) {
    ev.preventDefault();
    const btn = document.querySelector("#show-comments");
    if(this.stateManager.showComments) {
      //notify the state manager
      this.stateManager.notify("show-comments", false);
    } else {
      //notify the state manager
      this.stateManager.notify("show-comments", true);
    }
  }

  //this method clears out our selection
  clear() {
    document.querySelector(".movies").innerHTML = "";
  }
}
