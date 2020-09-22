const url = "http://localhost:3000/films"
let filmItems = document.querySelector("#films");
let PosterDiv = document.querySelector("img#poster").parentElement;
let showInfoCard = document.querySelector(".card");

//delets all preloaded html (placeholders)
showInfoCard.innerHTML = "";
filmItems.innerHTML = "";
PosterDiv.innerHTML = "";

//after getting rid of the html from before creates new elements gets data from database
window.addEventListener('DOMContentLoaded', (evt) => {
    fetch(url)
    .then(res => res.json())
    .then(movieObjs => {
        movieObjs.forEach(movieObj => {
            createMovieList(movieObj);
        });
        let firstDiv = document.querySelector("#films").childNodes[0];
        createPosterShowInfo(movieObjs[0], firstDiv);
    })
    let createMovieList = (movieObj) => {
        let filmDiv = document.createElement("div");
        filmDiv.className = "film item";

        filmDiv.append(movieObj.title);
        filmItems.append(filmDiv);
        if(movieObj.capacity - movieObj.tickets_sold === 0) {
            filmDiv.className = "sold-out-film";
        }
        filmDiv.addEventListener("click", (evt) => {
            PosterDiv.innerHTML = "";
            showInfoCard.innerHTML = "";
            createPosterShowInfo(movieObj, filmDiv);
        })
    }

    //creates all the elements and shows it on the page
    let createPosterShowInfo = (movieObj, filmDiv) => {
        //poster
        let PosterImg = document.createElement("img");
        PosterImg.id = "poster";
        PosterImg.src = movieObj.poster;
        PosterImg.alt = movieObj.title;

        //show Info
        let titleDiv = document.createElement("div");
        titleDiv.id = "title";
        titleDiv.classList.add("title");
        titleDiv.innerText = movieObj.title;

        let runTimeDiv = document.createElement("div");
        runTimeDiv.id = "runtime";
        runTimeDiv.classList.add("meta");
        runTimeDiv.innerText = `${movieObj.runtime} minutes`

        //content
        let filmContentDiv = document.createElement("div");
        filmContentDiv.classList.add("content");

        //inside the content div
        //description
        let filmDescriptionDiv = document.createElement("div");
        filmDescriptionDiv.classList.add("description");

        //inside the description div
        let filmInfoDiv = document.createElement("div");
        filmInfoDiv.id = "film-info";
        filmInfoDiv.innerHTML = `${movieObj.description}`;

        let showTimeSpan = document.createElement("span");
        showTimeSpan.id = "showtime";
        showTimeSpan.className = "ui label";
        showTimeSpan.innerText = movieObj.showtime;

        let remainingTickets = movieObj.capacity - movieObj.tickets_sold;
        let ticketNumSpan = document.createElement("span");
        ticketNumSpan.id = "ticket-num";
        ticketNumSpan.innerText = `    ${remainingTickets}     remaining tickets`;

        //ouside the content div but inside the card div
        let extraContentDiv = document.createElement("div");
        extraContentDiv.className = "extra content";

        let orangeBtnDiv = document.createElement("div");
        orangeBtnDiv.className = "ui orange button";
        orangeBtnDiv.innerText = "Buy Ticket";


        //poster
        PosterDiv.append(PosterImg);
        //show info
        extraContentDiv.append(orangeBtnDiv);
        filmDescriptionDiv.append(filmInfoDiv, showTimeSpan, ticketNumSpan);
        filmContentDiv.append(filmDescriptionDiv);
        showInfoCard.append(titleDiv, runTimeDiv, filmContentDiv, extraContentDiv);

        
        if(remainingTickets === 0) {
            orangeBtnDiv.className = "sold-out";
            orangeBtnDiv.innerText = "Sold out";
        }
        
        orangeBtnDiv.addEventListener("click", (evt) => {
            if(remainingTickets !== 0) {
                let ticketsSold = movieObj.tickets_sold;
                ticketsSold++;
                remainingTickets--;
                //fetches the data from the movie you clicked
                fetch(url + `/${movieObj.id}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tickets_sold: ticketsSold
                    }),
                })
                .then(res => res.json())
                .then(patchedFilmObject => {
                    ticketNumSpan.innerText = `    ${remainingTickets}     remaining tickets`;
                    movieObj.tickets_sold = patchedFilmObject.tickets_sold;
                })
            }
            if(remainingTickets === 0) {
                filmDiv.className = "sold-out-film";
                orangeBtnDiv.className = "sold-out";
                orangeBtnDiv.innerText = "Sold out";
            }
        })
    }
    /////////dom
});
