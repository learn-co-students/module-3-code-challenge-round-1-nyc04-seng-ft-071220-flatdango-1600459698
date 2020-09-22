const url = "http://localhost:3000/films"

//I have to get a fetch to obtain information about it
//I have to do promises
//update the DOM

let movieTitle = document.getElementById("title")
let movieRuntime = document.getElementById("runtime")
let movieInfo = document.getElementById("film-info")
let movieShowtime = document.getElementById("showtime")
let movieTickets = document.getElementById("ticket-num")

let globalFilmObj = {}


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
       //  purchaseTicket(filmArr[0])

    })



let showMeMovieInfo = movie => {

    globalFilmObj = movie

    movieTitle.innerText = `${movie.title}`
    movieRuntime.innerText = `${movie.runtime} minutes`
    movieInfo.innerText = `${movie.description}`
    movieShowtime.innerText = `${movie.showtime}`

    // let capacity = `${movie.capacity}`
    // let ticketsSold = `${movie.tickets_sold}`
    // let ticketsLeft = capacity - ticketsSold

    

    movieTickets.innerText = ticketMath(movie)


}

let ticketMath = movie => {
    let capacity = `${movie.capacity}`
    let ticketsSold = `${movie.tickets_sold}`
    let ticketsLeft = capacity - ticketsSold

    return ticketsLeft


}


buyTicket.addEventListener("click", evt => {
    // console.log("This is the globalFilmObj:", globalFilmObj)

    // capacity = `${globalFilmObj.capacity}`

   
    
    if(ticketMath(globalFilmObj) > 0 ) {
        //if it is greater than 0 then I can sell a ticket
        
        ticketsSold = globalFilmObj.tickets_sold++

        // console.log("Tickets sold:", ticketsSold)
    
        fetch(`http://localhost:3000/films/${globalFilmObj.id}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tickets_sold: ticketsSold
                })
            })
            .then(res => res.json())
            .then(updatedObj => {
                console.log("what is this:", updatedObj)
                //Updating in memory 
                ticketsSold = updatedObj.tickets_sold
                
                //Updating in the DOM
                movieTickets.innerText = ticketMath(updatedObj)
                })
    }   
    
    if(ticketMath(globalFilmObj) === 0) {
        ticketsSold = globalFilmObj.tickets_sold++

        // console.log("Tickets sold:", ticketsSold)
    
        fetch(`http://localhost:3000/films/${globalFilmObj.id}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tickets_sold: ticketsSold
                })
            })
            .then(res => res.json())
            .then(updatedObj => {
                console.log("what is this:", updatedObj)
                //Updating in memory 
                ticketsSold = updatedObj.tickets_sold
                
                //Updating in the DOM
                movieTickets.innerText = `Sold Out. There are no `
                })
    }
})

//callback functions are at the mercy of the function that is receiving it
