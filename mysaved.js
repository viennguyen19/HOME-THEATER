/* Hide and unhide logo bar */
let lastScroll = 0;
let lastIndex = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll < 0) {
    document.getElementsByClassName("logo")[0].style.backgroundColor = "#121315";
        document.getElementsByClassName("hand")[0].style.backgroundColor = "whitesmoke";
    document.getElementsByClassName("circle")[0].style.borderColor = "whitesmoke";
  }
  if (currentScroll > lastScroll) {
    document.getElementsByClassName("logo")[0].style.backgroundColor = "#121315";
        document.getElementsByClassName("hand")[0].style.backgroundColor = "whitesmoke";
    document.getElementsByClassName("circle")[0].style.borderColor = "whitesmoke";

  } else {
    document.getElementsByClassName("logo")[0].style.backgroundColor = "rgba(178, 190, 181,0.5)";
    document.getElementsByClassName("hand")[0].style.backgroundColor = "#121315";
    document.getElementsByClassName("circle")[0].style.borderColor = "#121315";
  }
  lastScroll = currentScroll;
});


/* Create empty poster */
// create Poster 
function createPoster(parentNode, imgPath, title, index, name) {
  let node = document.createElement("a");
  node.style.display = "none";
  node.className = name;
  node.style.margin = "3px";
  node.href = "";
  let img = document.createElement("img");
  img.src = imgPath;
  img.alt = title;
  //img.style.height = "300px";
  img.draggable = false;
  node.appendChild(img);
  let nestedDIV = document.createElement("div");
  nestedDIV.className = "movieName";
  nestedDIV.textContent = "movieName";
  /*var nestedP = document.createElement("p");
  nestedP.textContent = title;
  nestedDIV.appendChild(nestedP);*/
  node.appendChild(nestedDIV);
  parentNode.appendChild(node);
}


/*let myParents = [];
myParents.push(parentTrendingMv);
myParents.push(parentPopularMv);
myParents.push(parentTopRatedMv);
myParents.push(parentTrendingTv);
myParents.push(parentPopularTv);
myParents.push(parentTopRatedTv);*/

// get parents for adding poster
const parentTrendingMv = document.querySelector(".trendingMv");
const parentPopularMv = document.querySelector(".popularMv");
const parentTopRatedMv = document.querySelector(".topRatedMv");
const parentTrendingTv = document.querySelector(".trendingTv");
const parentPopularTv = document.querySelector(".popularTv");
const parentTopRatedTv = document.querySelector(".topRatedTv");

// names of child posters
let trendingMvClassName = "trendMVs tr";
let popularMvClassName = "popularMVs p";
let topRatedMvClassName = "toprateMVs t";
let trendingTvClassName = "trendTVs tre";
let popularTvClassName = "popularTVs po";
let topRatedTvClassName = "toprateTVs top";

// create empty posters
function emptyPoster() {
  //var nameIS = "";
  //var imgpath = "";
  for (i = 0; i <= 19; i++) {
    createPoster(parentTrendingMv, "", "", i, trendingMvClassName + i + " resize");
    createPoster(parentPopularMv, "", "", i, popularMvClassName + i + " resize");
    createPoster(parentTrendingTv, "", "", i, trendingTvClassName + i + " resize");
    createPoster(parentPopularTv, "", "", i, popularTvClassName + i + " resize");
    createPoster(parentTopRatedMv, "", "", i, topRatedMvClassName + i + " resize");
    createPoster(parentTopRatedTv, "", "", i, topRatedTvClassName + i + " resize");
  }
}
emptyPoster();

/* Display posters */
function displayPosters() {
  var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
  const ratio = Math.floor(width / 200);
  let temp = document.querySelectorAll(".content");
  for (i = 0; i <= 5; i++) {
    for (j = 0; j < ratio; j++) {
      temp.item(i).children[j].style.display = "";
      //temp.item(i).children[j].style.minWidth = "180";
    }
    for (j = ratio; j < 20; j++) {
      temp.item(i).children[j].style.display = "none";
    }
  }
}
displayPosters();

/* Resize width content */
window.addEventListener("resize", function (event) {
  displayPosters();
})

