const url = "http://localhost:3000/films"

const filmPoster = document.querySelector('#poster')
const filmTitle = document.querySelector('div#title')
const filmInfo = document.querySelector('div#film-info')
const filmRuntime = document.querySelector('div#runtime')
const filmShowtime = document.querySelector('span#showtime')
const ticketNum = document.querySelector('span#ticket-num')
const buyTicketBtn = document.querySelector('div.ui.orange.button')

const calculateTicketsLeft = film => parseInt(film.capacity, 10) - film.tickets_sold

const parseOneFilm = film => {
    let ticketsLeft = calculateTicketsLeft(film)
    filmPoster.src = film.poster
    filmTitle.innerText = film.title
    filmInfo.innerText = film.description
    filmRuntime.innerText = `Runtime: ${film.runtime} minutes`
    filmShowtime.innerText = film.showtime
    ticketNum.innerText = ticketsLeft

    if (ticketsLeft === 0) {
        buyTicketBtn.remove()
    }
}

const buyTicket = (film) => {
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

// get first film
const getFirstFilm = () => {
    fetch(`${url}/1`)
        .then(response => response.json())
        .then(film => {
            parseOneFilm(film)
            buyTicket(film)
        })
}

getFirstFilm()