
// initial first movie
function changeBannerInfo(url) {
  let hot = document.querySelector(".hot");
  let bannerVideo = document.querySelector(".hotLeft");
  let watchNow = document.querySelector(".watchNow");
  let thumbnail = document.querySelector(".thumbnail");
  const imgURL = "https://image.tmdb.org/t/p/original/";
  var nameIS = "";
  var imgpath = "";
  let movieID = -1;
  fetch(url).then(res => res.json()).then(data => {
    nameIS = data.results[0].original_title || data.results[0].name;
    bannerVideo.childNodes[1].textContent = nameIS;
    bannerVideo.childNodes[3].textContent = data.results[0].overview;
    imgpath = imgURL + data.results[0].poster_path;
    hot.style.backgroundImage = `url(${imgURL + data.results[0].backdrop_path})`;
    thumbnail.src = imgpath;
    watchNow.addEventListener("click", function(e) {
      e.preventDefault();
      gotoWeb(data.results[0].media_type == "tv" ? data.results[0].id + ".2" : data.results[0].id + ".4");
    })
  })
}

changeBannerInfo("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b88a179d656832148c8eb1504e4b60a5");

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
  img.draggable = false;
  node.appendChild(img);
  let nestedDIV = document.createElement("div");
  nestedDIV.className = "movieName";
  nestedDIV.textContent = "movieName";
  node.appendChild(nestedDIV);
  parentNode.appendChild(node);
}

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
    }
    for (j = ratio; j < 20; j++) {
      temp.item(i).children[j].style.display = "none";
    }
  }
}

displayPosters();

/* Resize width content */
window.addEventListener("resize", function(event) {
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
  let initial = e.clientX;
  this.onmouseup = function(e) {
    handleLR(e.clientX, initial, 0, trendingMvIndex);
  }
});

let touchstartX = 0;
let touchendX = 0;
let touchstartY = 0;
let touchendY = 0;
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
  let initial = e.clientX;
  this.onmouseup = function(e) {
    handleLR(e.clientX, initial, 1, popularMvIndex);
  }
});

// For Trending TV
let trendingTvScroll = document.querySelector(".trendingTv");
trendingTvScroll.addEventListener('mousedown', (e) => {
  let initial = e.clientX;
  this.onmouseup = function(e) {
    handleLR(e.clientX, initial, 2, trendingTvIndex);
  }
});

let touchstartX2 = 0;
let touchendX2 = 0;
let touchstartY2 = 0
let touchendY2 = 0
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
let popularTvScroll = document.querySelector(".popularTv");
popularTvScroll.addEventListener('mousedown', (e) => {
  let initial = e.clientX;
  this.onmouseup = function(e) {
    handleLR(e.clientX, initial, 3, popularTvIndex);
  }
});

let touchstartX3 = 0;
let touchendX3 = 0;
let touchstartY3 = 0;
let touchendY3 = 0;
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
topRatedMvScroll.addEventListener('mousedown', (e) => {
  let initial = e.clientX;
  this.onmouseup = function(e) {
    handleLR(e.clientX, initial, 4, topRatedMvIndex);
  }
});

let touchstartX4 = 0;
let touchendX4 = 0;
let touchstartY4 = 0;
let touchendY4 = 0;
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
let topRatedTvScroll = document.querySelector(".topRatedTv");
topRatedTvScroll.addEventListener('mousedown', (e) => {
  let initial = e.clientX;
  this.onmouseup = function(e) {
    handleLR(e.clientX, initial, 5, topRatedTvIndex);
  }
});

let touchstartX5 = 0;
let touchendX5 = 0;
let touchstartY5 = 0;
let touchendY5 = 0;
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
function handleLR(left, right, index, which) {

  var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
  const ratio = Math.floor(width / 200);
  let temp = document.querySelectorAll(".content");
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
  }
  for (j = ratio; j < 20; j++) {

    temp.item(index).children[array[j]].style.display = "none";
  }
}

let node1 = document.querySelector(".node1");
node1.children[0].addEventListener("click", () => {
  handleLR(0, 1, 0, trendingMvIndex);
});
node1.children[2].addEventListener("click", () => {
  handleLR(1, 0, 0, trendingMvIndex);
});