/* Handle touch and slide */
let trendingMvIndex = Array.from(Array(20).keys());
let popularMvIndex = Array.from(Array(20).keys());
let topRatedMvIndex = Array.from(Array(20).keys());
let trendingTvIndex = Array.from(Array(20).keys());
let popularTvIndex = Array.from(Array(20).keys());
let topRatedTvIndex = Array.from(Array(20).keys());

// For Trending Movies
let trendingMvScroll = document.querySelector(".trendingMv");
trendingMvScroll.addEventListener('mousedown', (e) => {
  var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
  const ratio = Math.floor(width / 200);
  let temp = document.querySelectorAll(".content");
  let initial = e.clientX;
  this.onmouseup = function (e) {
    if (e.clientX - initial > 10) {
      goLeft(ratio, trendingMvIndex);
      changePosters(temp, 0, ratio, trendingMvIndex);
    }
    if (initial - e.clientX > 10) {
      goRight(ratio, trendingMvIndex);
      changePosters(temp, 0, ratio, trendingMvIndex);
    }
    if (Math.abs(initial - e.clientX) < 10) {
      //changePosters(temp, 0, ratio, trendingMvIndex);
    }
  }
});

let touchstartX = 0
let touchendX = 0
let touchstartY = 0
let touchendY = 0
trendingMvScroll.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX;
  touchstartY = e.changedTouches[0].screenY;
})
trendingMvScroll.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX;
  touchendY = e.changedTouches[0].screenY;
  handleGesture(trendingMvIndex, touchstartX, touchendX, 0, touchstartY, touchendY);
})

// For Popular Movies
let popularMvScroll = document.querySelector(".popularMv");
let touchstartX1 = 0;
let touchendX1 = 0;
let touchstartY1 = 0
let touchendY1 = 0
popularMvScroll.addEventListener('touchstart', e => {
  touchstartX1 = e.changedTouches[0].screenX;
  touchstartY1 = e.changedTouches[0].screenY;
})
popularMvScroll.addEventListener('touchend', e => {
  touchendX1 = e.changedTouches[0].screenX;
  touchendY1 = e.changedTouches[0].screenY;
  handleGesture(popularMvIndex, touchstartX1, touchendX1, 1, touchstartY1, touchendY1);
})

popularMvScroll.addEventListener('mousedown', (e) => {
  var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
  const ratio = Math.floor(width / 200);
  let temp = document.querySelectorAll(".content");
  let initial = e.clientX;
  this.onmouseup = function (e) {
    if (e.clientX > initial) {
      goLeft(ratio, popularMvIndex);
      changePosters(temp, 1, ratio, popularMvIndex);
    } else {
      goRight(ratio, popularMvIndex);
      changePosters(temp, 1, ratio, popularMvIndex);
    }
  }
});

// For Trending TV
let trendingTvScroll = document.querySelector(".trendingTv");
let touchstartX2 = 0;
let touchendX2 = 0;
let touchstartY2 = 0
let touchendY2 = 0
trendingTvScroll.addEventListener('mousedown', (e) => {
  var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
  const ratio = Math.floor(width / 200);
  let temp = document.querySelectorAll(".content");
  let initial = e.clientX;
  this.onmouseup = function (e) {
    if (e.clientX > initial) {
      goLeft(ratio, trendingTvIndex);
      changePosters(temp, 2, ratio, trendingTvIndex);
    } else {
      goRight(ratio, trendingTvIndex);
      changePosters(temp, 2, ratio, trendingTvIndex);
    }
  }
});

trendingTvScroll.addEventListener('touchstart', e => {
  touchstartX2 = e.changedTouches[0].screenX;
  touchstartY2 = e.changedTouches[0].screenY;
})
trendingTvScroll.addEventListener('touchend', e => {
  touchendX2 = e.changedTouches[0].screenX;
  touchendY2 = e.changedTouches[0].screenY;
  handleGesture(trendingTvIndex, touchstartX2, touchendX2, 2, touchstartY2, touchendY2);
})

