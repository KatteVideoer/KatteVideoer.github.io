// ---------------------------
// DATA / KATEGORIER
// ---------------------------
const categories = {
  trending: ["J---aiyznGQ", "hY7m5jjJ9mM", "MtN1YnoL46Q"],
  funny: ["tntOCGkgt98", "kLv5zKXHjz8", "TPw2Aodm3Xk"],
  cute: ["1Ne1hqOXKKI", "y8Kyi0WNg40", "9bZkp7q19f0"]
};

// ---------------------------
// MODAL ELEMENTER
// ---------------------------
const modal = document.getElementById("modal");
const modalVideo = document.getElementById("modalVideo");
const closeModal = document.getElementById("closeModal");

// ---------------------------
// FAVORITTER / MY LIST
// ---------------------------
let myList = JSON.parse(localStorage.getItem("myList")) || [];

function saveMyList() {
  localStorage.setItem("myList", JSON.stringify(myList));
}

function addToMyList(id) {
  if (!myList.includes(id)) {
    myList.push(id);
    saveMyList();
    renderMyList();
  }
}

function renderMyList() {
  const row = document.getElementById("mylist");
  row.innerHTML = "";

  myList.forEach(id => {
    const div = document.createElement("div");
    div.className = "video";
    div.innerHTML = `
      <iframe src="https://www.youtube.com/embed/${id}" allowfullscreen></iframe>
    `;
    div.addEventListener("click", () => openModal(id));
    row.appendChild(div);
  });
}

// ---------------------------
// FUNKSJON: ÅPNE MODAL
// ---------------------------
function openModal(id) {
  modal.classList.remove("hidden");
  modalVideo.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
}

// ---------------------------
// FUNKSJON: LAG VIDEO-RADER
// ---------------------------
function createVideoRow(categoryId, videos) {
  const row = document.getElementById(categoryId);

  videos.forEach(id => {
    const div = document.createElement("div");
    div.className = "video";

    // HTML: heart + preview thumbnail
    div.innerHTML = `
      <span class="heart">❤️</span>
      <div class="preview" data-id="${id}" 
           style="background-image:url('https://img.youtube.com/vi/${id}/hqdefault.jpg')">
      </div>
    `;

    // Heart click
    div.querySelector(".heart").addEventListener("click", (e) => {
      e.stopPropagation(); // hindrer modal
      addToMyList(id);
    });

    // Klikk på preview → modal
    div.querySelector(".preview").addEventListener("click", () => openModal(id));

    // Hover preview
    div.querySelector(".preview").addEventListener("mouseenter", (e) => {
      const preview = e.currentTarget;
      preview.innerHTML = `
        <iframe 
          src="https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&modestbranding=1" 
          frameborder="0" 
          allow="autoplay" 
          style="width:100%; height:100%; border:none; border-radius:8px;">
        </iframe>
      `;
    });

    div.querySelector(".preview").addEventListener("mouseleave", (e) => {
      const preview = e.currentTarget;
      preview.innerHTML = "";
      preview.style.backgroundImage = `url('https://img.youtube.com/vi/${id}/hqdefault.jpg')`;
    });

    row.appendChild(div);
  });
}

// ---------------------------
// OPPRETT ALLE KATEGORIER
// ---------------------------
for (const category in categories) {
  createVideoRow(category, categories[category]);
}

// ---------------------------
// MODAL CLOSE
// ---------------------------
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

// ---------------------------
// INITIAL RENDER MY LIST
// ---------------------------
renderMyList();
