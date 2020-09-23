const url = "http://localhost:3000/films"

// Stable Element
let movieTitles = document.querySelector('div#films')
let movieTitles3 = document.querySelector('div.film.item.film.item:nth-child(2)').remove()
let movieTitles2 = document.querySelector('div.film.item.film.item:nth-child(1)').remove()
let cardMovieTitle = document.querySelector('div#title')
let cardMovieDescription = document.querySelector('div#film-info')
let cardMovieRunTime = document.querySelector('div#runtime')
let cardMovieShowTime = document.querySelector('span#showtime')
let cardRemainingTickets = document.querySelector('span#ticket-num')
let filmImage = document.querySelector('img#poster')
let buyTicketButton = document.querySelector('div.ui.orange.button')
let currentMovie = []


fetch(url)
.then(res => res.json())
.then(moviesArry => {
    renderFirstMovie(moviesArry)
    
        moviesArry.forEach((movie) => {
            displayOFAllMovies(movie)
        })
    })
        
// FIRST MOVIE ON CARD 
    let renderFirstMovie = (moviesArry) => {
        let firstMovie = moviesArry[0]
        mainMovieInfo(firstMovie)
    }
        
// LIST OF MOVIE' TITLES ON THE SIDE 
    let displayOFAllMovies = (movie) => {
            // create element for title of movie - titleOfMovie in local scope
        let titleOfMovie = document.createElement('div')
            titleOfMovie.className = 'film item'
            titleOfMovie.id  = `movie-${movie.id}`

        if((movie.capacity - movie.tickets_sold) == 0 ){
            titleOfMovie.classList.add("sold-out")
        }

            titleOfMovie.innerText = movie.title
            movieTitles.append(titleOfMovie)

        titleOfMovie.addEventListener('click', (evt) => {
            // console.log("CLICK", movie)
            mainMovieInfo(movie)
        })

    // EXTRA FORMATTING THE CURSOR
    titleOfMovie.addEventListener('mouseover', pointercursor)
    }
    // HELPER METHOD FOR CURSOR 
    let pointercursor = (evt) => {
        evt.target.style.cursor = 'pointer'
    }

    // CARD FOR MOVIE IN DISPLAY
    let mainMovieInfo = (movie) => {
        currentMovie = movie

    cardMovieTitle.innerText = movie.title 
    cardMovieDescription.innerText = movie.description 
    // CAPACITY - tickets_sold
    cardRemainingTickets.innerText = movie.capacity - movie.tickets_sold
    cardMovieRunTime.innerText = `${movie.runtime} minutes` 
    cardMovieShowTime.innerText = movie.showtime 
    filmImage.src = movie.poster   
    if ((movie.capacity - movie.tickets_sold) != 0) {
        buyTicketButton.innerText = "Buy Ticket"
        buyTicketButton.className = 'ui orange button'
        } if ((movie.capacity - movie.tickets_sold) === 0){
        buyTicketButton.innerText = 'Sold Out'
        buyTicketButton.className = 'sold-out'
        cardRemainingTickets.innerText = "tickets sold out, no"
        }
    }

    buyTicketButton.addEventListener('click', (evt) => {
        selectedMovie(currentMovie)
    })

    let selectedMovie = (movie) => {
    // check if there is still seats available
        if (movie.capacity - movie.tickets_sold > 0) {
            let newTicketCount = movie.tickets_sold + 1

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
                // passing updtedMovie and update card
                updateMovieStatus(updatedMovie, movie)
            })

        }
        
    }

    let updateMovieStatus = (updatedMovie, movie) => {
        // select given movie by id - titleOfMovie locally
        let titleOfMovie = document.querySelector(`#movie-${movie.id}`)
        // OBJ IN MEMORY
        movie.tickets_sold = updatedMovie.tickets_sold

        // DOM MANIPULATION
        cardRemainingTickets.innerText = updatedMovie.capacity - updatedMovie.tickets_sold
        if (cardRemainingTickets.innerText == 0) {
            buyTicketButton.innerText = 'Sold Out'
            buyTicketButton.className = 'sold-out'
            titleOfMovie.classList.add("sold-out");
        }
    
    }