// For Popular TV
let touchstartX3 = 0;
let touchendX3 = 0;
let touchstartY3 = 0
let touchendY3 = 0
let popularTvScroll = document.querySelector(".popularTv");
popularTvScroll.addEventListener('mousedown', (e) => {
  var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
  const ratio = Math.floor(width / 200);
  let temp = document.querySelectorAll(".content");
  let initial = e.clientX;
  this.onmouseup = function (e) {
    if (e.clientX > initial) {
      goLeft(ratio, popularTvIndex);
      changePosters(temp, 3, ratio, popularTvIndex);
    } else {
      goRight(ratio, popularTvIndex);
      changePosters(temp, 3, ratio, popularTvIndex);
    }
  }
});

popularTvScroll.addEventListener('touchstart', e => {
  touchstartX3 = e.changedTouches[0].screenX;
  touchstartY3 = e.changedTouches[0].screenY;
})
popularTvScroll.addEventListener('touchend', e => {
  touchendX3 = e.changedTouches[0].screenX;
  touchendY3 = e.changedTouches[0].screenY;
  handleGesture(popularTvIndex, touchstartX3, touchendX3, 3, touchstartY3, touchendY3);
})

// For Top Rated Movies
let topRatedMvScroll = document.querySelector(".topRatedMv");
let touchstartX4 = 0;
let touchendX4 = 0;
let touchstartY4 = 0
let touchendY4 = 0
topRatedMvScroll.addEventListener('mousedown', (e) => {
  var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
  const ratio = Math.floor(width / 200);
  let temp = document.querySelectorAll(".content");
  let initial = e.clientX;
  this.onmouseup = function (e) {
    if (e.clientX > initial) {
      goLeft(ratio, topRatedMvIndex);
      changePosters(temp, 4, ratio, topRatedMvIndex);
    } else {
      goRight(ratio, topRatedMvIndex);
      changePosters(temp, 4, ratio, topRatedMvIndex);
    }
  }
});

topRatedMvScroll.addEventListener('touchstart', e => {
  touchstartX4 = e.changedTouches[0].screenX;
  touchstartY4 = e.changedTouches[0].screenY;
})
topRatedMvScroll.addEventListener('touchend', e => {
  touchendX4 = e.changedTouches[0].screenX;
  touchendY4 = e.changedTouches[0].screenY;
  handleGesture(topRatedMvIndex, touchstartX4, touchendX4, 4, touchstartY4, touchendY4);
})

// For Top Rated TV
let touchstartX5 = 0;
let touchendX5 = 0;
let touchstartY5 = 0
let touchendY5 = 0
let topRatedTvScroll = document.querySelector(".topRatedTv");
topRatedTvScroll.addEventListener('mousedown', (e) => {

  let temp = document.querySelectorAll(".content");
  let initial = e.clientX;
  this.onmouseup = function (e) {
    handleLR(e.clientX, initial, 5, temp, topRatedTvIndex);
    /*
    if (e.clientX > initial) {
      goLeft(ratio, topRatedTvIndex);
      changePosters(temp, 5, ratio, topRatedTvIndex);
    } else {
      goRight(ratio, topRatedTvIndex);
      changePosters(temp, 5, ratio, topRatedTvIndex);
    }*/
  }
});

topRatedTvScroll.addEventListener('touchstart', e => {
  touchstartX5 = e.changedTouches[0].screenX;
  touchstartY5 = e.changedTouches[0].screenY;
})
topRatedTvScroll.addEventListener('touchend', e => {
  touchendX5 = e.changedTouches[0].screenX;
  touchendY5 = e.changedTouches[0].screenY;
  handleGesture(topRatedTvIndex, touchstartX5, touchendX5, 5, touchstartY5, touchendY5);
})

// Handle left and right
function handleLR(left, right, index, temp, which) {
  var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
  const ratio = Math.floor(width / 200);
  if (left > right) {
    goLeft(ratio, which);
    changePosters(temp, index, ratio, which);
  } else {
    goRight(ratio, which);
    changePosters(temp, index, ratio, which);
  }
}

// Handle touch gesture
function handleGesture(arrayIndex, touchstartX, touchendX, order, touchstartY, touchendY) {
  var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
  const ratio = Math.floor(width / 200);
  let temp = document.querySelectorAll(".content");
  if (Math.abs(touchstartY - touchendY) < 100) {
    if (touchstartX - touchendX > 60) {
      goRight(ratio, arrayIndex);
      changePosters(temp, order, ratio, arrayIndex);
    }
    if (touchendX - touchstartX > 60) {
      goLeft(ratio, arrayIndex);
      changePosters(temp, order, ratio, arrayIndex);
    }
  }
}

