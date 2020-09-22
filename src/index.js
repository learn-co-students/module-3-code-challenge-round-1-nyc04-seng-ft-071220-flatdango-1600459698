const url = "http://localhost:3000/films"

let globalMovie = {}

// Display Movie Info
let moviePoster = document.querySelector("img#poster")
let movieTitle = document.querySelector("div#title")
let movieRuntime = document.querySelector("div#runtime")
let movieDesc = document.querySelector("div#film-info")
let movieShowtime = document.querySelector("span#showtime")
let movieRemainingTickets = document.querySelector("span#ticket-num")
let buyTicket = document.querySelector("div.ui.orange.button")

// Side menu
let movieMenuList = document.querySelector("div#films")

// First Core Deliverable to get the first movie
fetch(url + "/1")
.then(response => response.json())
.then(firstMovieObj => {
    displayMovieInfo(firstMovieObj)
})

// This is getting the Sidebar Info by getting all of the movies
fetch(url)
.then(response => response.json())
.then(movieArray => {
    // clears the side bar list
    while (movieMenuList.firstChild) {
        movieMenuList.firstChild.remove()
    }
    // for each movie in the movieArray, pass into turnMovieToDiv() to make it a div
    movieArray.forEach(movieObj => {
        turnMovieToDiv(movieObj)
    })
})

// This takes each movie's info and adds it to the side menu as a div on the DOM
let turnMovieToDiv = (movie) => {
    // 1. "get a blank piece of paper"
    let movieDiv = document.createElement("div") // create a new element and add it to the DOM

    // 2. "razzmatazz"
    movieDiv.innerText = movie.title // set the div's text to be the passed in movie's title

    // check if the movie passed in is sold out to decide what the div's css styling (class) should be on the side menu
    // use the findRemainingTickets helper method to see how many tickets are left
        // if sold out, the return value should be 0
    if (findRemainingTickets(movie) === 0) {
        movieDiv.className = "sold-out film item"
    } else {
        movieDiv.className = "film item"
    }
    
    // 3. "slap it on the DOM"
    movieMenuList.append(movieDiv) // add the newly created movieDiv onto the stable element movieMenuList

    // listens for when/where the user clicks on a div (movie title on the side menu) 
        // displays the clicked on movie's info
    movieDiv.addEventListener("click", (evt) => {
        displayMovieInfo(movie)
    })
}

// Displaying Movie Info
let displayMovieInfo = (selectedMovie) => {

    // important so that the buyTicket event listener will still know which movie is being displayed
    globalMovie = selectedMovie

    // changes what the stable elements of the movie's info displays to the selectedMovie
    // note: movieRemainingTickets uses the helper method with the selectedMovie's info to know what to display
    moviePoster.src = selectedMovie.poster
    movieTitle.innerText = selectedMovie.title
    movieRuntime.innerText = `${selectedMovie.runtime} minutes`
    movieDesc.innerText = selectedMovie.description
    movieShowtime.innerText = selectedMovie.showtime
    movieRemainingTickets.innerText = findRemainingTickets(selectedMovie)

    // since the div is unstable with no unique id
    // find the selected movie's id to be able to find which div it is & turn it from a string to an integer
    // pass in the integer to find which div it is with nth-child
    let selectedMovieIdNum = parseInt(selectedMovie.id)
    let selectedMovieDiv = document.querySelector("#films > .film.item:nth-child(" + selectedMovieIdNum + ")")

    // based on what the found div's className is change the buyTicket button's text and class
        // this will show on only the selected movie's display info if it is sold out or can buy tickets
    if (selectedMovieDiv.className === "sold-out film item") {
        buyTicket.className = "ui label"
        buyTicket.innerText = "Sold Out"
    } else {
        buyTicket.className = "ui orange button"
        buyTicket.innerText = "Buy Ticket"
    }
}

// Clicking on the "Buy Ticket" Button on the display of a selected movie
buyTicket.addEventListener("click", (evt) => {
    // should not be able to buy a ticket if the movie is sold out
    if (parseInt(movieRemainingTickets.innerText) > 0) {
        let boughtTicket = globalMovie.tickets_sold + 1 // increase the tickets sold by 1 for the movie
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
            movieRemainingTickets.innerText = findRemainingTickets(updatedMovieObj)

            // immediately reflects on the DOM that if the movie is sold out...
                // find the movie's div on the side menu to change the css styling
                // change the buyTicket button for only this movie's display info page
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
let findRemainingTickets = (movie) => {
    let theaterCapacity = movie.capacity
    let soldTickets = movie.tickets_sold
    return theaterCapacity - soldTickets
}
// end of helper method

// How to find specific div on the side bar
// "Santa Claus Conquers The Martians" = document.querySelector("#films > .film.item:nth-child(5)")
// let selectedMovieIdNum = parseInt(selectedMovie.id)
// selectedMovieDiv = document.querySelector("#films > .film.item:nth-child(" + selectedMovieIdNum + ")")

// Didn't need to use these: 
// let movieMenuMainDiv = document.querySelector("div.four.wide.column")
// let movieMenuContainer = document.querySelector("div.list-container")
