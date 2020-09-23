const url = "http://localhost:3000/films"
const url1 = "http://localhost:3000/films/1"

// Stable elements:

//SIDE BAR for MOVIE TITLES
// const moviesBoxLeftSideMenu = document.querySelector("div#films")
// const moviesTitleLeftSideMenu = moviesBoxLeftSideMenu.children[1]
// moviesTitleLeftSideMenu.innerText = ""
// moviesBoxLeftSideMenu.children[0].innerText = ""
const movieDiv = document.querySelector("div#films")
const moviesTitleLeftSideMenu = document.querySelector("#films")
//MOVIE POSTER 
const posterDiv = document.querySelector("img#poster")
//Selected MOVIE INFORMATION
const movieTitleDiv = document.querySelector("div#title.title")
const movieRuntimeDiv = document.querySelector("div#runtime.meta")
const infoDiv = document.querySelector("div#film-info")
const showtimeSpan = document.querySelector("span#showtime.ui.label")
const ticketNumSpan = document.querySelector("span#ticket-num")

const ticketButton = document.querySelector("div.ui.orange.button")

let movieGlobal = {}


fetch(url1)
    .then(res => res.json())
    .then(firstMovie => {
        renderFirstMovie(firstMovie)
    })

    let renderFirstMovie = (firstMovie) => {
        movieGlobal = firstMovie

        posterDiv.src = firstMovie.poster
        movieTitleDiv.innerText = firstMovie.title 
        movieRuntimeDiv.innerText = firstMovie.runtime 
        infoDiv.innerText = firstMovie.description
        showtimeSpan.innerText = firstMovie.showtime
        ticketNumSpan.innerText = firstMovie.capacity - firstMovie.tickets_sold
        ticketButton.id = `button${firstMovie.id}`

        soldOut()
    }

// fetch(url)
//     .then(res => res.json())
//     .then(movieArray => {
        
//         movieArray.forEach((movieObj) => {
//           turnMovieToDiv(movieObj)
//       })

//     function turnMovieToDiv(movieObj) {
//         let titleDiv = document.createElement("div")
//         titleDiv.class.add("film_title")
//         titleDiv.innerText = movieObj.title
//         moviesTitleLeftSideMenu.append(titleDiv) // need to create moviesTitleLeftSideMenu
//         // changeColor(titleDiv)
//             titleDiv.addEventListener("click", (evt)=>{
//                 movieDetails(movieObj)  
//             })
//     }    

        
ticketButton.addEventListener("click", (evt) => {
  let availableTickets = movieGlobal.capacity - movieGlobal.tickets_sold
    if (availableTickets > 0) {
      let ticketAdd = movieGlobal.tickets_sold + 1
      
      fetch(`${url}/${movieGlobal.id}`, {
        method: "PATCH",
        headers: {
                  "Content-Type": "application/json"
                 },
                  body: JSON.stringify({
                    tickets_sold: ticketAdd
                  })
                })
                .then(response => response.json())
                .then((updatedTicketInst) => {
                  // console.log(updatedTicketInst)
                    // Manipulating the DOM
                    const newRemainTicket = updatedTicketInst.capacity - updatedTicketInst.tickets_sold
                    ticketButton.innerText = newRemainTicket > 0 ? "Buy Ticket" : "Sold Out"
                    ticketNumSpan.innerText = newRemainTicket
                    // Update the POJO in memory
                    movieGlobal.tickets_sold = updatedTicketInst.tickets_sold

                })
    }
            //   if movie.tickets_sold_out < 
            // 1. calculate the number of tickets that are availbale (capacity - tickets_sold) outside of fetch
            // 2. structure of fetch request: 
            // 3. write the condition for available tickets (if else) 
})
    
function soldOut() {
  currentBtn = document.querySelector(`div#button${movieGlobal.id}`)
    if (ticketNumSpan.innerText === "0") {
      currentBtn.style.backgroundColor = "blue"
      currentBtn.innerText = "Sold Out"
    }
}