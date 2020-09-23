const url = "http://localhost:3000/films"
const url1 = "http://localhost:3000/films/1"
const filmShowCardDiv = document.querySelector("div#showing.ui.card")
const filmTitle = document.querySelector("div#title")
const filmRuntime = document.querySelector("div#runtime")
const filmCapacity = document.querySelector("div.content")
const filmDescription = document.querySelector("div#film-info")
const filmShowtime = document.querySelector("span#showtime")
const filmTicketNum = document.querySelector("span#ticket-num")
const filmPoster = document.querySelector("img#poster")
const filmBuyButton = document.querySelector("div.ui.orange.button")


fetch(url)
.then(res => res.json())
.then((filmsArr) => {
    renderFirstFilm(filmsArr)
    filmsArr.forEach((film) => {

    })
})
let renderFirstFilm = (filmsArr) => {
    let firstfilm = filmsArr[0]

    mainFilmShowing(firstfilm)
}   

let mainFilmShowing = (film) => {
    filmTitle.innerText = film.title
    filmRuntime.innerText = `${film.runtime} minutes`
    //filmCapacity.innerText = film.capacity
    filmDescription.innerText = film.description
    filmShowtime.innerText = film.showtime
    filmTicketNum.innerText = `${film.ticketNum} remaining tickets` //(film.capacity - film.ticketNum) = 
    filmPoster.src = film.image
// need to substract the number of tickets from the number of the capacity to find the 
// remaining ticket number
    let filmTicketNum = capacityNum - ticketNum

    filmShowCardDiv.innerHTML = ""


    // adding event listener to the buy button to count # of available ticket
    filmBuyButton.addEventListener("click", (evt) =>{
        let remaingTicketNum = film.ticketNum - 1
        // this should persist the info on the backend
        fetch(url1, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                ticketNum: remaingTicketNum
            })

        })
        // 
        .then(res => res.json())
        .then((updatedTicketNum) =>{
            filmTicketNum.innerText = (film.capacity - film.ticketNum) // update the DOM
            film.ticketNum = updatedTicketNum.ticketNum // update obj in memory
        })
    })

}

