const url = `http://localhost:3000/films`

const movieShowing = document.querySelector("#showing")
const moviePoster = document.querySelector("#poster")
const movieTitle = document.querySelector("#title")
const movieInfo = document.querySelector("#film-info")
const movieRuntime = document.querySelector("#runtime")
const movieShowtime = document.querySelector("#showtime")
const availableTickets = document.querySelector("span#ticket-num")

let movieGlob = {}

fetch(url)
.then(res => res.json())
.then((moviesArray) => {
    // console.log(moviesArray)
    renderFirstMovie(moviesArray)
    
})


let renderFirstMovie = (moviesArray) => {
    
   let firstMovie = moviesArray[0]
   
   mainMovie(firstMovie)
   
}


let mainMovie = (movie) => {
    movieGlob = movie
    moviePoster.src = movie.poster
    movieTitle.innerText = movie.title
    movieInfo.innerText = movie.description
    movieRuntime.innerText = movie.runtime
    movieShowtime.innerText = movie.showtime
    availableTickets.innerText = `${movie.capacity - movie.tickets_sold}`
}


const buyTicketButton = document.querySelector("div.ui.orange.button")

buyTicketButton.addEventListener("click", (evt) => {
    // console.log(typeof parseInt(movieGlob.capacity))
    if (movieGlob.tickets_sold < parseInt(movieGlob.capacity)) {
    let theRemainedTickets = movieGlob.tickets_sold + 1
    // console.log(theRemainedTickets)
    fetch(`http://localhost:3000/films/${movieGlob.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tickets_sold: theRemainedTickets
        })
    })
    .then(res => res.json())
    .then((updatedMovieObj) => {
        // console.log(updatedMovieObj)
        movieGlob.tickets_sold = updatedMovieObj.tickets_sold
        availableTickets.innerText = parseInt(updatedMovieObj.capacity) - updatedMovieObj.tickets_sold
        soldOut()
        })
    }  
})

function soldOut() {
    currentButton = document.querySelector(`div#button${movieGlob.id}`)
    if(availableTickets.innerText === "0"){
        currentButton.style.backgroundColor = "black"
        currentButton.innerText = "Sold out"
    }
}

