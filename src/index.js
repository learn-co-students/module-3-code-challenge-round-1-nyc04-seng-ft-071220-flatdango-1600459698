const url = "http://localhost:3000/films";

const filmPost = document.querySelector("img#poster");
const filmTitle = document.querySelector("div#title");
const filmRuntime = document.querySelector("div#runtime");
const filmDescription = document.querySelector("div#film-info");
const filmShowtime = document.querySelector("span#showtime");
const filmTicketnum = document.querySelector("span#ticket-num");
const buyTicketButton = document.querySelector("div.ui.orange.button");
const filmItem = document.querySelector("div.film.item");

fetch(url)
  .then((r) => r.json())
  .then((films) => {
    films.forEach((film) => {
      createFilmLi(film);
      soldOut(film);
    });
    let firstFilm = films[0];
    renderFilmInfo(firstFilm);
    handleButton(films);
  });

//   helper functions

function renderFilmInfo(film) {
  filmPost.src = film.poster;
  filmTitle.innerText = film.title;
  filmRuntime.innerText = film.runtime;
  filmShowtime.innerText = film.showtime;
  filmDescription.innerText = film.description;
  buyTicketButton.dataset.id = film.id;
  buyTicketButton.setAttribute("id", `buy-ticket-${film.id}`);
  filmTicketnum.innerText = film.capacity - film.tickets_sold;
  soldOut(film);
}

function createFilmLi(film) {
  let filmObj = document.createElement("li");
  filmObj.innerText = film.title;
  filmObj.setAttribute("id", `film-obj-${film.id}`);
  filmObj.classList.add("list");
  filmItem.append(filmObj);
  filmObj.addEventListener("click", () => {
    renderFilmInfo(film);
  });
}

function handleButton(films) {
  buyTicketButton.addEventListener("click", (e) => {
    let filmObj = films.find((film) => film.id === e.target.dataset.id);
    // console.log(filmObj);
    buttonHelper(e, filmObj);
    let newTicketSoldNum = filmObj.tickets_sold;
    fetch(`${url}/${filmObj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        tickets_sold: newTicketSoldNum,
      }),
    })
      .then((r) => r.json())
      .then((updatedData) => {
        if (updatedData.tickets_sold == updatedData.capacity) {
          e.target.innerText = "Sold Out";
          soldOutStyle(updatedData);
        }
      });
  });
}

function buttonHelper(e, filmObj) {
  if (
    filmObj.tickets_sold == filmObj.capacity ||
    filmObj.tickets_sold > filmObj.capacity
  ) {
    filmTicketnum.innerText = 0;
    e.target.innerText = "Sold Out";
  } else {
    e.target.innerText = "Buy Ticket";
    filmObj.tickets_sold = filmObj.tickets_sold + 1;
    filmTicketnum.innerText = filmObj.capacity - filmObj.tickets_sold;
  }
}

function soldOut(film) {
  const orangeButton = document.querySelector("div.ui.orange.button");
  if (film.tickets_sold == film.capacity || film.tickets_sold > film.capacity) {
    orangeButton.innerText = "Sold Out";
    soldOutStyle(film);
  } else {
    orangeButton.innerText = "Buy Ticket";
  }
}

function soldOutStyle(film) {
  const soldOut = document.querySelector(`#film-obj-${film.id}`);
  soldOut.classList.add("soldout");
}
