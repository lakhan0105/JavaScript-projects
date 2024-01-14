// Testing the api data
const key = "614a453fcd8890022b210c6e44ad605c";
const apiEndpoint = `https://api.themoviedb.org/3/`;
const imgEndpoint = `https://image.tmdb.org/t/p/original`;

// Selecting the Elements
const cardsContainerEl = document.querySelector(".cards-container");
const btnEls = document.querySelectorAll(".btn");
const trendingBtn = document.querySelector(".trending-btn");

// options obj
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${key}`,
  },
};

// apiPaths
const apiPaths = {
  trendingUrl: `${apiEndpoint}trending/all/day?api_key=${key}`,
  moviesList: `${apiEndpoint}discover/movie?api_key=${key}`,
  tvsList: `${apiEndpoint}discover/tv?api_key=${key}`,
};

// Function to fetch the data
const fetchData = async (url, options) => {
  const resp = await fetch(url, options);
  const data = await resp.json();
  console.log(data);
  return data;
};

// Function to create card els
function addCards(img, name, rating) {
  const cardEl = document.createElement("div");
  cardEl.classList = "card";
  cardEl.innerHTML = ` 
                <img src="${img}" alt="not found">
                <div class="info">
                    <p class="name">${name}</p>
                    <p class="rating">${rating}</p>
                </div>`;
  cardsContainerEl.appendChild(cardEl);
}

// store the data in a variable
const trendingData = fetchData(apiPaths.trendingUrl, options);
const moviesListData = fetchData(apiPaths.moviesList, options);
const tvsListData = fetchData(apiPaths.tvsList, options);

// Display all the trendingmovies
const displayData = async (data) => {
  data = await data;

  // Destructuring
  const results = data.results;

  results.forEach((resultArr) => {
    // Destructuring
    const { poster_path, title, name, vote_average } = resultArr;
    const img = `${imgEndpoint}${poster_path}`;
    const rating = vote_average;
    addCards(img, title || name, rating);
  });
};

displayData(trendingData);
trendingBtn.focus()

// Event Listener for btns
btnEls.forEach((btnEl) => {
  btnEl.addEventListener("click", function (e) {
    let data = trendingData;
    const elClassList = e.target.classList;
    cardsContainerEl.innerHTML = "";
    if (elClassList.contains("trending-btn")) {
      data = trendingData;
    } else if (elClassList.contains("movies-btn")) {
      data = moviesListData;
    } else if (elClassList.contains("tv-btn")) {
      data = tvsListData;
    }
    displayData(data);
  });
});
