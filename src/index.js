// Please read notes before testing:

// tried to implement buying ticket function for all movies.
// issue - when clicking buy ticket button on a movie OTHER THAN first movie
// -it updates the first movie's ticket amount left.
// couldn't figure out how to refactor in order to remove
// -event listener on the button, it is always associated with the first movie
// issue - buy ticket button also randomly associates with other movies
// maybe not having the button as a stable element would be a workaround in this scenario?

// Core deliverables working and two advanced below working:
// See a menu of all movies on the left side of the page.
// Click on a movie in the menu to replace the currently displayed movie's details with the new movie's details.

// Advanced deliverables NOT working:
// Buy a ticket for any movie and update the tickets sold for that movie, not just the first.
// Indicate in the menu which movies are sold out.


const url = "http://localhost:3000/films"

const filmPoster = document.querySelector('#poster')
const filmTitle = document.querySelector('div#title')
const filmInfo = document.querySelector('div#film-info')
const filmRuntime = document.querySelector('div#runtime')
const filmShowtime = document.querySelector('span#showtime')
const ticketNum = document.querySelector('span#ticket-num')
const buyTicketBtn = document.querySelector('div.ui.orange.button')
const movieList = document.querySelector('#films')

const calculateTicketsLeft = film => parseInt(film.capacity, 10) - film.tickets_sold

const parseOneFilm = film => {
    let ticketsLeft = calculateTicketsLeft(film)
    filmPoster.src = film.poster
    filmTitle.innerText = film.title
    filmInfo.innerText = film.description
    filmRuntime.innerText = `Runtime: ${film.runtime} minutes`
    filmShowtime.innerText = film.showtime
    ticketNum.innerText = ticketsLeft

    if (!ticketsLeft) {
        buyTicketBtn.remove()
    }
}

const buyTicket = film => {
    buyTicketBtn.addEventListener('click', event => {
        let newTicketsSold = film.tickets_sold + 1
        fetch(`${url}/${film.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    //update tickets_sold backend
                    tickets_sold: newTicketsSold
                })
            })
            .then(response => response.json())
            .then(updatedFilmObj => {
                film.tickets_sold = updatedFilmObj.tickets_sold
                parseOneFilm(updatedFilmObj)
            })
    })
}

// getfirst film

fetch(`${url}/1`)
    .then(response => response.json())
    .then(film => {
        parseOneFilm(film)
        buyTicket(film)
        getAllFilms()
    })

const getAllFilms = () => {
    fetch(url)
        .then(response => response.json())
        .then(filmsArray => {

            filmsArray.forEach(film => {
                let filmList = document.createElement('div')
                filmList.classList.add('film', 'item')
                filmList.innerText = film.title
                movieList.append(filmList)

                filmList.addEventListener('click', event => {
                    parseOneFilm(film)
                    // buyTicket(film)
                })
            })
        })

}