const listeFavorites = document.querySelector(".liste");
let favorites = JSON.parse(localStorage.getItem("favorites"));

for (let i = 0; i < favorites.length; i++) {
  let div = document.createElement("div");
  div.textContent = favorites[i].message;
  listeFavorites.appendChild(div);
}

function goBack() {
  window.location.href = "index.html";
}
