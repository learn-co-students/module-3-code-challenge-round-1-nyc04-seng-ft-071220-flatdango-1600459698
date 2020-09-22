const url = "http://localhost:3000/films"

let filmsCollection = document.querySelector("#films-Coll");
let orangeButton = document.querySelector(".ui.orange.button")


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

        // console.log(filmObj);
        // arrayOfFilms.forEach((Film1) =>{
       
    // })   

  })
    //  ##### GET request here >
//   <!poster, title, runtime, showtime, description, available tickets>
  
  let filmToHTML = (filmObj) => {
    //    console.log(filmObj);
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
       if((filmObj.capacity - filmObj.tickets_sold )<= 0 ){
           orangeButton.innerText = "sold out"
           orangeButton.className = "sold-out"
           // return orangeButton
       }
    //    console.log(filmObj.tickets_sold, filmObj.tickets_sold)
       buyTickets(ticketNum, filmObj)
    // buy ticket function is being invoked here and passing ticket num and filmObj!
  }

//   ############### PATCH ##########################
//  function starts here

    let buyTickets = (ticketNum, filmObj) =>{
    //   EVENTLIStNTER STARTS HERE
 orangeButton.addEventListener("click",(evt) => {
    
     console.log("hello");
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




       
    //  doesn't work down here the if statement 

         
       


       })
   })
 }

// can only buy three tickets b/c the capcity is limted to 30 with 3 tickets remaining to buy
//  number of tickets should go from 27 to only one per b/c of capcity etc
// and "if" the showing is sold out that should be printed , so i need an if statement here for that 
// make button purchse a ticket , if it is soldout it should say sorry the show is soldout , else if great you bought the last ticket .
// in a console.log statement 
// fetch allows us to get a request responces , from a prodivied resource and allows us to get a respoce back


// line ten is not invoking the function without , it is a function definition . remember to put the ()
// don't need b/c  document.addEventListener "DOMContentLoaded",arrow function

//  
