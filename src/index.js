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
  function buyTicketFunc(movieVar) {

  
    let cap=movieVar.capacity 
    let currentTics=movieVar.tickets_sold
    let ticketsRemain=(cap-currentTics)
    if(ticketsRemain ===0){
        button.innerText="Sold Out"
    }else{
    while(ticketsRemain > 0){
    button.addEventListener("click",  (e) => {
       
 let currentTics=(movieVar.tickets_sold +1)
   
fetch(`${url}/${movieVar.id}`, {
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
        tickets.innerText=(cap-updatedTickets.tickets_sold)
        let newValue=(cap-updatedTickets.tickets_sold)
     if(newValue===0){
      //  e.preventDefault()
        button.innerText="Sold OUT"
  
        //helper method below
          transformLiTitle(movieVar)
        //cant figure out how to change the movie to grey
    
     }else{
         button.innerText="Buy Ticket"
         movieVar.tickets_sold=updatedTickets.tickets_sold
     }
    })   
    console.log(e)
})

ticketsRemain--;
    }
}

} 

//comment out  from here down if you want to just see requried deliverable functionality work
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
        

        //this will change title on left to grey when tickets remain is 0
        if((movie.capacity-movie.tickets_sold)===0){
            filmLi.className="sold-out film item"
        }

        filmLi.addEventListener("click", (e)=> {
            movieTitle.innerHTML=""
            poster.src=""
            runTime.innerHTML=""
            filmInfo.innerHTML=""
            tickets.innerHTML=""
            showTime.innerHTML=""
            button.innerHTML=" "
            button.innerText="Buy Ticket"
            
            movieTitle.innerText= movie.title
            poster.src=movie.poster
            runTime.innerText=`${movie.runtime} minutes`
            filmInfo.innerText=movie.description
            showTime.innerText=movie.showtime
            tickets.innerText=(movie.capacity-movie.tickets_sold)

      
            buyTicketFunc(movie)   
    })
  
 })


})

function transformLiTitle(movie){
    if(movie.title==filmItem.innerText){
        filmItem.className="sold-out film item"
    }
}
