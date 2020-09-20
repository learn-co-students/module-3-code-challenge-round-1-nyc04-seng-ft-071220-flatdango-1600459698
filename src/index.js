const FilmUrl = "http://localhost:3000/films"

const posterDiv = document.querySelector("img#poster")
const titleDiv = document.querySelector("div#title.title")
const runtimeDiv = document.querySelector("div#runtime.meta")
const infoDiv = document.querySelector("div#film-info")
const showtimeSpan = document.querySelector("span#showtime.ui.label")
const ticketNumSpan = document.querySelector("span#ticket-num")
const ticketBtn = document.querySelector("div.ui.orange.button")
let ticketLeft = 0
let ticketSold = 0



fetch(FilmUrl, { method: "GET"})
    .then(res => res.json())
    .then((filmsPOJO) => {
        const allFilms = filmsPOJO
        console.log(allFilms)

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












loadFilm(3)

//2. Buy a ticket for a movie.
//The number of tickets sold for that movie should be persisted,
//and I should be able to see the number of available tickets decreasing on the frontend.


//3. should not be able to buy a ticket if the showing is sold out.