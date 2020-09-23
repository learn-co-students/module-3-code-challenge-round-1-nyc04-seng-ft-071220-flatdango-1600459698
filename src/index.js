const url = "http://localhost:3000/films"
let titleUl = document.querySelector("div#films")




/// grabbing the objects from the api/json file
fetch(`http://localhost:3000/films`)
.then (response => response.json())
.then((filmsArray) => {
    filmsArray.forEach((aFilm) => {
        turnFilmLiToHTML(aFilm)
    })
})

let turnFilmLiToHTML = (filmObj) => {
    
    let titleLi = document.createElement("li") 
    titleLi.classList.add("list-container")
    
    titleLi.innerText = filmObj.title
   
    titleUl.append(titleLi)

   


}

