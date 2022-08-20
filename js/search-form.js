export default class SearchForm {
  constructor() {}

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
        </form>
        `;
  }

  search() {
    //job of method --> to send search to the cloud (OMDB)
  }

  displayResults() {
    //job of method --> to display movie once the cloud responds
  }
}
