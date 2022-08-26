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

//**************************************************** */
    if (this.stateManager.showComments) {
      //attach an event handler to the save button:
      const saveButtonSelector = `#save_${this.movieData.imdbID}`;
      console.log(saveButtonSelector);
      document.querySelector(saveButtonSelector).addEventListener('click', this.save.bind(this));
    }
  }
//************************************************* */


  toHTML(data) {
    //this is what's drawing each movie
    //returns an HTML representation of the JSON data
    //template instructing how to display the html...
    //(where we want to put the template)
    const movieTemplate = `
        <h2>${data.Title}</h2> 
        <p>${data.Year}</p>
        <p>Rated: ${data.Rated}</p>
        <p>Released: ${data.Released}</p>
        <img src="${data.Poster}"/> 
        <p>${data.Plot}</p>

        <button class="like" id="like_${data.imdbID}">Save to Favorites</button>
        ${this.getCommentsForm()}
      `;
    return movieTemplate;
  }

  //// ||'' <== this is what got rid of the word "undefined" in the text box" line 57
  getCommentsForm() {
    if(this.stateManager.showComments) {
      return `
        <div>
            <label>Notes</label>
            <textarea id="comment_${this.movieData.imdbID}">${this.movieData.notes ||''}</textarea>
            <button id="save_${this.movieData.imdbID}">Save</button>
        <div>    
      `;
    } else {
        return '';
    }
  }

  like(ev) {
    //notifies the state mgr that it wants to save....
    //this.movieData data to the  DB
    console.log('Like: add this data to the indexedDB');
    this.stateManager.notify('like-requested', this.movieData)
  }
//******************************************* */
  save (ev) {
    // notifies the state manager that it would like to
    // save the movie to the DB
    console.log('Save: add comment to movie!');
    const notes = document.querySelector(`#comment_${this.movieData.imdbID}`).value;
    this.movieData.notes = notes;
    console.log(this.movieData);
    this.stateManager.notify('save-requested', this.movieData);
}
//******************************************** */

  saveComment(ev) {
    //updates comment after user adds some notes
  }
}
