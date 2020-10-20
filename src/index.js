const url = "http://localhost:3000/films"

//stable elements

let movieTitle = document.querySelector("#title")
let movieDescrip = document.querySelector("#film-info")
let movieRuntime = document.querySelector("#runtime")
let movieShowTime = document.querySelector("#showtime")
let movieTickRem = document.querySelector("#ticket-num")
let moviePoster = document.querySelector("#poster")
let buyTicket = document.querySelector(".ui.orange.button")
let currentMovie 

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
        currentMovie = movieObj
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

    // buyMovie(movie)
}

buyTicket.addEventListener("click", (evt) => {
    console.log(currentMovie)
    newTickSold = currentMovie.tickets_sold += 1 
    fetch(`${url}/${currentMovie.id}`, {
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
        movieTickRem.innerText = newMovieTicObj.capacity - newMovieTicObj.tickets_sold
    })
    
})
