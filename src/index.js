const url = "http://localhost:3000/films"

//stable elements

movieTitle = document.querySelector("#title")
movieDescrip = document.querySelector("#film-info")
movieRuntime = document.querySelector("#runtime")
movieShowTime = document.querySelector("#showtime")
movieTickRem = document.querySelector("#ticket-num")
moviePoster = document.querySelector("#poster")
buyTicket = document.querySelector(".ui.orange.button")

let movieDiv = document.querySelector("#films")
// console.log(movieDiv)

fetch(url)
.then(res => res.json())
.then((filmArr) => {
    displayFirst(filmArr),
    filmArr.forEach(movieObj => {
        // console.log(movieObj)
        addMovieInfoToList(movieObj)

    })
})

//helper methods

//adds all movies to list 
//user helped methods to display movies hovered over
let addMovieInfoToList = (movieObj) => {
    let moviesCard = document.createElement("div")
    moviesCard.className = "film item"
    moviesCard.innerText = movieObj.title
    // console.log(moviesCard)
    movieDiv.append(moviesCard)

    moviesCard.addEventListener("mouseover", (evt) => {
        displayMovie(movieObj)
        // console.log(movieObj)
    })

}


//displays the first movie in the array of movies
let displayFirst = (firstMovie) => {
    displayMovie(firstMovie[0])
}

//universal helper to display movies on dom through stable elements
let displayMovie = (movie) => {
    movieTitle.innerText = movie.title
    movieDescrip.innerText = movie.description
    moviePoster.src = movie.poster
    movieRuntime.innerText = movie.runtime
    movieShowTime.innerText = movie.showtime
    movieTickRem.innerText = movie.capacity - movie.tickets_sold  

    buyMovie(movie)
}

let buyMovie = (movie) => {
    buyTicket.addEventListener("click", (evt) => {
        newTickSold = movie.tickets_sold + 1
        fetch(`${url}/${movie.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                tickets_sold: newTickSold
            })
        })
        .then(res => res.json())
        .then(newMovieTicObj => {
            ticketsRemaining.innerText = movie.capacity - updatedMovie.tickets_sold
        })
       
    })
}
