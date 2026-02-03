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
    "y8Kyi0WNg40",
    "9bZkp7q19f0"
  ]
};

const modal = document.getElementById("modal");
const modalVideo = document.getElementById("modalVideo");
const closeModal = document.getElementById("closeModal");

for (const category in categories) {
  const row = document.getElementById(category);

  categories[category].forEach(id => {
    const div = document.createElement("div");
    div.className = "video";

    div.innerHTML = `
      <iframe src="https://www.youtube.com/embed/${id}" loading="lazy"></iframe>
    `;

    div.addEventListener("click", () => {
      modal.classList.remove("hidden");
      modalVideo.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
    });

    row.appendChild(div);
  });
}

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  modalVideo.src = "";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
    modalVideo.src = "";
  }
});
