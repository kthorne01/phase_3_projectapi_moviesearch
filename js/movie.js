export default class Movie {
    //passing movie data as an argument into the constructor right here bc......
    //it allows us to use the variable in any other methods in our class
  constructor(stateManager, movieData) {
    this.stateManager = stateManager;
    this.movieData = movieData;
    //making notes not show by default
    this.showComments = false;
  }

  attachMovieToDOM(parentElement) {
    //creates and adds a movie to the DOM
    const html = this.toHTML(this.movieData);
    parentElement.insertAdjacentHTML("beforeend", html);

    //attach an event handler to the like button
    const likeButtonSelector = `#like_${this.movieData.imdbID}`;
    document
      .querySelector(likeButtonSelector)
      .addEventListener("click", this.like.bind(this));
  }

  toHTML(data) {
    //this is what's drawing each movie
    //returns an HTML representation of the JSON data
    //template instructing how to display the html...
    //(where we want to put the template)
    const movieTemplate = `
        <h2>${data.Title}</h2> 
        <p>${data.Year}</p>
        <img src="${data.Poster}"/> 
        <p>${data.Plot}</p>

        <button class="like" id="like_${data.imdbID}">Like</button>
        ${this.getCommentsForm()}
      `;
    return movieTemplate;
  }

  getCommentsForm() {
    if(this.stateManager.showComments) {
      return `
        <div>
            <label>Comments</label>
            // ||'' <== this is what got rid of the word "undefined" in the text box"
            <textarea>${this.movieData.comments ||''}</textarea>
        <div>    
      `;
    } else {
        return '';
    }
  }

  like() {
    //notifies the state mgr that it wants to save....
    //this.movieData data to the  DB
    console.log('Like: add this data to the indexedDB');
    this.stateManager.notify('like-requested', this.movieData)
  }

  saveComment() {
    //updates comment after user adds some notes
  }
}
