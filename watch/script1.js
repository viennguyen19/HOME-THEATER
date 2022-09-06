console.log("The URL of this page is: " + window.location.href);

let a = window.location.href;
let b = a.slice(60, a.length);
let c = a.slice(60, a.length);
c = c.slice(0, c.length-2);
b = b.slice(b.length-1, b.length);
console.log(b);

/*
getdata(trendingMVs, 0, linkMVs, "");
getdata(popularMVs, 1, linkMVs, "");
getdata(trendingTVs, 2, linkTVs, season);
getdata(popularTVs, 3, linkTVs, season);
getdata(topRMVs, 4, linkMVs, "");
getdata(topRTVs, 5, linkTVs, season);

https://api.themoviedb.org/3/tv/
1399
?api_key=b88a179d656832148c8eb1504e4b60a5
*/

const iframe = document.createElement("iframe");
iframe.id = "film";
      iframe.setAttribute('allowFullScreen', 'true');
      document.documentElement.style
        .setProperty('--opacity-start', '0');
      document.documentElement.style
        .setProperty('--opacity-end', '0'); 
const frontURL = "https://api.themoviedb.org/3/tv/";
const backURL = "?api_key=b88a179d656832148c8eb1504e4b60a5";
let numSeasons = 0;
let arrEpisode = [];
let url = frontURL + c + backURL;

if(b=="2" || b=="3" || b=="5") {
  console.log("tv");
  fetch(url).then(res => res.json()).then(data => {
    numSeasons = data.number_of_seasons;
    for(i=1; i<=numSeasons; i++) {
      arrEpisode.push(data.seasons[i].episode_count);
    }
    console.log(arrEpisode);
    //iframe.src = "https://vidsrc.me/embed/" + c + `/${numSeasons}-${arrEpisode[numSeasons-1]}`;
    iframe.src = "https://vidsrc.me/embed/" + c + "/1-1";
    document.getElementById("watchPlace").appendChild(iframe);
  })
} else {
  iframe.src = "https://vidsrc.me/embed/" + c;
  document.getElementById("watchPlace").appendChild(iframe);
}

