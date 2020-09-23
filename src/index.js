const url = "http://localhost:3000/films"



fetch(url)
.then(res => res.json())
.then((filmsArray) => {
        createFilmInfo(filmsArray[0])
    })

let createFilmInfo = (film) => {
    let title = document.querySelector("div#title")
    let runtime = document.querySelector("div#runtime")
    let description = document.querySelector("div#film-info")
    let showtime = document.querySelector("span#showtime")
    let remainingTickets = document.querySelector("span#ticket-num")
    title.innerHTML = film.title
    runtime.innerHTML = film.runtime + " minutes"
    description.innerHTML = film.description
    showtime.innerHTML = film.showtime
    let numTickets = getTicketnumber(film)
    remainingTickets.innerHTML = numTickets
    let buyButton = (document.querySelector('div#buybutton'))
    buyButton.addEventListener("click", (evt) =>{
        if (numTickets > 0){
            numTickets = numTickets - 1
            remainingTickets.innerHTML = numTickets
        }
       
})
}

let getTicketnumber = (film) => {
    let ticketNumber = parseInt(film.capacity) - parseInt(film.tickets_sold)

    return ticketNumber
}

