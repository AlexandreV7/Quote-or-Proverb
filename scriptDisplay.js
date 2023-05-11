const listeFavorites = document.querySelector(".liste");
// You never reassign favorites right ?
let favorites = JSON.parse(localStorage.getItem("favorites"));

for (let i = 0; i < favorites.length; i++) {
  // You never reassign div neither ?
  let div = document.createElement("div");
  div.textContent = favorites[i].message;
  listeFavorites.appendChild(div);
}

function goBack() {
  window.location.href = "index.html";
}
