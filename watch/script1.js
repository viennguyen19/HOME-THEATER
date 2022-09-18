
let a = window.location.href;
let b = a.slice(60, a.length);
let c = a.slice(60, a.length);
c = c.slice(0, c.length - 2);
b = b.slice(b.length - 1, b.length);

const frontURL = "https://api.themoviedb.org/3/tv/";
const frontURLMV = "https://api.themoviedb.org/3/movie/";
const backURL = "?api_key=b88a179d656832148c8eb1504e4b60a5";
let numSeasons = 0;
let arrEpisode = [];
let url = frontURL + c + backURL;
let urlMV = frontURLMV + c + backURL;
let numEpisodes = 0;
let seasons = document.getElementById("seasons");
let episodes = document.getElementById("episodes");
let detail = document.getElementById("detail");
let pointer = null;

if (b == "2" || b == "3" || b == "5") {
  fetch(url).then(res => res.json()).then(data => {
    numSeasons = data.last_episode_to_air.season_number;
    if (numSeasons > 1) {
      for (i = 1; i <= numSeasons; i++) {
        arrEpisode.push(data.seasons[i].episode_count);
        addOption(i, "seasons");
      }
      arrEpisode[numSeasons - 1] = data.last_episode_to_air.episode_number;
      for (k = 1; k <= arrEpisode[0]; k++) {
        addOption(k, "episodes");
      }
    } else {
      numEpisodes = data.last_episode_to_air.episode_number;
      arrEpisode.push(numEpisodes);
      addOption(1, "seasons");
      for (j = 1; j <= numEpisodes; j++) {
        addOption(j, "episodes");
      }
    }
    addVideo(1, 1);
    detail.textContent = data.original_title || data.original_name;
  })
} else {
  document.getElementById("containerBTN").style.display = "none";
  addVideo(-1, -1);
  fetch(urlMV).then(res => res.json()).then(data => {
    detail.textContent = data.original_title || data.original_name;
  })
}

seasons.addEventListener("change", () => {
  removeAllEpisodes("episodes");
  for (i = 1; i <= arrEpisode[Number(seasons.value) - 1]; i++) {
    addOption(i, "episodes");
  }
  removeVideo();
  addVideo(seasons.value, 1);

})

episodes.addEventListener("change", () => {
  removeVideo();
  addVideo(seasons.value, episodes.value);
})


function addOption(number, parent) {
  const option = document.createElement("option");
  option.value = number;
  option.textContent = "" + number;
  document.getElementById(parent).appendChild(option);
}

function removeAllEpisodes(parent) {
  let element = document.getElementById(parent);
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function addVideo(vidSeason, vidEposide) {
  const iframe = document.createElement("iframe");
  pointer = iframe;
  iframe.id = "film";
  iframe.setAttribute('allowFullScreen', 'true');
  document.documentElement.style.setProperty('--opacity-start', '0');
  document.documentElement.style.setProperty('--opacity-end', '0');
  if (vidSeason != -1) {
    iframe.src = "https://vidsrc.me/embed/" + c + `/${vidSeason}-${vidEposide}`;
  } else {
    iframe.src = "https://vidsrc.me/embed/" + c;
  }
  document.getElementById("watchPlace").appendChild(iframe);
}

function removeVideo() {
  let node = document.getElementById("film");
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
}

function goToHomePage() {
  window.location = '../index.html';
}

const video = document.getElementById('film');
const isInFullScreen =
  (document.fullscreenElement && document.fullscreenElement !== null) ||
  (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
  (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
  (document.msFullscreenElement && document.msFullscreenElement !== null);
if (!isInFullScreen) {
  if (playerWrapper.current.requestFullScreen) {
    // W3C API
    playerWrapper.current.requestFullScreen();
  } else if (playerWrapper.current.mozRequestFullScreen) {
    // Mozilla current API
    playerWrapper.current.mozRequestFullScreen();
  } else if (playerWrapper.current.webkitRequestFullScreen) {
    // Webkit current API
    playerWrapper.current.webkitRequestFullScreen();
  } else if (video.webkitEnterFullScreen) {
    // This is the IOS Mobile edge case
    video.webkitEnterFullScreen();
  }
} else {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}