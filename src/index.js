const url = "http://localhost:3000/films"
const listContainer = document.querySelector("div.ui.divided.list")
const moviePoster = document.querySelector("#poster")
const movieTitle = document.querySelector(".title")
const movieRuntime = document.querySelector("#runtime")
const movieDescription = document.querySelector("#film-info")
const movieShowtime = document.querySelector("#showtime")
const movieTickets = document.querySelector("#ticket-num")
const ticketButton = document.querySelector("div.ui.orange.button")
let globalMovie = {}

fetch(url)
.then(r => r.json())
.then((moviesArray) => {
  mainMovie(moviesArray[0])

  moviesArray.forEach((movie) => {
    renderMovieList(movie)
  })
})

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

ticketButton.addEventListener("click", (event) => {

  console.log(globalMovie)

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

let soldOutButton = (movie) => {
  if (movie.capacity == movie.tickets_sold) {
    ticketButton.innerText = "Sold Out"
    ticketButton.className = "sold-out"
  } else {
    ticketButton.innerText = "Buy Ticket"
    ticketButton.className = "ui orange button"
  }
}

let changeMovieStatus = (movie) => {
  let thisMovie = document.getElementById(`list-${movie.id}`)

  if (movie.capacity == movie.tickets_sold) {
    thisMovie.className = "sold-out"
  } else {
    thisMovie.className = "film item"
  }
}