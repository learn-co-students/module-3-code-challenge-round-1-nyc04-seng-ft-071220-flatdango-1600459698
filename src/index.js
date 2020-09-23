const url = "http://localhost:3000/films"

let filmsCollection = document.querySelector("#films-Coll");
let orangeButton = document.querySelector(".ui.orange.button")


// I wanted to refector this after watching the recap for the mock CC and remebered 
// that this is how it was done on a global scale then i chickened out and thought perhaps after i turn it in i can play with it for now lets just leave it alone
// but I believe I can do it 

// let imgTag = document.querySelector("#poster")
// let titleDiv =document.querySelector("#title")
// let runTimeDiv = document.querySelector("#runtime")
// let showTimeUi = document.querySelector("#showtime")
// let descriptionDiv =document.querySelector("#film-info")
// let ticketNum = document.querySelector("#ticket-num")
// GET the first film from my local hoststore them in a callback
// the result from line 14 into the .then for my BE 
// then am going to call it back into a => console.log that "object"
// then the filmObjects i want to make into an HTML 
// test console.log don't trust myself  my array of films see what i have looks good so far , 

// ####################### GET film #1 

    fetch("http://localhost:3000/films/1")
    .then(res => res.json())
    .then((filmObj) => {
     filmToHTML(filmObj)
// working with one argument here .
        // console.log(filmObj);
        // arrayOfFilms.forEach((Film1) =>{
       
    // })   
  })

    //  ##### GET request here >
//   <!poster, title, runtime, showtime, description, available tickets>
  
  let filmToHTML = (filmObj) => {
    //    console.log(filmObj)
    let imgTag = document.querySelector("#poster")
      imgTag.src = filmObj.poster
    // console.log(imgTag);

    let titleDiv =document.querySelector("#title")
     titleDiv.innerText =filmObj.title
//    console.log(filmObj.title)

    let runTimeDiv = document.querySelector("#runtime")
    runTimeDiv.innerText = filmObj.runtime
    // console.log(filmObj.runtime)

    let showTimeUi = document.querySelector("#showtime")
      showTimeUi.innerText = filmObj.showtime
    //   console.log(filmObj.showtime)

    let descriptionDiv =document.querySelector("#film-info")
        descriptionDiv.innerText = filmObj.description
        // console.log(filmObj.description)


    let ticketNum = document.querySelector("#ticket-num")
       ticketNum.innerText =filmObj.capacity - filmObj.tickets_sold
    //    console.log(filmObj.tickets_sold, filmObj.tickets_sold)

       
     buyTickets(ticketNum, filmObj)
    // buy ticket function is being invoked here and passing ticket num and filmObj!
  }

//   ############### PATCH ##########################
//       function starts here

    let buyTickets = (ticketNum, filmObj) =>{
    //   EVENTLIStNTER STARTS HERE
         orangeButton.addEventListener("click",(evt) => {
        // console.log("hello")
    
    // fetch is inside the event listner
        fetch(`http://localhost:3000/films/1`,{
           method: "PATCH",
           headers: {
               "Content-Type": "application/json",
               Accept: "application/json"
           },
           body: JSON.stringify({
             tickets_sold: filmObj.tickets_sold + 1
        
           })
       }) 

        .then(resp => resp.json())
        .then (updateTicket => {
           console.log(updateTicket);
             ticketNum.innerText = updateTicket.capacity - updateTicket.tickets_sold
             if((updateTicket.capacity - updateTicket.tickets_sold )<= 0 ){
             orangeButton.innerText = "sold out"
             orangeButton.className = "sold out"
            // return orangeButton
        }
               

       })
   })
 }

// can only buy three tickets b/c the capcity is limted to 30 with 3 tickets remaining to buy
//  number of tickets should go from 27 to only 3 as per the demo capacity is set to 30 in the db
// "if " after the remaining tickets are sold  there should be a message stating "sold out to the console.log or through if statement" , so i need an if statement here for that 
// make button purchse a ticket 
// fetch allows us to get a request responces , from a prodivied resource and allows us to get a responce back
// the ticketNum.innertext is equal to the filmobj.capacity  minus the filmObj.tickets_sold should give me 
// remaining tickets to be purchased 3
// create if statemnt and r/t sold tickets  if updateticket's capacity minus the updateticket's being sold is less than or equal to "0"
// once it reaches "0" then on the orange button on click print out "sold out" !
// now this took a while for me to do i really struggled with this statement and mconnecting the dots the review lectures
// helped me a lot and i started to refactor a bi to clean it up some and perhaps work on the 
// more advance delierables , but it was very clear if you ahve a solid understanding and can doit 
// then make sure you do it well , right now i am not super confidant i can make it happen , perhaps if i had more 
// time for this i could make it work 

// step one on the advance create div.film.item 
// create a variable to "get" fetch as in the above fetch i have but change the URL to films.id
// to collect all the films remaining and create a helper function .
// same as 38-61 create li/ul to print the list of titles of films so that they print out to the page 
//  let filmToLi = (filmObj) => {
    // const filmItemTitlesToLi = document.createElement("li")
    // filmItemLi.innerText = film.name
    // console.log()

    // before this i have to change line 25 to ${films.id} to get all the films printed out 
    // 
    // 

//  I want to later work on this to finish all the deliverables 



// don't need b/c  document.addEventListener "DOMContentLoaded" b/c i put defer in the script tag

//  