let node2 = document.querySelector(".node2");
node2.children[0].addEventListener("click", () => {
  handleLR(0, 1, 1, popularMvIndex);
});
node2.children[2].addEventListener("click", () => {
  handleLR(1, 0, 1, popularMvIndex);
});

let node3 = document.querySelector(".node3");
node3.children[0].addEventListener("click", () => {
  handleLR(0, 1, 2, trendingTvIndex);
});
node3.children[2].addEventListener("click", () => {
  handleLR(1, 0, 2, trendingTvIndex);
});

let node4 = document.querySelector(".node4");
node4.children[0].addEventListener("click", () => {
  handleLR(0, 1, 3, popularTvIndex);
});
node4.children[2].addEventListener("click", () => {
  handleLR(1, 0, 3, popularTvIndex);
});

let node5 = document.querySelector(".node5");
node5.children[0].addEventListener("click", () => {
  handleLR(0, 1, 4, topRatedMvIndex);
});
node5.children[2].addEventListener("click", () => {
  handleLR(1, 0, 4, topRatedMvIndex);
});

let node6 = document.querySelector(".node6");
node6.children[0].addEventListener("click", () => {
  handleLR(0, 1, 5, topRatedTvIndex);
});
node6.children[2].addEventListener("click", () => {
  handleLR(1, 0, 5, topRatedTvIndex);
});


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
const linkMVs = "https://www.2embed.org/embed/";
// tmdb tv
const linkTVs = "https://www.2embed.org/embed/"
const season = "&s=1&e=1";

function getdata(url, index, link, season) {
  let temp = document.querySelectorAll(".content");
  const imgURL = "https://image.tmdb.org/t/p/original/";
  var nameIS = "";
  var imgpath = "";
  fetch(url).then(res => res.json()).then(data => {
    for (i = 0; i <= 7; i++) {
      nameIS = data.results[i].original_title || data.results[i].name;
      imgpath = imgURL + data.results[i].poster_path;
      if (data.results[i].poster_path == null) {
        imgpath = "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg";
      }
      temp.item(index).children[i].children[1].textContent = nameIS;
      temp.item(index).children[i].children[1].style.color = "white";
      temp.item(index).children[i].children[0].src = imgpath;
      temp.item(index).children[i].href = data.results[i].id + "." + index;

    }
  })
}


function getdata0(url, index, link, season) {
  let temp = document.querySelectorAll(".content");
  const imgURL = "https://image.tmdb.org/t/p/original/";
  var nameIS = "";
  var imgpath = "";
  fetch(url).then(res => res.json()).then(data => {
    for (i = 8; i <= 13; i++) {
      nameIS = data.results[i].original_title || data.results[i].name;
      imgpath = imgURL + data.results[i].poster_path;
      if (data.results[i].poster_path == null) {
        imgpath = "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg";
      }
      temp.item(index).children[i].children[1].textContent = nameIS;
      temp.item(index).children[i].children[1].style.color = "white";
      temp.item(index).children[i].children[0].src = imgpath;
      temp.item(index).children[i].href = data.results[i].id + "." + index;

    }
  })
}

function getdata01(url, index, link, season) {
  let temp = document.querySelectorAll(".content");
  const imgURL = "https://image.tmdb.org/t/p/original/";
  var nameIS = "";
  var imgpath = "";
  fetch(url).then(res => res.json()).then(data => {
    for (i = 14; i <= 19; i++) {
      nameIS = data.results[i].original_title || data.results[i].name;
      imgpath = imgURL + data.results[i].poster_path;
      if (data.results[i].poster_path == null) {
        imgpath = "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg";
      }
      temp.item(index).children[i].children[1].textContent = nameIS;
      temp.item(index).children[i].children[1].style.color = "white";
      temp.item(index).children[i].children[0].src = imgpath;
      temp.item(index).children[i].href = data.results[i].id + "." + index;
    }
  })
}

