const url = "http://localhost:3000/films"

let moviePoster = document.querySelector("img#poster")
let movieTitle = document.querySelector("div#title")
let movieRuntime = document.querySelector("div#runtime")
let movieDesc = document.querySelector("div#film-info")
let movieShowtime = document.querySelector("span#showtime")
let movieRemainingTickets = document.querySelector("span#ticket-num")
let buyTicket = document.querySelector("div.ui.orange.button")

// DELIVERABLE 1 - DONE
// See the first movie's details, including its 
// poster, title, runtime, showtime, and available tickets 
// the number of tickets left will need to be derived from the theater's capacity && num of tickets sold

//DELIVERABLE 2 - DONE
// Buy a ticket for a movie. The number of tickets sold for that movie should be persisted, 
// and I should be able to see the number of available tickets decreasing on the frontend.

// DELIVERABLE 3 
// I should not be able to buy a ticket if the showing is sold out.

fetch("http://localhost:3000/films/1")
.then(response => response.json())
.then(firstMovieObj => {
    movieInfo(firstMovieObj)
})

let movieInfo = (movie) => {
    moviePoster.src = movie.poster
    movieTitle.innerText = movie.title
    movieRuntime.innerText = `${movie.runtime} minutes`
    movieDesc.innerText = movie.description
    movieShowtime.innerText = movie.showtime

    let tickets = findRemainingTickets(movie.capacity, movie.tickets_sold)
    movieRemainingTickets.innerText = tickets
    
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
                // debugger
                //updates the object in memory
                movie.tickets_sold = updatedMovieObj.tickets_sold

                //updates the DOM
                movieRemainingTickets.innerText = findRemainingTickets(updatedMovieObj.capacity, updatedMovieObj.tickets_sold)
            })
        }
    })
}

let findRemainingTickets = (theaterCapacity, soldTickets) => {
    return theaterCapacity - soldTickets
}