function goRight(ratio, array) {
  var mytemp = -1;
  for (i = 0; i < ratio; i++) {
    mytemp = array.shift();
    array.push(mytemp);
  }
}

function goLeft(ratio, array) {
  var mytemp = -1;
  for (i = 0; i < ratio; i++) {
    mytemp = array.pop();
    array.unshift(mytemp);
  }
}

function changePosters(temp, index, ratio, array) {
  for (j = 0; j < ratio; j++) {
      temp.item(index).children[array[j]].style.display = "";
      //temp.item(index).children[array[j]].style.minWidth = "180px";
  }
  for (j = ratio; j < 20; j++) {

      temp.item(index).children[array[j]].style.display = "none";
  }
}


////////////////////////////
// API 
const API_KEY = "api_key=b88a179d656832148c8eb1504e4b60a5";
const FIXURL = "https://api.themoviedb.org/3";
const mvTemp = "/discover/movie?sort_by=popularity.desc&";
const tvTemp = "/discover/tv?sort_by=popularity.desc&";
const trendingMVstemp = "/trending/movie/day?";
const trendingTVstemp = "/trending/tv/day?";
const topRMVsTemp = "/discover/movie?sort_by=vote_average.desc&";
const topRTVsTemp = "/discover/tv?sort_by=vote_average.desc&";

// popular movies 
const popularMVs = FIXURL + mvTemp + API_KEY;
// popular tvs
const popularTVs = FIXURL + tvTemp + API_KEY;
// trending movies by day
const trendingMVs = FIXURL + trendingMVstemp + API_KEY;
// trending tvs by day
const trendingTVs = FIXURL + trendingTVstemp + API_KEY;
// top rated movies
const topRMVs = FIXURL + topRMVsTemp + API_KEY;
// top rated tvs
const topRTVs = FIXURL + topRTVsTemp + API_KEY;

// tmdb movie
const linkMVs = "https://www.2embed.ru/embed/tmdb/movie?id=";
// tmdb tv
const linkTVs = "https://www.2embed.ru/embed/tmdb/tv?id="
const season = "&s=1&e=1";

function getdata(url, index, link, season) {
  let temp = document.querySelectorAll(".content");
  const imgURL = "https://image.tmdb.org/t/p/original/";
  var nameIS = "";
  var imgpath = "";
  fetch(url).then(res => res.json()).then(data => {
    for (i = 0; i <= 19; i++) {
      nameIS = data.results[i].original_title || data.results[i].name;
      imgpath = imgURL + data.results[i].poster_path;
      if (data.results[i].poster_path == null) {
        imgpath = "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg";
      }
      temp.item(index).children[i].children[1].textContent = nameIS;
      temp.item(index).children[i].children[1].style.color = "white";
      temp.item(index).children[i].children[0].src = imgpath;
      temp.item(index).children[i].href = link + data.results[i].id + season;
    }
  })
}

getdata(trendingMVs, 0, linkMVs, "");
getdata(popularMVs, 1, linkMVs, "");
getdata(trendingTVs, 2, linkTVs, season);
getdata(popularTVs, 3, linkTVs, season);
getdata(topRMVs, 4, linkMVs, "");
getdata(topRTVs, 5, linkTVs, season);

/* Prevent drag images */
window.ondragstart = function () { return false }

let searchInput = document.querySelector(".nameSearch");
const searchLink = "https://api.themoviedb.org/3/search/multi?";
let offSearch = true;

let search = document.getElementsByClassName("search");
let circle = document.querySelector(".circle");
let hand = document.querySelector(".hand");
let close1 = document.querySelector(".close1");
let mysearch = document.querySelector(".mysearch");
search[0].addEventListener("click", () => {
  if (offSearch) {
    mysearch.className = "mysearch";
    searchInput.style.display = "";
    searchInput.value = "";
    offSearch = false;
    circle.style.display = "none";
    hand.style.display = "none";
    close1.className = "close1";
  } else {
    mysearch.className = "mysearch hidesearch";
    offSearch = true;
    circle.style.display = "";
    hand.style.display = "";
    close1.className = "close1 hideclose";
  }
})


