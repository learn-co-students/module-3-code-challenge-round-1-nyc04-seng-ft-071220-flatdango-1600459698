// identify all the stable HTML elements
const url = "http://localhost:3000/films"
const listContainer = document.querySelector("div.ui.divided.list")
const moviePoster = document.querySelector("#poster")
const movieTitle = document.querySelector(".title")
const movieRuntime = document.querySelector("#runtime")
const movieDescription = document.querySelector("#film-info")
const movieShowtime = document.querySelector("#showtime")
const movieTickets = document.querySelector("#ticket-num")
const ticketButton = document.querySelector("div.ui.orange.button")

// create a global movie variable 
let globalMovie = {}

// use a GET fetch request to pull all the movie data
fetch(url)
.then(r => r.json())
.then((moviesArray) => {
  mainMovie(moviesArray[0])

  moviesArray.forEach((movie) => {
    renderMovieList(movie)
  })
})

// ADVANCED DELIVERABLE: render the sidebar with all the movie titles
let renderMovieList = (movie) => {
  let movieDiv = document.createElement("div")
  movieDiv.className = "film item"
  movieDiv.innerText = movie.title 
  movieDiv.id = `list-${movie.id}`
  listContainer.append(movieDiv)

  changeMovieStatus(movie)

  movieDiv.addEventListener("click", (evt) => {
    mainMovie(movie)
  })    
}

// render the main movie container with a single movie
let mainMovie = (movie) => {
  globalMovie = movie

  soldOutButton(globalMovie)

  moviePoster.src = globalMovie.poster
  movieTitle.innerText = globalMovie.title 
  movieRuntime.innerText = `${globalMovie.runtime} minutes`
  movieDescription.innerText = globalMovie.description
  movieShowtime.innerText = globalMovie.showtime
  movieTickets.innerText = `${globalMovie.capacity - globalMovie.tickets_sold}`
}

// event listener for the "buy ticket" button
// use a PATCH fetch request to update the number of tickets sold for a single movie
ticketButton.addEventListener("click", (event) => {

  if (globalMovie.capacity == globalMovie.tickets_sold) {
    globalMovie.tickets_sold
  } else {
    globalMovie.tickets_sold = globalMovie.tickets_sold + 1
  }
  
  fetch(`${url}/${globalMovie.id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      tickets_sold: globalMovie.tickets_sold
    })
  })
  .then(r => r.json())
  .then((updatedMovie) => {
    globalMovie.tickets_sold = updatedMovie.tickets_sold
    movieTickets.innerText = `${globalMovie.capacity - globalMovie.tickets_sold}`

    soldOutButton(globalMovie)
    changeMovieStatus(globalMovie)
  })
})

// helper method for figuring out if the "buy ticket" button should be active or not
let soldOutButton = (movie) => {
  if (movie.capacity == movie.tickets_sold) {
    ticketButton.innerText = "Sold Out"
    ticketButton.className = "sold-out"
  } else {
    ticketButton.innerText = "Buy Ticket"
    ticketButton.className = "ui orange button"
  }
}

// ADVANCED DELIVERABLE: helper method for changing the movie title's color in the sidebar if it's sold out
let changeMovieStatus = (movie) => {
  let thisMovie = document.getElementById(`list-${movie.id}`)

  if (movie.capacity == movie.tickets_sold) {
    thisMovie.className = "sold-out"
  } else {
    thisMovie.className = "film item"
  }
}