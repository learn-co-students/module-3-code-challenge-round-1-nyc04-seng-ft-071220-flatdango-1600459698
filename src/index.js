//stable elements 

const url = "http://localhost:3000/films"
const filmsBoxLeftSide = document.querySelector("#films")
const filmsTitlesLeftSide = filmsBoxLeftSide.children[1]
filmsTitlesLeftSide.innerText = ""
filmsBoxLeftSide.children[0].innerText = ""

const filmPoster = document.querySelector("img#poster")
const filmTitle = document.querySelector("div#title.title")
const filmRunTime = document.querySelector("div#runtime.meta")
const filmInfo = document.querySelector("div#film-info")
const filmShowTime = document.querySelector("span#showtime.ui.label")
const filmTicketNum = document.querySelector("span#ticket-num")

const buyTicketButton = document.querySelector("div.ui.orange.button")

let filmGlo = {}

// ----------------------------------------------------------------------------
// fetch 

function fetchFilms(){
    return fetch(url)
    .then(res => res.json())
}


fetchFilms().then(filmsObj => {
    movieDetails(filmsObj[0])
    filmsObj.forEach(filmObj => {
        turnFilmObjToHTML(filmObj)
    })
})



// ----------------------------------------------------------------------------
//main section 


function turnFilmObjToHTML(filmObj){
    let titleLI = document.createElement('li')
    titleLI.classList.add("film_title")
    titleLI.innerText = filmObj.title
    filmsTitlesLeftSide.append(titleLI)

    changeColor(titleLI)
    titleLI.addEventListener("click", (evt)=>{
        movieDetails(filmObj)  
    })

}


buyTicket()


//  ----------------------------------------------------------------------------
// helper functions

function changeColor(ele){
    ele.addEventListener("mouseenter", (evt)=>{
        evt.target.style.cursor = "pointer"
        evt.target.style.color = "blue"
        ele.addEventListener("mouseleave", (evt)=>{
            evt.target.style.color = "black"
        }) 
    })
}


function movieDetails(singleObj){
    filmGlo = singleObj
 
    filmPoster.src = singleObj.poster
    filmTitle.innerText = singleObj.title
    filmRunTime.innerText = `${singleObj.runtime} minutes`
    filmInfo.innerText = singleObj.description 
    filmShowTime.innerText = singleObj.showtime
    filmTicketNum.innerText = Number(singleObj.capacity) - singleObj.tickets_sold
    buyTicketButton.id = `button${singleObj.id}`
          
}


function buyTicket(){
    buyTicketButton.addEventListener("click", (evt)=>{
        if(filmGlo.tickets_sold < Number(filmGlo.capacity)){ 
            let ticketAdd = filmGlo.tickets_sold + 1
            fetch(`${url}/${filmGlo.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tickets_sold: ticketAdd
                })
            })
            .then(res => res.json())
            .then(updatedfilm => {
                filmGlo.tickets_sold = updatedfilm.tickets_sold
                filmTicketNum.innerText = Number(updatedfilm.capacity) - updatedfilm.tickets_sold

                // soldOut()
            })
         } 
    })

}   


function soldOut(){  
    currentButton = document.querySelector(`div#button${filmGlo.id}`)
    if(filmTicketNum.innerText === "0"){
        currentButton.style.backgroundColor = "red"
        currentButton.innerText = "SOLD OUT"
    }
}
