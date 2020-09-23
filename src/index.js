const url = "http://localhost:3000/films"

//Defining my stable DOM elements

const posterImage = document.querySelector("#poster")
const movieTitle = document.querySelector("#title")
const runtime = document.querySelector("#runtime")
const description = document.querySelector("#film-info")
const ticketNum = document.querySelector("#ticket-num")
const showTime = document.querySelector("#showtime")
const buyTicketBtn = document.querySelector("div.ui.orange.button")

//helper function to calculate how many tickets are left
const ticketsLeft = (movieObj) => movieObj.capacity - movieObj.tickets_sold

//helper function to render a movie to the DOM

function renderMovie(movieId){
    //Get a movie by id from the database with a fetch request
    const urlWithId = `${url}/${movieId}`
    fetch(urlWithId)
    .then(res => res.json())
    .then(movieObj => {

        // update the DOM elements using movieObj
        posterImage.src = movieObj.poster
        movieTitle.innerText = movieObj.title
        runtime.innerText = `${movieObj.runtime} minutes`
        description.innerText = movieObj.description
        showTime.innerText = movieObj.showtime

        //calculation of remaining tickets and adding that number the DOM for remaining tickets
        // let ticketsLeft = movieObj.capacity - movieObj.tickets_sold
        ticketNum.innerText = `${ticketsLeft(movieObj)}`




            //event listener for buy ticket button

        buyTicketBtn.addEventListener("click", ()=> {

            //when the button is clicked the number of tickets left should go down according to the number of tickets sold
            //incrementing the number of tickters sold should also allow for me to properly calculate on the DOM how many tickets are left
            //I need to send a fetch UPDATE request to persist the changes I make to the number of tickets sold and use the returned movieObj to update the DOM and the object in memory

            //need to use a ternary here to compare the number of tickets sold to the capacity
            const ticketIncrement = (movieObj.tickets_sold < movieObj.capacity)? movieObj.tickets_sold + 1 : movieObj.tickets_sold

            //update tickets sold in the database
            fetch(urlWithId, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                //increment tickets sold by one
                tickets_sold: ticketIncrement
                })
            })
            .then(res => res.json())
            .then(updatedMovieObj => {
                //update tickets sold in memory
                movieObj.tickets_sold = updatedMovieObj.tickets_sold

                //if the number of tickets sold === capacity change the button to sold out
                //else update the tickets in the DOM and keep the regular button
                //update tickets sold in the DOM

                if(updatedMovieObj.tickets_sold == updatedMovieObj.capacity){
                    buyTicketBtn.className = "ui button"
                    buyTicketBtn.innerText = "Sold Out"
                    ticketNum.innerText = `${ticketsLeft(updatedMovieObj)}`
                }else{
                    ticketNum.innerText = `${ticketsLeft(updatedMovieObj)}`
                }
            })
        })

    })



}

//rendering the first movie to the DOM
function renderFirstMovie(){
    const firstMovieId = 1
    renderMovie(firstMovieId)
}

renderFirstMovie()


