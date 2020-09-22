const url = "http://localhost:3000/films"
// Stable elements:
//SIDE BAR for MOVIE TITLES
const movieDiv = document.querySelector("div#films")
//MOVIE POSTER 
const posterDiv = document.querySelector("img#poster")
//Selected MOVIE INFORMATION
const movieTitleDiv = document.querySelector("div#title.title")
const movieRuntimeDiv = document.querySelector("div#runtime.meta")
const infoDiv = document.querySelector("div#film-info")
const showtimeSpan = document.querySelector("span#showtime.ui.label")
const ticketNumSpan = document.querySelector("span#ticket-num")

const ticketButton = document.querySelector("div.ui.orange.button")

let movieGlobal = {}

fetch(url)
    .then(res => res.json())
    .then(moviesArray => {
        renderFirstMovie(moviesArray)

        // moviesArray.forEach((movieObj) => {
        // console.log(movie)
        //     turnMovieTo (movieObj)
        
        // })
//      renderFirstMovie(moviesArray[0])
    })

    let renderFirstMovie = (moviesArray) => {
        let firstMovie = moviesArray[0]

        posterDiv.src = firstMovie.poster
        movieTitleDiv.innerText = firstMovie.title 
        movieRuntimeDiv.innerText = firstMovie.runtime 
        infoDiv.innerText = firstMovie.description
        showtimeSpan.innerText = firstMovie.showtime
        ticketNumSpan.innerText = Number(firstMovie.capacity) - firstMovie.tickets_sold
      
        // mainMovie(firstMovie)
      }

    // function turnMovieTo (movieObj) {
    //     let titleDiv = document.createElement("div")
    //     titleDiv.class.add("film title")

    // }

    // function movieDetails( Obj) {

    // }

      function buyTicket() {
          ticketButton.addEventListener("click", (evt) => {
            //   if movie.tickets_sold_out < 
            // 1. calculate the number of tickets that are availbale (capacity - tickets_sold) outside of fetch
            // 2. structure of fetch request: 
            // 3. write the condition for available tickets 
          })
      }

    //   function soldOut() {}

  