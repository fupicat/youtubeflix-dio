function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

document.querySelector("#assistir").onclick = () => window.location = 'https://www.youtube.com/embed/Mwt35SEeR9w?autoplay=1';
document.querySelector("#info").onclick = () => window.location = `https://mattw.io/youtube-metadata/?url=https%3A%2F%2Fyoutu.be%2FMwt35SEeR9w&submit=true`;

fetch("/videos.json")
  .then(response => response.json())
  .then(start);

function start(data) {
  const videos = data;
  shuffleArray(videos);
  const videobox = document.querySelector(".carrossel-filmes .owl-carousel");

  for (const v of videos) {
    const item = document.createElement("div");
    item.className = "item";
    item.onclick = function() {
      document.querySelector(".titulo").textContent = v.snippet.title;
      document.querySelector(".descricao").textContent = v.snippet.description;
      document.documentElement.style.setProperty("--video", `url("${v.snippet.thumbnails.high.url}")`);
      document.querySelector("#assistir").onclick = () => window.location = `https://www.youtube.com/embed/${v.id.videoId}?autoplay=1`;
      document.querySelector("#info").onclick = () => window.location = `https://mattw.io/youtube-metadata/?url=https%3A%2F%2Fyoutu.be%2F${v.id.videoId}&submit=true`;
    };
    const img = document.createElement("img");
    img.className = "box-filme";
    img.src = v.snippet.thumbnails.medium.url;
    img.alt = v.snippet.title;

    item.appendChild(img);
    videobox.appendChild(item);
  }

  $('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    responsive:{
      0:{
          items:1
      },
      600:{
          items:3
      },
      1000:{
          items:5
      }
    }
  });
}