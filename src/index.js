const url = "http://localhost:3000/films"

let moviePoster = document.querySelector("img#poster")
let movieTitle = document.querySelector("div#title")
let movieRuntime = document.querySelector("div#runtime")
let movieDesc = document.querySelector("div#film-info")
let movieShowtime = document.querySelector("span#showtime")
let movieRemainingTickets = document.querySelector("span#ticket-num")
let buyTicket = document.querySelector("div.ui.orange.button")

let movieMenuMainDiv = document.querySelector("div.four.wide.column")
let movieMenuContainer = document.querySelector("div.list-container")
let movieMenuList = document.querySelector("div#films")
// let movieMenuItem = document.querySelector("div.film.item")

// First Core Deliverable
// fetch("http://localhost:3000/films/1")
// .then(response => response.json())
// .then(firstMovieObj => {
//     displayMovieInfo(firstMovieObj)
// })

fetch(url)
.then(response => response.json())
.then(movieArray => {
    // clears the list first
    while (movieMenuList.firstChild) {
        movieMenuList.firstChild.remove()
    }

    movieArray.forEach(movieObj => {
        turnMovieToDiv(movieObj)
    })
})

let turnMovieToDiv = (movie) => {
    let movieDiv = document.createElement("div")
    movieDiv.className = "film item"
    movieDiv.innerText = movie.title

    movieMenuList.append(movieDiv)

    movieDiv.addEventListener("click", (evt) => {
        displayMovieInfo(movie)
    })
}

let displayMovieInfo = (movie) => {
    moviePoster.src = movie.poster
    movieTitle.innerText = movie.title
    movieRuntime.innerText = `${movie.runtime} minutes`
    movieDesc.innerText = movie.description
    movieShowtime.innerText = movie.showtime

    let tickets = findRemainingTickets(movie.capacity, movie.tickets_sold)
    movieRemainingTickets.innerText = tickets
    // debugger
    buyTicket.addEventListener("click", (evt) => {
        // debugger
        if (tickets > 0) {
            let boughtTicket = movie.tickets_sold + 1
            //updates the backend
            fetch(`http://localhost:3000/films/${movie.id}`, {
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
                movie.tickets_sold = updatedMovieObj.tickets_sold

                //updates the DOM
                tickets = findRemainingTickets(updatedMovieObj.capacity, updatedMovieObj.tickets_sold)
                movieRemainingTickets.innerText = tickets

                if (tickets === 0) {
                    buyTicket.innerText = "Sold Out"
                    buyTicket.className = "ui label"
                }
            })
        } else if (tickets === 0) {
            buyTicket.innerText = "Sold Out"
            buyTicket.className = "ui label"
        }
    })

}

let findRemainingTickets = (theaterCapacity, soldTickets) => {
    return theaterCapacity - soldTickets
}
