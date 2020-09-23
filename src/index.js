const url = "http://localhost:3000/films"


const filmUrl = "http://localhost:3000/films"

//Movie image
const posterDiv = document.querySelector("img#poster")


// Movie titles
const movieDiv = document.querySelector("div#films")
const defaultMovieDiv2 = document.querySelector("div.film.item.film.item:nth-child(2)").remove()
const defaultMovieDiv1 = document.querySelector("div.film.item.film.item:nth-child(1)").remove()


//SELECTED Movie INFORMATION
const titleDiv = document.querySelector("div#title.title")
const runtimeDiv = document.querySelector("div#runtime.meta")
const infoDiv = document.querySelector("div#film-info")
const showtimeSpan = document.querySelector("span#showtime.ui.label")
const ticketNumSpan = document.querySelector("span#ticket-num")
const ticketBtn = document.querySelector("div.ui.orange.button")

let ticketLeft = 0
let ticketSold = 0
let allFilms = []
let film = {}

fetch(filmUrl, { method: "GET"})
    .then(res => res.json())
    .then((filmsPOJO) => {
        allFilms = filmsPOJO
        createTitles(allFilms)

        movieDiv.addEventListener("mouseover", (event) => {   
            event.target.style.color = "#681fc7";
            setTimeout(function() {
            event.target.style.color = "";
            }, 200);
        }, false);

    })

// create movie instances


let createTitles = (allMovies) => {
    allMovies.forEach((movie) =>{
    const titleLi = document.createElement("div") 

        if (movie.capacity - movie.tickets_sold == 0) {

            titleLi.className = "sold-out film item"
            titleLi.innerText = movie.title
            titleLi.id = movie.id
        }
        else { 
            titleLi.className = "film item"
            titleLi.innerText = movie.title
            titleLi.id = movie.id
        }

        movieDiv.append(titleLi)

        titleLi.addEventListener('click', (event) => {
            showMovie(titleLi.id)
        })

    })
}
// display movie instances
    function showMovie(filmId) {
        fetch(`http://localhost:3000/films/${filmId}`, { method: "GET" })
        .then(res => res.json())
        .then((filmPOJO) => {
            film = filmPOJO

            posterDiv.src = film.poster
            titleDiv.innerText = film.title
            runtimeDiv.innerText = `${film.runtime} minutes`
            infoDiv.innerText = film.description
            showtimeSpan.innerText = film.showtime

            ticketSold = film.tickets_sold
            ticketLeft = film.capacity - film.tickets_sold
            ticketNumSpan.innerText = `${ticketLeft}`

            if (ticketLeft > 0) {
                ticketBtn.className = "ui orange button"
                ticketBtn.innerText = "Buy Ticket"
            }
            else {
                ticketBtn.className = "ui label"
                ticketBtn.innerText = "SOLD OUT"
            }
        })
    }
    // add event to button

    ticketBtn.addEventListener('click', (evt) => {
        if (ticketLeft > 0) {
            ticketLeft = ticketLeft - 1
            ticketSold = ticketSold + 1
            fetch(`http://localhost:3000/films/${film.id}`, {
                method: "PATCH",
                headers: {"content-type": "application/json"},
                body: JSON.stringify({tickets_sold: ticketSold})
            })
            .then(res => res.json())
            .then((updatedObj) => {
                ticketSold = updatedObj.tickets_sold
                ticketLeft = updatedObj.capacity - updatedObj.tickets_sold
                ticketNumSpan.innerText = `${ticketLeft}`
            })
        }
        if (ticketLeft == 0) {
            ticketBtn.className = "ui label"
            ticketBtn.innerText = "SOLD OUT"
            let updatedMovieDiv = document.getElementById(`${film.id}`)
            // console.log(updatedMovieDiv)
            updatedMovieDiv.className = "sold-out film item"
            // console.log(updatedMovieDiv)
        }
    })


///////////////////////////////////////////////////////////////////////

showMovie(1) 
