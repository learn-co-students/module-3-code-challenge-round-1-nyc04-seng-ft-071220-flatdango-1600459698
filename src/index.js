const url = "http://localhost:3000/films"

let moviePoster = document.querySelector("img#poster")
let movieInfoCard = document.querySelector("div#showing")
let movieTitle = document.querySelector("div#title")
let movieRuntime = document.querySelector("div#runtime")
let movieDesc = document.querySelector("div#film-info")
let movieShowtime = document.querySelector("span#showtime")
let movieRemainingTickets = document.querySelector("span#ticket-num")
let buyTicket = document.querySelector("div.ui.orange.button")

let movieMenuMainDiv = document.querySelector("div.four.wide.column")
let movieMenuContainer = document.querySelector("div.list-container")
let movieMenuList = document.querySelector("div#films")

let globalMovie = {}

// First Core Deliverable
fetch(url + "/1")
.then(response => response.json())
.then(firstMovieObj => {
    displayMovieInfo(firstMovieObj)
})

// This is getting the Sidebar Info
fetch(url)
.then(response => response.json())
.then(movieArray => {
    // clears the side bar list
    while (movieMenuList.firstChild) {
        movieMenuList.firstChild.remove()
    }
    // for each movie, display it on the sidebar
    movieArray.forEach(movieObj => {
        turnMovieToDiv(movieObj)
    })
})

// This takes each movie's info and adds it to the sidebar as a div
let turnMovieToDiv = (movie) => {
    let movieDiv = document.createElement("div")
    movieDiv.innerText = movie.title

    if (findRemainingTickets(movie.capacity, movie.tickets_sold) === 0) {
        movieDiv.className = "sold-out film item"
    } else {
        movieDiv.className = "film item"
    }
    
    movieMenuList.append(movieDiv)

    movieDiv.addEventListener("click", (evt) => {
        displayMovieInfo(movie)
    })
}

// Displaying Movie Info
let displayMovieInfo = (selectedMovie) => {

    globalMovie = selectedMovie

    moviePoster.src = selectedMovie.poster
    movieTitle.innerText = selectedMovie.title
    movieRuntime.innerText = `${selectedMovie.runtime} minutes`
    movieDesc.innerText = selectedMovie.description
    movieShowtime.innerText = selectedMovie.showtime

    movieRemainingTickets.innerText = findRemainingTickets(selectedMovie.capacity, selectedMovie.tickets_sold)

    let selectedMovieIdNum = parseInt(selectedMovie.id)
    let selectedMovieDiv = document.querySelector("#films > .film.item:nth-child(" + selectedMovieIdNum + ")")
    if (selectedMovieDiv.className === "sold-out film item") {
        buyTicket.innerText = "Sold Out"
        buyTicket.className = "ui label"
    } else {
        buyTicket.className = "ui orange button"
        buyTicket.innerText = "Buy Ticket"
    }

}

// Clicking on the "Buy Ticket" Button
buyTicket.addEventListener("click", (evt) => {
    // should not be able to buy a ticket if the movie is sold out
    debugger
    if (parseInt(movieRemainingTickets.innerText) > 0) {
        let boughtTicket = globalMovie.tickets_sold + 1
        //updates the backend
        fetch(`http://localhost:3000/films/${globalMovie.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tickets_sold: boughtTicket
            })
        })
        .then(response => response.json())
        .then(updatedMovieObj=> {
            //updates the object in memory
            globalMovie.tickets_sold = updatedMovieObj.tickets_sold

            //updates the DOM
            movieRemainingTickets.innerText = findRemainingTickets(updatedMovieObj.capacity, updatedMovieObj.tickets_sold)
            debugger

            if (parseInt(movieRemainingTickets.innerText) === 0) {
                let updatedMovieIdNum = parseInt(updatedMovieObj.id)
                let updatedMovieDiv = document.querySelector("#films > .film.item:nth-child(" + updatedMovieIdNum + ")")
                updatedMovieDiv.className = "sold-out film item"

                buyTicket.innerText = "Sold Out"
                buyTicket.className = "ui label"

            }
        })
    } 
})

// helper method to find out how many tickets are left
let findRemainingTickets = (theaterCapacity, soldTickets) => {
    return theaterCapacity - soldTickets
}
// end of helper method

// helper method for when a movie becomes sold out
// let soldOutDOM = (soldOutMovie) => {

//     debugger

//     let updatedMovieDiv = document.querySelector("div.film.item")
//     updatedMovieDiv.className = "sold-out film item"

//     buyTicket.innerText = "Sold Out"
//     buyTicket.className = "ui label"
// }

// How to find specific div on the side bar
// document.querySelector("#films > .film.item:nth-child(5)")
// let selectedMovieIdNum = parseInt(selectedMovie.id)
// selectedMovieDiv = document.querySelector("#films > .film.item:nth-child(" + selectedMovieIdNum + ")")
