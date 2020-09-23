// From Readme:
// CORE DELIVERABLES
// As a user, I can:

// See the first movie's details, including its poster, title, runtime, showtime, and available tickets 
// (the number of tickets left will need to be derived from the theater's capacity and the number of tickets sold)
// Buy a ticket for a movie. The number of tickets sold for that movie should be persisted, 
// and I should be able to see the number of available tickets decreasing on the frontend.
// I should not be able to buy a ticket if the showing is sold out.

// Stable elements. Dataset property stores data attributes.
const url = "http://localhost:3000/films"
const posterDiv = document.querySelector("#poster")
const filmsDiv = document.querySelector("#films")
const showingDiv = document.querySelector("#showing")
const ticketButton = showingDiv.querySelector(".ui.orange.button")
const filmTitle = showingDiv.querySelector("#title")
const filmInfo = showingDiv.querySelector("#film-info")
const filmRuntime = showingDiv.querySelector("#runtime")
const filmShowtime = showingDiv.querySelector("#showtime")
const filmRemainingTickets = showingDiv.querySelector("#ticket-num")
const currentFilm = showingDiv.dataset

// Click event listener
filmsDiv.addEventListener("click", function(evt){
    let id = evt.target.id
    fetch(url + `/${id}`)
    .then(res => res.json())
    .then(film => displayFilm(film))
})

// Mouse event listener for changing color of film titles
function titleColor(film){
    film.addEventListener("mouseenter", (evt)=>{
        evt.target.style.cursor = "pointer"
        evt.target.style.color = "red"
        film.addEventListener("mouseleave", (evt)=>{
            evt.target.style.color = "black"
        }) 
    })
}

// Get and display the first film's information
function getFirstFilm(){
    fetch(url + "/1")
    .then(res => res.json())
    .then(film => displayFilm(film))
}

getFirstFilm()

function displayFilm(film){
    posterDiv.dataset.id = film.id
    posterDiv.src = film.poster
    currentFilm.id = film.id
    currentFilm.capacity = film.capacity
    currentFilm.tickets_sold = film.tickets_sold
    filmTitle.innerText = film.title
    filmInfo.innerText = film.description
    filmShowtime.innerText = film.showtime
    filmRuntime.innerText = film.runtime + " Minutes"
    filmRemainingTickets.innerText = parseInt(film.capacity) - parseInt(film.tickets_sold)

    if (parseInt(film.capacity) - parseInt(film.tickets_sold) < 1){
        ticketButton.innerText = "Sold Out" 
        ticketButton.disabled = true
    } 
    else {
        ticketButton.innerText = "Buy Ticket" 
        ticketButton.disabled = false
    }
}

// Buy tickets for available movies and indicate sold out movies
ticketButton.addEventListener("click", function(){
    let id = currentFilm.id
    let capacity = currentFilm.capacity
    let tickets_sold = currentFilm.tickets_sold
    if (parseInt(capacity) - parseInt(tickets_sold) > 0){
        tickets_sold = parseInt(tickets_sold) + 1
        fetch(url + `/${id}`, {
            method: "PATCH",
            headers: {
            "Content-Type":"application/json"
            },
            body: JSON.stringify({tickets_sold: tickets_sold})
        })
        .then(r => r.json())
        .then(film => updateTicketCount(film))

        function updateTicketCount(film){
            currentFilm.tickets_sold = film.tickets_sold
            filmRemainingTickets.innerText = parseInt(film.capacity) - parseInt(film.tickets_sold)
            if (parseInt(film.capacity) - parseInt(film.tickets_sold) < 1){
                ticketButton.innerText = "Sold Out" 
                ticketButton.disabled = true
            } 
        }
    }
})

// Get and list all films in sidebar menu
function getAllFilms(){
    fetch(url)
    .then(res => res.json())
    .then(films => listAllFilms(films));
}

getAllFilms()

function listAllFilms(films){
    const nowShowing = filmsDiv.children[0]
    const soldOut = filmsDiv.children[1]
    nowShowing.innerText = "• • • • NOW SHOWING  • • • •"
    soldOut.innerText = "• • • • SOLD OUT • • • •"
    films.forEach(film => {
        let filmDiv = document.createElement("div")
        if (parseInt(film.capacity) - parseInt(film.tickets_sold) > 0){
        filmDiv.className = "film" 
        filmDiv.id = film.id
        filmDiv.innerText = `${film.title}`
        nowShowing.append(filmDiv)
        } 
        else {
        filmDiv.id = film.id
        filmDiv.className = "sold-out"
        filmDiv.innerText = `${film.title}`
        soldOut.append(filmDiv)
        }

        titleColor(filmDiv)
        filmDiv.addEventListener("mouseover", (evt) => {
        film(film)  
        })
    })
}

// From Readme:
// Advanced Deliverables:
// These deliverables are not required to pass the code challenge, 
// but if you have extra time, you should attempt them! They are a great way to stretch your skills.

// If you're going to attempt the advanced deliverables, 
// make sure you have a working commit with all the core deliverables first!

// As a user, I can:

// See a menu of all movies on the left side of the page.
// Click on a movie in the menu to replace the currently displayed movie's details with the new movie's details.
// Buy a ticket for any movie and update the tickets sold for that movie, not just the first.
// Indicate in the menu which movies are sold out.
