const url = "http://localhost:3000/films"

//I have to get a fetch to obtain information about it
//I have to do promises
//update the DOM

let movieTitle = document.getElementById("title")
let movieRuntime = document.getElementById("runtime")
let movieInfo = document.getElementById("film-info")
let movieShowtime = document.getElementById("showtime")
let movieTickets = document.getElementById("ticket-num")

//why is my buyTicket correct below but not document.getElementsByClassName(".ui.orange.button")
let buyTicket = document.querySelector("div#showing.ui.cards")

fetch(url)
    .then(res => res.json())
    .then(filmArr => {
        //console.log("This is my filmArr:", filmArr)
        filmArr.forEach(filmObj => {
            //console.log("This is my filmObj:", filmObj)
            showMeMovieInfo(filmObj)
            
        })

       //invoking the function but highlighting wrong movie.
         purchaseTicket(filmArr[0])

    })



let showMeMovieInfo = movie => {

    movieTitle.innerText = `${movie.title}`
    movieRuntime.innerText = `${movie.runtime} minutes`
    movieInfo.innerText = `${movie.description}`
    movieShowtime.innerText = `${movie.showtime}`

    let capacity = `${movie.capacity}`
    let ticketsSold = `${movie.tickets_sold}`
    let ticketsLeft = capacity - ticketsSold

    movieTickets.innerText = `${ticketsLeft}`


}


let purchaseTicket = movie => {

buyTicket.addEventListener("click", evt => {
    evt.preventDefault()
    
    console.log("🐶")
    
    fetch(`http://localhost:3000/films/${movie.id}`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
         },
        body: JSON.stringify({
            tickets_sold: ticketCount
            })
        })
        .then(res => res.json())
        .then(something => {
            console.log("what is this:", something)
            })
        
    })
}