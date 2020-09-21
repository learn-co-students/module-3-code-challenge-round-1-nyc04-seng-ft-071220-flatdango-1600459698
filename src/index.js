const FilmUrl = "http://localhost:3000/films"
const posterDiv = document.querySelector("img#poster")
const titleDiv = document.querySelector("div#title.title")
const runtimeDiv = document.querySelector("div#runtime.meta")
const infoDiv = document.querySelector("div#film-info")
const showtimeSpan = document.querySelector("span#showtime.ui.label")
const ticketNumSpan = document.querySelector("span#ticket-num")
const ticketBtn = document.querySelector("div.ui.orange.button")
const movieDiv = document.querySelector("div#films.ui.divided.list")
let ticketLeft = 0
let ticketSold = 0
let allFilms = []

fetch(FilmUrl, { method: "GET"})
    .then(res => res.json())
    .then((filmsPOJO) => {
        allFilms = filmsPOJO
        const titleLi = allFilms.map((movie) => `<div class="film item" id="${movie.id}">${movie.title}</div>`)
        movieDiv.innerHTML = titleLi.join('')
        
 

        movieDiv.addEventListener("mouseover", (event) => {   
            event.target.style.color = "orange";
            setTimeout(function() {
              event.target.style.color = "";
            }, 300);
          }, false);


        movieDiv.addEventListener('click', (event) => {
            let selectedFilmId = event.target.id
            loadFilm(selectedFilmId)

        })


    })


function loadFilm(filmId) {
fetch(`http://localhost:3000/films/${filmId}`, { method: "GET" })
    .then(res => res.json())
    .then((filmPOJO) => {
        const film = filmPOJO
        posterDiv.src = film.poster
        titleDiv.innerText = film.title
        runtimeDiv.innerText = `${film.runtime} minutes`
        infoDiv.innerText = film.description
        showtimeSpan.innerText = film.showtime
        ticketSold = film.tickets_sold
        ticketLeft = film.capacity - film.tickets_sold
        ticketNumSpan.innerText = `${ticketLeft}`
        if (ticketLeft == 0) {
            ticketBtn.className = "ui label"
            ticketBtn.innerText = "SOLD OUT"
        }
    })

    ticketBtn.addEventListener('click', (evt) => {
        if (ticketLeft > 0) {
            ticketLeft = ticketLeft - 1
            ticketSold = ticketSold + 1
            fetch(`http://localhost:3000/films/${filmId}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    tickets_sold: ticketSold
                })
            })
            .then(res => res.json())
            .then((updatedObj) => {
                ticketSold = updatedObj.tickets_sold
                ticketLeft = updatedObj.capacity - updatedObj.tickets_sold
                ticketNumSpan.innerText = `${ticketLeft}`
            })
        
            
        }
        else if (ticketLeft == 0) {
            ticketBtn.className = "ui label"
            ticketBtn.innerText = "SOLD OUT"
        }
    })
}


loadFilm(1) //default page should point to the first movie since the placeholder poster is creepy.
