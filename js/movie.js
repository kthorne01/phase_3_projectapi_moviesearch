export default class Movie {
    constructor() {

    }

    toHTML(data) {
        //returns an HTML representation of the JSON data
        //template instructing how to display the html...
        //(where we want to put the template)
        const movieTemplate = `
        <h2>${data.Title}</h2> 
        <p>${data.Year}</p>
        <img src="${data.Poster}"/> 
        <p>${data.Plot}</p>
      `;
      return movieTemplate;

    }

    like () {
        //notifies the state mgr that it wants to save....
        //movie to DB
    }

    saveComment () {
        //updates comment after user adds some notes
    }
}