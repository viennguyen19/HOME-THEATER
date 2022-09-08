console.log("The URL of this page is: " + window.location.href);

let a = window.location.href;
let b = a.slice(60, a.length);
let c = a.slice(60, a.length);
c = c.slice(0, c.length-2);
b = b.slice(b.length-1, b.length);

const frontURL = "https://api.themoviedb.org/3/tv/";
const backURL = "?api_key=b88a179d656832148c8eb1504e4b60a5";
let numSeasons = 0;
let arrEpisode = [];
let url = frontURL + c + backURL;
let numEpisodes = 0;
let seasons = document.getElementById("seasons");
let episodes = document.getElementById("episodes");

if(b=="2" || b=="3" || b=="5") {
  fetch(url).then(res => res.json()).then(data => {
    numSeasons = data.last_episode_to_air.season_number;
    if(numSeasons > 1) {
      for(i=1; i<=numSeasons; i++) {
        arrEpisode.push(data.seasons[i].episode_count);
        addOption(i, "seasons");
      }
      arrEpisode[numSeasons] = data.last_episode_to_air.episode_number;
      for(k=1; k<=arrEpisode[0]; k++) {
        addOption(k, "episodes");
      }
    } else {
      numEpisodes = data.last_episode_to_air.episode_number;
      arrEpisode.push(numEpisodes);
      addOption(1, "seasons");
      for(j=1; j<=numEpisodes; j++) {
        addOption(j, "episodes");
      }
    }
    addVideo(1,1);
  })
} else {
  addVideo(-1,-1);
}

seasons.addEventListener("change", () => {  
  removeAllEpisodes("episodes");
  for(i=1; i<=arrEpisode[Number(seasons.value)-1]; i++) {
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
  iframe.id = "film";
  iframe.setAttribute('allowFullScreen', 'true');
  document.documentElement.style.setProperty('--opacity-start', '0');
  document.documentElement.style.setProperty('--opacity-end', '0'); 
  if(vidSeason != -1) {
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