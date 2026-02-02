const videos = [
  {
    title: "Cats being cats 😂",
    id: "J---aiyznGQ"
  },
  {
    title: "Funny cats compilation",
    id: "hY7m5jjJ9mM"
  },
  {
    title: "Cute kittens will make your day",
    id: "MtN1YnoL46Q"
  }
];

const grid = document.getElementById("video-grid");

videos.forEach(video => {
  const card = document.createElement("div");
  card.className = "video-card";

  card.innerHTML = `
    <iframe src="https://www.youtube.com/embed/${video.id}" allowfullscreen></iframe>
    <h3>${video.title}</h3>
  `;

  grid.appendChild(card);
});
