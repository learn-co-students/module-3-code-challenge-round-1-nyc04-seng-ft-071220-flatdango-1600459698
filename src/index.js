const url = "http://localhost:3000/films"
//**poster, title, runtime, showtime, and available tickets**
// let filmsCollection = document.querySelector("films#films-Coll")

fetch("http://localhost:3000/films/1")
    .then(resp => resp .json()) 
    .then((filmObj) => {
    turnFilmToHtml(filmObj)
    })
    // Define turnFilmObjToHtml
    let turnFilmToHtml = (filmObj) => {
        // console.log(filmObj)
    
    let imgPosterDiv = document.querySelector("img#poster")
        imgPosterDiv.src = filmObj.poster 
            // console.log(imgPosterDiv)

    let titleDiv = document.querySelector("#title")
        titleDiv.innerText = filmObj.title
            //  console.log(filmObj.title)
    
    let runTimeDiv = document.querySelector("#runtime")
        runTimeDiv.innerText = filmObj.runtime 
            // console.log(filmObj.runtime)

    let showTimeUi = document.querySelector("#showtime")
        showTimeUi.innerText = filmObj.showtime
            // console.log(filmObj.showtime)

    //wanted to add 
    let descriptionDiv = document.querySelector("#film-info")
        descriptionDiv.innerText = filmObj.description
        // console.log(filmObj.description)
    
    let ticketNum = document.querySelector("#ticket-num")
        ticketNum.innerText = filmObj.tickets_sold
        // console.log(filmObj.tickets_sold) 

}

    buyButton.addEventListner("click", (evt) =>{
        let theRemainingTickets = ticket.num + 1 
        console.log("Your ticket Purchase was Successful")

    })


    

