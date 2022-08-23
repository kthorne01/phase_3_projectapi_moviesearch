// import apiKey from "./key.js";
const apiKey = import.meta.env.VITE_API_KEY;
export default class SearchForm {

  constructor(stateManager) {
    //creating convenience variable to use it in other methods (initializing it)
    this.stateManager = stateManager;
  }

  drawform() {
    //job of method --> to display a form to the HTML
    const formTemplate = `
        <form>
            <label class="control-label" for="title">Title:</label>
            <input type="text" placeholder="Title of the Movie" id="title" required="required"/>
            <br />
            <label class="control-label" for="year">Year:</label>
            <input 
            type="number"
            placeholder="Year"
            minlength="4"
            maxlength="4>"
            id="year"
            />
            <br />
            <label class="control-label" for="plot">Plot:</label>
            <select name="plot" id="plot" style="width: 100px;">
            <option value="" selected="">Short</option>
            <option value="full">Full</option>
            </select>
            <button id="go" type="submit">go</button>
            <button id="reset">reset</button>
            <button id="show-favorites">show-favorites</button>
        </form>
        `;
    //putting . in front of form-container bc it is a class ID
    //saying go out and find the html element that has a class...
    //called form-container and set it's inner html to the formTemplate
    document.querySelector(".form-container").innerHTML = formTemplate;
    //submit, click, mouse-over are strings but this.search we want...
    //it to be treated as a function and not a string so no quotes
    document.querySelector("form").addEventListener("submit", this.search.bind(this));
    document.querySelector("#reset").addEventListener("click", this.clearScreen.bind(this));
    document.querySelector('#show-favorites').addEventListener('click', this.loadFavorites.bind(this));
  }

  //this is invoked when user submits the form
  //added ev argument in parameter to prevent the default browser functionality...
  //bc I want it to do what I want it to do
  search(ev) {
    //job of method --> to send search to the cloud (OMDB)
    ev.preventDefault();
    console.log("Search!");

    const title = document.querySelector("#title").value;
    const year = document.querySelector("#year").value;
    const plot = document.querySelector("#plot").value;

    //template literals (by using backtick) allows us to embed variables within our string
    const url = `https://www.omdbapi.com/?t=${title}&y=${year}&plot=${plot}&apikey=${apiKey}`;

    //const url = `https://www.omdbapi.com/?t=${title}&y=${year}&plot=full&apikey=${apiKey}`;

    console.log(url);

    //   below is fetching my data from the internet
    fetch(url)
      //callback function
      .then((response) => response.json())
      .then(((data) => {
        console.log(data);
        console.log(this);
        //letting sm knw something has happened
        this.stateManager.notify('found-movie', [data]);
      }).bind(this));
  }

  clearScreen(ev) {
    ev.preventDefault();
    document.querySelector("#title").value = "";
    document.querySelector("#year").value = "";
    // document.querySelector("#plot").value = "";

    this.stateManager.notify("clear-all");
  }

  loadFavorites(ev) {
    ev.preventDefault();
    this.stateManager.loadFavorites();
  }
}