let circleWhite = document.querySelector(".circleWhite");
close1.addEventListener("click", () => {
  if (offSearch) {
    mysearch.className = "mysearch";
    searchInput.style.display = "";
    searchInput.value = "";
    offSearch = false;
    circle.style.display = "none";
    hand.style.display = "none";
    close1.className = "close1";
  } else {
    mysearch.className = "mysearch hidesearch";
    offSearch = true;
    circle.style.display = "";
    hand.style.display = "";
    close1.className = "close1 hideclose";
  }
})

var userInput = "";
searchInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    //console.log(searchInput.value);
    userInput = searchInput.value;
    console.log(searchLink + API_KEY + "&query=" + searchInput.value);
    //searchInput.style.display = "none";
    getSearchdata(searchLink + API_KEY + "&query=" + searchInput.value, "", "", season);
    var width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    var widthR = Math.floor((width * 90 / 100) / 170);
    widthR = width < 600 ? widthR : widthR - 1;
    console.log(widthR);
    var searchResult = document.querySelector(".searchResult");
    searchResult.style.gridTemplateColumns = "repeat(" + widthR + ", 1fr)";
    for (i = 0; i <= 19; i++) {
      searchResult.children[i].style.display = "";
    }
  }
})

window.addEventListener("resize", function (event) {
  getSearchdata(searchLink + API_KEY + "&query=" + searchInput.value, "", "", season);
  var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

  var widthR = Math.floor((width * 90 / 100) / 170);
  widthR = width < 600 ? widthR : widthR - 1;
  console.log(widthR);
  var searchResult = document.querySelector(".searchResult");
  searchResult.style.gridTemplateColumns = "repeat(" + widthR + ", 1fr)";
  for (i = 0; i <= 19; i++) {
    searchResult.children[i].style.display = "";
  }
})





let searchResult = document.querySelector(".searchResult");
for (k = 0; k <= 19; k++) {
  createPoster(searchResult, "", "", k, "view");
  //console.log("test");

  searchResult.children[k].style.display = "none";

  //console.log(searchResult.children);
  //console.log(width);
}

function getSearchdata(url, index, link, season) {
  let temp = document.querySelectorAll(".view");
  const imgURL = "https://image.tmdb.org/t/p/original/";
  var nameIS = "";
  var imgpath = "";
  fetch(url).then(res => res.json()).then(data => {
    //console.log(data.results[0].media_type);
    for (i = 0; i <= 19; i++) {
      nameIS = data.results[i].original_title || data.results[i].name;
      imgpath = imgURL + data.results[i].poster_path;
      link = data.results[i].media_type == "tv" ?
        linkTVs + data.results[i].id + season : linkMVs + data.results[i].id;
      if (data.results[i].poster_path == null) {
        imgpath = "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg";
      }
      temp[i].childNodes[1].textContent = nameIS;
      temp[i].childNodes[0].src = imgpath;
      temp[i].href = link;
    }
  })
}

function HideScrollbar() {
  var style = document.createElement("style");
  style.innerHTML = `body::-webkit-scrollbar {display: none;}`;
  document.head.appendChild(style);
}

HideScrollbar();

let a = document.querySelectorAll("a");
let video = document.querySelector(".videocontainer");
let frame = document.querySelector(".iframe");
for (i = 0; i < a.length; i++) {
  a[i].addEventListener("click", function (e) {
    e.preventDefault();
    video.className = "videocontainer";
    frame.src = this.href;
    frame.setAttribute('allowFullScreen', 'true');
    document.documentElement.style
        .setProperty('--opacity-start', '0');
    document.documentElement.style
        .setProperty('--opacity-end', '0');   
  })
}

let circleWhiteVideo = document.querySelector(".circleWhiteVideo");
circleWhiteVideo.addEventListener("click", () => {
  video.className = "videocontainer hideVideo";
  frame.src = "";
  document.documentElement.style
        .setProperty('--opacity-start', '0.7');
  document.documentElement.style
        .setProperty('--opacity-end', '1');   
})


