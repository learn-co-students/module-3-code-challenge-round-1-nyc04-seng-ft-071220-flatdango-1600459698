// If I have time in the morning, fix bug that happens when ticketsRemaining is less than 0...
//      Also, when one buttone greys to "sold out", all are changing to "sold out".  Make
//          creating the button part of mainMovie, replace default ".ui.orange.button" with
//          one that is generated with each mainMovie()

const url = "http://localhost:3000/films"

const listContainer = document.querySelector("div.ui.divided.list")

const moviePoster = document.querySelector("#poster")

const card = document.querySelector(".card")
const movieTitle = document.querySelector(".title")
const runtime = document.querySelector("#runtime")
const filmInfo = document.querySelector("#film-info")
const showtime = document.querySelector("#showtime")
let ticketsRemaining = document.querySelector("#ticket-num")
const buttonArea = document.querySelector("div.extra.content")
const buyButton = document.querySelector(".ui.orange.button")


fetch(url)
.then(res => res.json())
.then(moviesArray => {
    firstMovie(moviesArray)
    listContainer.innerText = ""
    moviesArray.forEach(turnMovieToDiv)
    })


let mainMovie = (movie) => {
    moviePoster.src = movie.poster
    movieTitle.innerText = movie.title 
    runtime.innerText = `Runtime: ${movie.runtime} minutes`
    filmInfo.innerText = movie.description
    showtime.innerText = movie.showtime 
    ticketsRemaining.innerText = `${movie.capacity - movie.tickets_sold}`

    buyButton.addEventListener("click", (evt) => {
        updatedTicketsSold = movie.tickets_sold + 1
        fetch(`${url}/${movie.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                tickets_sold: updatedTicketsSold
            })
        })
        .then(res => res.json())
        .then(updatedMovie => {
            ticketsRemaining.innerText = `${movie.capacity - updatedMovie.tickets_sold}`
            if (ticketsRemaining.innerText === "0") {
                buyButton.remove()
                let soldOutButton = document.createElement("button")
                soldOutButton.className = "ui grey button"
                soldOutButton.innerText = "Sold Out"
                buttonArea.append(soldOutButton)
            }
            movie.tickets_sold = updatedMovie.tickets_sold
        })
    })
}


let firstMovie = (moviesArray) => {
    let firstMovie = moviesArray[0]
    mainMovie(firstMovie)
}

let turnMovieToDiv = (movie) => {
    let movieDiv = document.createElement("div")
    movieDiv.className = "film item"
    movieDiv.innerText = movie.title 
    listContainer.append(movieDiv)

    movieDiv.addEventListener("click", (evt) => {
        mainMovie(movie)
    })    

    if (movie.tickets_sold >= movie.capacity) {
        movieDiv.style.color = "lightgrey"
    }
}