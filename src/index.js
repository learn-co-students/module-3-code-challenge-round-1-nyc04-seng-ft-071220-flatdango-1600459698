const url = "http://localhost:3000/films"

//stable elements
const posterDiv=document.querySelector('div.four.wide.column')
const uiCard=document.querySelector('.ui.cards')
const poster=document.querySelector('#poster')
const container=document.querySelector(".ui.centered.grid")
const movieTitle=document.querySelector(".title")
const runTime=document.querySelector('.meta')
const description=document.querySelector('.description')
const filmInfo=document.querySelector('#film-info')
const showTime=document.querySelector('#showtime')
const tickets=document.querySelector('#ticket-num')
const button=document.querySelector('.ui.orange.button')


fetch(url)
.then(resp => resp.json())
.then(movieArray => {
    movieTitle.innerText= movieArray[0].title
    poster.src=movieArray[0].poster
    runTime.innerText=`${movieArray[0].runtime} minutes`
    filmInfo.innerText=movieArray[0].description
    showTime.innerText=movieArray[0].showtime

    tickets.innerText=(movieArray[0].capacity-movieArray[0].tickets_sold)
    let ticketCount=(movieArray[0].capacity-movieArray[0].tickets_sold)

  if(ticketCount<1){
    button.innerText="Sold OUT"
}else {
   button.addEventListener("click",  (e) => {
        e.preventDefault()
       let currentTics=movieArray[0].tickets_sold +1
       let cap=movieArray[0].capacity
   
    
    fetch(`${url}/${movieArray[0].id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tickets_sold: currentTics
        })
    })
    .then(resp => resp.json())
    .then(updatedTickets =>{
        tickets.innerText=cap-updatedTickets.tickets_sold
       updatedTickets.tickets_sold=movieArray[0].tickets_sold 
     //I can only hit the buy tickets once. Have to refresh to be able to hit it again
    })
    
})
}

})


