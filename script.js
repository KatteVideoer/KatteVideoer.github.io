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
// GENERER VIDEO-RADER
// ---------------------------
for (const category in categories) {
  const row = document.getElementById(category);

  categories[category].forEach(id => {
    const div = document.createElement("div");
    div.className = "video";

    // HTML med heart + preview
    div.innerHTML = `
      <span class="heart">❤️</span>
      <div 
        class="preview" 
        data-id="${id}" 
        style="background-image:url('https://img.youtube.com/vi/${id}/hqdefault.jpg')">
      </div>
    `;

    // Heart-funksjon (favoritter)
    div.querySelector(".heart").addEventListener("click", (e) => {
      e.stopPropagation(); // viktig, hindrer modal åpning
      addToMyList(id);
    });

    // Klikk på video → modal
    div.addEventListener("click", () => openModal(id));

    // Legg til i raden
    row.appendChild(div);
  });
}

// ---------------------------
// HOVER PREVIEW (Netflix-style)
// ---------------------------
document.addEventListener("mouseenter", function (e) {
  const preview = e.target.closest(".preview");
  if (!preview) return;

  const id = preview.dataset.id;

  preview.innerHTML = `
    <iframe
      src="https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&modestbranding=1"
      allow="autoplay"
      style="width:100%; height:100%; border:none; border-radius:8px;">
    </iframe>
  `;
}, true);

document.addEventListener("mouseleave", function (e) {
  const preview = e.target.closest(".preview");
  if (!preview) return;

  const id = preview.dataset.id;
  preview.innerHTML = "";
  preview.style.backgroundImage = `url('https://img.youtube.com/vi/${id}/hqdefault.jpg')`;
}, true);

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
