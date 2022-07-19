import './style.css';
import {apiKey} from './apikey.js';

//this is my search function that executes when the user clicks the button
const search = (ev) => {
  //stopping the default form behavior
  ev.preventDefault();
  const title = document.querySelector("#title").value;
  const year = document.querySelector("#year").value;
  const plot = document.querySelector("#plot").value;

  //template literals (by using backtick) allows us to embed variables within our string
  const url = `https://www.omdbapi.com/?t=${title}&y=${year}&plot=${plot}&apikey=${apiKey}`;

  //const url = `https://www.omdbapi.com/?t=${title}&y=${year}&plot=full&apikey=${apiKey}`;

  console.log(url)
  //below is fetching my data from the internet
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      //telling my code to remove the last data and only show the current search data
      const parent = document.querySelector('#movieDetails');
        while (parent.firstChild) {
          parent.removeChild(parent.firstChild);
        }

    //template instructing how to display the html (where we want to put the template)
      const movieTemplate = `
      <h2>${data.Title}</h2> 
      <p>${data.Year}</p>
      <img src="${data.Poster}"/> 
      <p>${data.Plot}</p>
      `

      //attaches the template to the dom and telling it where in the document we want 
      //to insert it
      document.querySelector("#movieDetails").insertAdjacentHTML("beforeend", movieTemplate);     

    

//  const songTemplate = `
//                     <div class="song">
//                         <h2>${data[i].name} by ${data[i].artist.name}</h2>
//                         <img src="${data[i].album.image_url}" />
//                         <p>album: ${data[i].album.name}</p>
//                         <audio 
//                             controls
//                             src="${data[i].preview_url}">
//                         </audio>
//                     </div> 
//                     `;
//                 // here we are targeting the #results element and
//                 // adding the html to the end of the element:
//                 document.querySelector('#results').insertAdjacentHTML('beforeend', songTemplate);     

      console.log (data.Title)
      console.log (data.Poster)
      console.log (data.Year)
      console.log (data.Plot)
    })
};
//listens for a form submission and when a user clicks on it, executes the search function
// document.querySelector("#go").addEventListener("click", search);
document.querySelector("form").addEventListener("submit", search);

