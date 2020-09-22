const url = "http://localhost:3000/films"

// Stable Element
let movieTitles = document.querySelector('div.film.item.film.item:nth-child(2)')
let cardMovieTitle = document.querySelector('div#title')
let cardMovieDescription = document.querySelector('div#film-info')
let cardMovieRunTime = document.querySelector('div#runtime')
let cardMovieShowTime = document.querySelector('span#showtime')
let cardRemainingTickets = document.querySelector('span#ticket-num')
let filmImage = document.querySelector('img#poster')
let buyTicketButton = document.querySelector('div.ui.orange.button')

fetch(url)
    .then(res => res.json())
        .then(moviesArry => {
            renderFirstMovie(moviesArry)

            moviesArry.forEach((movie) =>{
            displayOFAllMovies(movie)
        })
    })

// FIRST MOVIE ON CARD 
let renderFirstMovie = (moviesArry) => {
    let firstMovie = moviesArry[0]
    mainMovieInfo(firstMovie)
}

// LIST OF MOVIES TITLES ON THE SIDE 
let displayOFAllMovies = (movie) => {
    let titleOfMovie = document.createElement('p')
        titleOfMovie.innerText = movie.title
    movieTitles.append(titleOfMovie)

    titleOfMovie.addEventListener('click', (evt) => {
        mainMovieInfo(movie)
    })
    // EXTRA FORMATTING THE CURSON
    titleOfMovie.addEventListener('mouseover', pointercursor)
}

// HELPER METHOD FOR CURSOR 
let pointercursor = (evt) => {
    evt.target.style.cursor = 'pointer'
}

// CARD FOR MOVIE IN DISPLAY
let mainMovieInfo = (movie) => {
    cardMovieTitle.innerText = movie.title 
    cardMovieDescription.innerText = movie.description 
    cardRemainingTickets.innerText = movie.tickets_sold
    cardMovieRunTime.innerText = movie.runtime 
    cardMovieShowTime.innerText = movie.showtime 
    filmImage.src = movie.poster 

    buyTicketButton.addEventListener('click', (evt) => {
        evt.preventDefault()
        // console.log('I clicked the button', movie.id)

        let newTicketCount = movie.tickets_sold - 1

            fetch(`${url}/${movie.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tickets_sold: newTicketCount
                })
            })
        
            .then(res => res.json())
            .then((updatedMovie) => {
                // console.log(updatedMoviePOJO)

                // OBJ IN MEMORY
                movie.tickets_sold = updatedMovie.tickets_sold

                // DOM MANIPULATION
                cardRemainingTickets.innerText = updatedMovie.tickets_sold
        
            })
        
    })
}
    
