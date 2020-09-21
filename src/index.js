const url = "http://localhost:3000/films"

let moviePoster = document.querySelector("img#poster")
let movieTitle = document.querySelector("div#title")
let movieRuntime = document.querySelector("div#runtime")
let movieDesc = document.querySelector("div#film-info")
let movieShowtime = document.querySelector("span#showtime")
let movieRemainingTickets = document.querySelector("span#ticket-num")

// DELIVERABLE 1 - DONE
// See the first movie's details, including its 
// poster, title, runtime, showtime, and available tickets 
// the number of tickets left will need to be derived from the theater's capacity && num of tickets sold

fetch(url)
.then(response => response.json())
.then(movieArray => {
    firstMovie = movieArray[0]
    movieInfo(firstMovie)
})

let movieInfo = (movie) => {
    moviePoster.src = movie.poster
    movieTitle.innerText = movie.title
    movieRuntime.innerText = `${movie.runtime} minutes`
    movieDesc.innerText = movie.description
    movieShowtime.innerText = movie.showtime
    movieRemainingTickets.innerText = findRemainingTickets(movie.capacity, movie.tickets_sold)
    // debugger

}

let findRemainingTickets = (theaterCapacity, soldTickets) => {
    return theaterCapacity - soldTickets
}