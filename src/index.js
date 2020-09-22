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
const topOfSideBar=document.querySelector(".film.item")
const filmItem=document.querySelector('div.film.item:nth-child(2)')
let filmList= " "



fetch(url)
.then(resp => resp.json())
.then(movieArray => {
    movieTitle.innerText= movieArray[0].title
    poster.src=movieArray[0].poster
    runTime.innerText=`${movieArray[0].runtime} minutes`
    filmInfo.innerText=movieArray[0].description
    showTime.innerText=movieArray[0].showtime

    tickets.innerText=(movieArray[0].capacity-movieArray[0].tickets_sold)
         buyTicketFunc(movieArray[0])
})


//helper function 
  function buyTicketFunc(movie) {
    button.addEventListener("click",  (e) => {
        e.preventDefault()
       let currentTics=movie.tickets_sold +1
       let cap=movie.capacity
   
    
fetch(`${url}/${movie.id}`, {
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
        let newValue=(cap-updatedTickets.tickets_sold)
     if(newValue>0){
        movie.tickets_sold=updatedTickets.tickets_sold
     }else{
        button.innerText="Sold OUT"
     }
    })   
})

} 


//bonus deliverables
fetch(url)
.then(resp => resp.json())
.then(movieArray => {
    filmItem.innerHTML=" "
    topOfSideBar.innerHTML= " "
    movieArray.forEach(movie => {
        let filmLi=document.createElement("li")
        filmLi.innerText=movie.title
        filmItem.append(filmLi)
         

        filmLi.addEventListener("click", (e)=> {
     
            movieTitle.innerText= movie.title
            poster.src=movie.poster
            runTime.innerText=`${movie.runtime} minutes`
            filmInfo.innerText=movie.description
            showTime.innerText=movie.showtime
            tickets.innerText=(movie.capacity-movie.tickets_sold)
            buyTicketFunc(movie)
             
        //       button.addEventListener("click",  (e) => {
        //         e.preventDefault()
        //        let currentTics=movie.tickets_sold +1
        //        let cap=movie.capacity
           
            
        // fetch(`${url}/${movie.id}`, {
        //         method: 'PATCH',
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({
        //             tickets_sold: currentTics
        //         })
        //     })
        //  .then(resp => resp.json())
        //  .then(updatedTickets =>{
        //         tickets.innerText=cap-updatedTickets.tickets_sold
        //         let newValue=(cap-updatedTickets.tickets_sold)
        //      if(newValue>0){
        //         movie.tickets_sold=updatedTickets.tickets_sold
        //      }else{
        //         button.innerText="Sold OUT"
        //      }
        //     })
            
        // })
        
    })
  
 })


})