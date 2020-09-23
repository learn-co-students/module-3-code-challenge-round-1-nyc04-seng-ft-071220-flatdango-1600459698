const url = "http://localhost:3000/films"
let titleUl = document.querySelector("div#films")
let filmImage = document.querySelector("#poster")
let filmTitle = document.querySelector("div#title")
let filmRuntime = document.querySelector("div#runtime")
let filmShowtime = document.querySelector("#showtime")
let filmDescr = document.querySelector("#film-info")



/// grabbing the objects from the api/json file
fetch(`http://localhost:3000/films`)
.then (response => response.json())
.then((filmsArray) => {
    filmsArray.forEach((aFilm) => {
        turnFilmLiToHTML(aFilm)
    })
})

let turnFilmLiToHTML = (filmObj) => {
    
    let sidebarTitleLi = document.createElement("li") 
    sidebarTitleLi.classList.add("list-container")
    //added it to the side bar 
    sidebarTitleLi.innerText = filmObj.title
   //grabbing the title
    titleUl.append(sidebarTitleLi)
    // adding it to the DOM
    sidebarTitleLi.addEventListener("click", (evt) =>{
        renderMainFilm(filmObj) 

   
    sidebarTitleLi.addEventListener("click", (evt) =>{
       renderMainFilm(filmObj) 

  //    let ticketNum = document.createElement("description")
    //    ticketNum.classList.
    //    some math is needed to get numbers of tickets left - capactity


    //    let buyButton = document.createElement("button")
    // buyButton.classList.add("extra content")
    // buyButton.innerText = "Buy Ticket"


    // buyButton.addEventListener("click", (evt)=>{
    //     let aPurchase = film.
    
    // add an event listener  and have it minus
    })
    })

}


let renderMainFilm = (aFilm) => {
    filmImage.src = aFilm.poster
    filmTitle.innerText = aFilm.title
    filmRuntime.innerText = aFilm.runtime
    filmShowtime.innerText = aFilm.showtime 
    filmDescr.innerText = aFilm.description
}

