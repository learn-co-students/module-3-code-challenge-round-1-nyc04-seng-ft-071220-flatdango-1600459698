const url = "http://localhost:3000/films"

let titlesUL = document.querySelector(".ui.divided.list")

fetch(url)
.then(res => res.json())
.then((filmsArray) => {
        filmsArray.forEach((singularFilm) =>{
            turnFilmIntoLi(singularFilm)
        })
        
        // createFilmInfo(filmsArray[0])
    })


let turnFilmIntoLi = (film) => {
    let movieDiv = document.createElement("div")
    movieDiv.className = "film item"
    movieDiv.innerHTML = film.title
    titlesUL.appendChild(movieDiv)

    movieDiv.addEventListener("click", (evt) => {
            createFilmInfo(film)
            
    })

}

let createFilmInfo = (film) => {
    let title = document.querySelector("div#title")
    let runtime = document.querySelector("div#runtime")
    let description = document.querySelector("div#film-info")
    let showtime = document.querySelector("span#showtime")
    let remainingTickets = document.querySelector("span#ticket-num")
    let moviePoster = document.querySelector("img")
    title.innerHTML = film.title
    runtime.innerHTML = film.runtime + " minutes"
    description.innerHTML = film.description
    showtime.innerHTML = film.showtime
    moviePoster.src = film.poster
    let numTickets = getTicketnumber(film)
    remainingTickets.innerHTML = numTickets
    let buyButton = (document.querySelector('div#buybutton'))
    buyButton.addEventListener("click", (evt) =>{

        let buyButton = (document.querySelector('div#buybutton'))
        if (numTickets > 0){
            numTickets = numTickets - 1
            remainingTickets.innerHTML = numTickets
            buyButton.innerHTML = "BUY TICKET"
            buyButton.className = "ui orange button"
        }
        if (numTickets < 1){
            
            buyButton.innerHTML = "SOLD OUT"
            buyButton.className = "sold-out"

        }
       
    })
}

let getTicketnumber = (film) => {
    let ticketNumber = parseInt(film.capacity) - parseInt(film.tickets_sold)

    return ticketNumber
}

