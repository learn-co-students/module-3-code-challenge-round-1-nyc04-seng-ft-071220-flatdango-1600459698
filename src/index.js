const url = "http://localhost:3000/films"

let movieTitle = document.getElementById("title")
let movieRuntime = document.getElementById("runtime")
let movieInfo = document.getElementById("film-info")
let movieShowtime = document.getElementById("showtime")
let movieTickets = document.getElementById("ticket-num")
let moviePoster = document.getElementById("poster")
//why is my buyTicket correct below but not document.getElementsByClassName(".ui.orange.button")
let buyTicket = document.querySelector("div#showing.ui.cards")
//sidebar information
let sidebarTitles = document.querySelector("div#films")
//this variable will be rewritten to bring in information w/o a fetch
let globalFilmObj = {}



//Communicate with the backend to display movie information (right hand side)
fetch(url)
    .then(res => res.json())
    .then(filmArr => {
        //console.log("This is my filmArr:", filmArr)
        filmArr.forEach(filmObj => {
            //console.log("This is my filmObj:", filmObj)
            showMeMovieInfo(filmObj) 
        })
    })

//Communicate with the backend to display sidebar with movie titles
//I am curious why this worked when it occured to me to do another fetch
//This did not work when I nested it in the first one. Maybe for each iteration
//callback functions are at the mercy of the function that is receiving it
//I can only do one callback function?....
fetch(url)
    .then(res => res.json())
    .then(filmArrSide => {

        //remove the first 2 elements that were text directions. need to have it in a loop if not everything is removed
        //this is not working 😐
        // if(sidebarTitles.firstChild) {
        //  sidebarTitltes.firstChild.remove()
        // }
        filmArrSide.forEach(filmObjSide => {
            makeMovieDiv(filmObjSide)
        })
    })

//For all of my helper functions I just passed in movie so that I don't get confused
//Should I have chosen a different name each time to pass?

//Helper function to show movie info 
let showMeMovieInfo = movie => {

    globalFilmObj = movie
    //we don't need to interpolate strings....
    movieTitle.innerText = movie.title
    movieRuntime.innerText = `${movie.runtime} minutes` //movie.runtime + "minutes"
    movieInfo.innerText = movie.description
    movieShowtime.innerText = movie.showtime
    
    //update poster
    moviePoster.src = movie.poster
    //call on a helper function to keep track of tickets
    movieTickets.innerText = ticketMath(movie)
}

let makeMovieDiv = movie => {
    //add information to our sidebar
    //create a div, add class to div for "film item", add class to div if movie is sold out. 
    //I can do this in the fetch with a PATCH request if statement
    //I am creating the outermost element

    //I have to remove the first 2 elements that exist in the div
    //I'll do that in the fetch
    let movieDiv = document.createElement("div")
    //now add information/razzmatazz

    movieDiv.className = "film item"
    movieDiv.innerText = movie.title

    //add it to the DOM
    sidebarTitles.append(movieDiv)

    //I most likely need an event listener in this function bc it is an unstable element
    //So I will add an event listeneer with a helper function 
    //to display info. I already wrote this function I just need to 
    //add more to showMeMovieInfo to do sidebar to updating poster
    //it updates the information 🥳

    movieDiv.addEventListener("click", evt => {
        console.log("I am in this event listener 🐶")
        showMeMovieInfo(movie)
    })

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
        //I should be razzmazztazzing the Button to say "sold out"
        //I should be greying out the title of the film if it is "sold out"
        //I could make a helper function and call it here separate than my showMeMovieInfo ?
        
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
            //I will updated sold out DOM details here
            movieTickets.innerText = `Sold Out. There are no `

           
            })
    }
})