const myTimeout = setTimeout((() => {
  getdata(trendingMVs, 0, linkMVs, "");
  clearTimeout(myTimeout);
}), 0);
const myTimeout1 = setTimeout((() => {
  getdata(popularMVs, 1, linkMVs, "");
  clearTimeout(myTimeout1);
}), 1000);
const myTimeout2 = setTimeout((() => {
  getdata(trendingTVs, 2, linkTVs, season);
  clearTimeout(myTimeout2);
}), 2000);
const myTimeout3 = setTimeout((() => {
  getdata(popularTVs, 3, linkTVs, season);
  clearTimeout(myTimeout3);
}), 3000);
const myTimeout4 = setTimeout((() => {
  getdata(topRMVs, 4, linkMVs, "");
  clearTimeout(myTimeout4);
}), 4000);
const myTimeout5 = setTimeout((() => {
  getdata(topRTVs, 5, linkTVs, season);
  clearTimeout(myTimeout5);
}), 5000);



const myTimeout0 = setTimeout((() => {
  getdata0(trendingMVs, 0, linkMVs, "");
  clearTimeout(myTimeout0);
}), 6000);
const myTimeout10 = setTimeout((() => {
  getdata0(popularMVs, 1, linkMVs, "");
  clearTimeout(myTimeout10);
}), 7000);
const myTimeout20 = setTimeout((() => {
  getdata0(trendingTVs, 2, linkTVs, season);
  clearTimeout(myTimeout20);
}), 8000);
const myTimeout30 = setTimeout((() => {
  getdata0(popularTVs, 3, linkTVs, season);
  clearTimeout(myTimeout30);
}), 9000);
const myTimeout40 = setTimeout((() => {
  getdata0(topRMVs, 4, linkMVs, "");
  clearTimeout(myTimeout40);
}), 10000);
const myTimeout50 = setTimeout((() => {
  getdata0(topRTVs, 5, linkTVs, season);
  clearTimeout(myTimeout50);
}), 11000);


const myTimeout01 = setTimeout((() => {
  getdata01(trendingMVs, 0, linkMVs, "");
  clearTimeout(myTimeout01);
}), 12000);
const myTimeout101 = setTimeout((() => {
  getdata01(popularMVs, 1, linkMVs, "");
  clearTimeout(myTimeout101);
}), 13000);
const myTimeout201 = setTimeout((() => {
  getdata01(trendingTVs, 2, linkTVs, season);
  clearTimeout(myTimeout201);
}), 14000);
const myTimeout301 = setTimeout((() => {
  getdata01(popularTVs, 3, linkTVs, season);
  clearTimeout(myTimeout301);
}), 15000);
const myTimeout401 = setTimeout((() => {
  getdata01(topRMVs, 4, linkMVs, "");
  clearTimeout(myTimeout401);
}), 16000);
const myTimeout501 = setTimeout((() => {
  getdata01(topRTVs, 5, linkTVs, season);
  clearTimeout(myTimeout501);
}), 17000);



/* Prevent drag images */
window.ondragstart = function() { return false }

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
searchInput.addEventListener("keyup", function(event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    userInput = searchInput.value;
    console.log(searchLink + API_KEY + "&query=" + searchInput.value);
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

window.addEventListener("resize", function(event) {
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
  searchResult.children[k].style.display = "none";
}

function getSearchdata(url, index, link, season) {
  let temp = document.querySelectorAll(".view");
  const imgURL = "https://image.tmdb.org/t/p/original/";
  var nameIS = "";
  var imgpath = "";
  fetch(url).then(res => res.json()).then(data => {
    console.log(url);
    for (i = 0; i <= 19; i++) {
      nameIS = data.results[i].original_title || data.results[i].name;
      imgpath = imgURL + data.results[i].poster_path;
      link = data.results[i].media_type == "tv" ? data.results[i].id + ".2" : data.results[i].id + ".4";
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
  a[i].addEventListener("click", function(e) {
    e.preventDefault();
    let nowLink = this.href.slice(32, this.href.length);
    gotoWeb(nowLink);
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

// search Hover
search[0].addEventListener("mouseover", () => {
  search[0].classList.add("ani");
});

let listIMG = document.querySelectorAll('a > img');
for (l = 0; l < 100; l++) {
  if ((l > 6 && l <= 19) || (l > 26 && l <= 39) || (l > 46 && l <= 59) || (l > 66 && l <= 79) || (l > 86 && l <= 99)) {
    listIMG[l].loading = "lazy";
  }
  console.log(listIMG[l].loading);
}

function gotoWeb(idFilm) {
  document.getElementById("liduen").value = idFilm;
  document.getElementById("sendData").submit();
}

function goToHomePage() {
  window.location = './index.html';
}