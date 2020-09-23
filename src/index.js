const filmsUrl = "http://localhost:3000/films"

const filmSideMenu = document.querySelector("div.film.item")
const filmTitle = document.querySelector("div#title")
const filmRuntime = document.querySelector("div#runtime")
const filmDescription = document.querySelector("div#film-info")
const filmShowtime = document.querySelector("span#showtime")
const filmTicketNum = document.querySelector("span#ticket-num")
const filmPoster = document.querySelector("img#poster")
const buyButton = document.querySelector("div.ui.orange.button")

fetch(filmsUrl)
.then(res => res.json())
.then((filmsArr) => {
    renderFirstFilm(filmsArr)
    filmsArr.forEach((film) => {
        turnFilmIntoLi(film)
    })
})
//displaying all the films on the side
let turnFilmIntoLi = (film) => {

    let filmLi = document.createElement("li")
        filmLi.innerText = film.title
    filmSideMenu.append(filmLi)
//clicking on a film will display its card
    filmLi.addEventListener("click", (evt) => {
        renderFilmInfo(film)
    })

}
// grabbing the first film
let renderFirstFilm = (filmsArr) => {
    let firstFilm = filmsArr[0]
    renderFilmInfo(firstFilm)
}

//single movie card infos.....
let renderFilmInfo = (film) => {
    filmPoster.src = film.poster
    filmTitle.innerText = film.title
    filmDescription.innerText = film.description
    filmRuntime.innerText = film.runtime + " mins"
    filmShowtime.innerText = film.showtime
    let remainingTickets = film.capacity - film.tickets_sold
    filmTicketNum.innerText = remainingTickets
    
    //handles events on buyButton when tickets are purchased
    buyButton.addEventListener("click", (evt) => {
        if(film.tickets_sold < film.capacity) { 
            let buyingTickets = film.tickets_sold + 1
            fetch(`${filmsUrl}/${film.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tickets_sold: buyingTickets
                })
            })
            .then(res => res.json())
            .then(updatedfilm => {
                film.tickets_sold = updatedfilm.tickets_sold
                filmTicketNum.innerText = updatedfilm.capacity - updatedfilm.tickets_sold    
            })
        }
        if(filmTicketNum.innerText === "0"){
            buyButton.innerText = "Sold Out"
        } 
    }) 
}