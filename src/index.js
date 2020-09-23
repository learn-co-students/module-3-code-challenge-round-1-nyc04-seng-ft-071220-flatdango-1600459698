const url = "http://localhost:3000/films";

let currentFilm = null;
let buyingInProgress = false;

const setCurrentFilm = (id) => {
  fetch(url + "/" + id, {
    method: "GET"
  })
    .then((res) => res.json())
    .then((film) => {
      document.querySelector("#poster").src = film.poster;
      document.querySelector("#title").innerHTML = film.title;
      document.querySelector("#runtime").innerHTML = film.runtime + " minutes";
      document.querySelector("#film-info").innerHTML = film.description;
      document.querySelector("#showtime").innerHTML = film.showtime;
      document.querySelector("#ticket-num").innerHTML =
        film.capacity - film.tickets_sold;

      if (film.capacity == film.tickets_sold)
        document.querySelector("#film" + id).classList.add("sold-out");
      currentFilm = film;
    });
};

const buyTicket = () => {
  if (
    buyingInProgress ||
    currentFilm.tickets_sold == currentFilm.capacity
  )
    return false;

  buyingInProgress = true;

  fetch(url + "/" + currentFilm.id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tickets_sold: currentFilm.tickets_sold + 1
    })
  }).then((res) => {
    if (res.ok) {
      setCurrentFilm(currentFilm.id);
    }

    buyingInProgress = false;
  });
};

fetch(url, { method: "GET" })
  .then((res) => res.json())
  .then((films) => {
    const filmsDiv = document.querySelector("#films");
    for (const film of films) {
      const newFilm = document.createElement("div");
      if (film.tickets_sold == film.capacity)
        newFilm.className = "sold-out film item";
      else {
        newFilm.className = "film item";
      }
      newFilm.innerHTML = film.title;
      newFilm.id = "film" + film.id;
      newFilm.addEventListener("click", () => setCurrentFilm(film.id));
      newFilm.style.cursor = "pointer";

      filmsDiv.appendChild(newFilm);
    }
  });

setCurrentFilm("1");
