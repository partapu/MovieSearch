const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280/";
const searchAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.querySelector(".main");
const form = document.querySelector("form");
const input = document.querySelector("input");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const close = document.querySelector(".close");
const overview = document.querySelector(".overview");
let results = [];
async function getMovies(APIURL) {
  let movies = await fetch(APIURL);
  movies = await movies.json();
  if (!movies.results || movies.results.length === 0) {
    const div = document.createElement("div");
    div.innerHTML = "<h1>No Movies are found view other movies<h1>";
    div.classList.add("nomovies");
    main.insertAdjacentElement("beforeend", div);
    console.log("No Movies are found");
    return;
  }
  console.log(movies.results);
  results = movies.results;
  movies.results.forEach((element) => {
    const img = document.createElement("img");
    img.src = IMGPATH + element.backdrop_path;
    img.alt = element.title;
    addMovie(element);
  });
}
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const searchTerm = input.value;
  main.innerHTML = "";
  await getMovies(searchAPI + searchTerm);
});

function addMovie(obj) {
  const html = `<div class="movie" dataid=${obj.id}>
      <img
        src=${obj.backdrop_path === null ? "" : IMGPATH + obj.poster_path}
      />
      <div class="movie-info">
        <h3 class="movie-name">${obj.title}</h3>
        <span class="movie-rating ${getmovierating(obj.vote_average)}">${
    obj.vote_average
  }</span>
      </div>
      <div class="synposis">
      <h3>OverView:</h3>
      ${obj.overview};
      </div>
    </div>

    `;
  main.insertAdjacentHTML("beforeend", html);
}
function getmovierating(rating) {
  if (rating >= 8) return "green";
  else if (rating >= 6) return "orange";
  else return "red";
}
getMovies(APIURL);

// main.addEventListener("click", function (e) {
//   const movie = e.target.closest(".movie");
//   let id = +movie.getAttribute("dataid");
//   results.forEach((e) => {
//     if (e.id === id) {
//       modal.classList.toggle("hidden");
//       overlay.classList.toggle("hidden");
//       overview.textContent = e.overview;
//       return;
//     }
//   });
// });

// close.addEventListener("click", function (e) {
//   modal.classList.toggle("hidden");
//   overlay.classList.toggle("hidden");
// });
// overlay.addEventListener("click", function (e) {
//   modal.classList.toggle("hidden");
//   overlay.classList.toggle("hidden");
// });
