const url = "http://localhost:3000/films"
//**poster, title, runtime, showtime, and available tickets**

let extraContentDiv = document.querySelector("div.extra-content")

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

    //Added to make it look more complete 
    let descriptionDiv = document.querySelector("#film-info")
        descriptionDiv.innerText = filmObj.description
        // console.log(filmObj.description)
    
    let ticketNum = document.querySelector("#ticket-num")
        ticketNum.innerText = filmObj.capicity-filmObj.tickets_sold
        console.log(filmObj.capicity - filmObj.tickets_sold)

}

    //I know the remaining part needs a if/else statment but I could't figure out how to
    // let buyButtonDiv = document.querySelector("div.extra-content")
    // let extraContentDiv = document.querySelector("div.extra-content")


    // extraContentDiv.addEventListener("click", (evt) => { 
    //     // let theRemainingTickets = filmObj.tickets_sold + 1 
    //     let extraContentDiv = filmObj.tickets_sold + 1 
         //console.log("Purchase successful")

        // fetch(`http:/localhost:3000/films/${film.id}`, {
        //     method: "PATCH",
        //     headers: {
        //       "Content-Type": "application/json",
        //       Accept: "application/json"
        //     },
        //     body: JSON.stringify({
        //       tickets_sold: tickets_sold + 1
        //     })
         
        //   })
        //   .then(res => res.json())
        //  
        //   .then((updatedFilmObj) => {
        //    
        //      extraContentDiv.innerText = `${updatedTickets_sold} remaining_tickets`
        //   
        //    extraContentDiv = updatedextraContentDiv
        //   })
        

       

      