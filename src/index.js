const url = "http://localhost:3000/films"
let posterImg= document.querySelector('img#poster')
let movieTitle= document.querySelector('div#title.title')
let runTimeInfo= document.querySelector('#runtime.meta')
let movieDescription= document.querySelector('#film-info')
let showTime= document.querySelector('#showtime.ui.label')
let ticketNum= document.querySelector('#ticket-num')
let button=document.querySelector('.ui.orange.button')

    
    fetch("http://localhost:3000/films/1")
    .then(resp=>resp.json())
    .then(secondResponse=> {
        addFirstMovie(secondResponse)
        addsEventListener(secondResponse)
    }
    )

    let addFirstMovie= (movie)=>{
        posterImg.src= movie.poster
        movieTitle.innerText= movie.title
        runTimeInfo.innerText=movie.runtime + " minutes"
        movieDescription.innerText=movie.description 
        showTime.innerText=movie.showtime
        ticketNum.innerText= (movie.capacity-movie.tickets_sold)
        determineStyling(movie)
    }
    



    let addsEventListener= (movie) =>{
    button.addEventListener("click", function addsClick(evt){
        let updatedTicketNumber= movie.tickets_sold + 1
    
        fetch("http://localhost:3000/films/1", {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tickets_sold: updatedTicketNumber
            })
          })
        .then(resp=>resp.json())
        .then(secondResponse=>{
            movie.tickets_sold = updatedTicketNumber
            determineStyling(movie)
             
        }) 
    }) 
}


let determineStyling= (movie)=>{
    if(movie.tickets_sold == movie.capacity || movie.tickets_sold > movie.capacity){
        changeButton(button)
        ticketNum.innerText= (movie.capacity-movie.tickets_sold)
          // is there a way to remove an event handler from a button
      } else {
          ticketNum.innerText= (movie.capacity-movie.tickets_sold)
          button.innerText= "Buy Ticket"
      }    
}
// when I change the style of the button why does it not persist-when I refresh it
// goes back to the original button
let changeButton= (button)=>{
    button.innerText= "Soldout";
    button.style.background= "grey"
    button.style.pointerEvents= "none"
    // is there a way to remove an event handler from a button
    // button.removeEventlistener
}


//advanced deliverables -step by step
// select the div to put the movie titles to put in 
// let filmItemContainer= document.querySelector('film#ui.divided.list')
// fetch from the backend, and slap it on the dom
// fetch ("url").then (resp=>resp.json()).then(secondResponse=>{
// secondResponse.forEach(movie=>movie)
// })