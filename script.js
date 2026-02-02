const categories = {
  trending: [
    "J---aiyznGQ",
    "hY7m5jjJ9mM",
    "MtN1YnoL46Q"
  ],
  funny: [
    "tntOCGkgt98",
    "kLv5zKXHjz8",
    "TPw2Aodm3Xk"
  ],
  cute: [
    "1Ne1hqOXKKI",
    "9bZkp7q19f0",
    "y8Kyi0WNg40"
  ]
};

for (const category in categories) {
  const row = document.getElementById(category);

  categories[category].forEach(id => {
    const div = document.createElement("div");
    div.className = "video";

    div.innerHTML = `
      <iframe src="https://www.youtube.com/embed/${id}" allowfullscreen></iframe>
    `;

    row.appendChild(div);
  });
}
