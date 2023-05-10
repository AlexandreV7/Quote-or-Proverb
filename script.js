const data = [
  {
    id: 0,
    type: "quote",
    message: "A vaincre sans péril, on triomphe sans gloire",
  },
  {
    id: 1,
    type: "quote",
    message: "Tout est au mieux dans le meilleur des mondes",
  },
  {
    id: 2,
    type: "quote",
    message: "L'imagination est plus importante que le savoir",
  },
  {
    id: 3,
    type: "quote",
    message: "Un problème sans solution est un problème mal posé",
  },
  {
    id: 4,
    type: "proverb",
    message: "Paix et tranquillité, voilà le bonheur.",
  },
  {
    id: 5,
    type: "proverb",
    message:
      "La patience est un arbre dont la racine est amère, et dont les fruits sont très doux.",
  },
  {
    id: 6,
    type: "proverb",
    message: "On apprend peu par la victoire, mais beaucoup par la défaite.",
  },
  {
    id: 7,
    type: "proverb",
    message: "Avec du temps et de la patience, on vient à bout de tout.",
  },
];

const msg = document.querySelector(".message");
const btn = document.querySelector(".btn");
const quote = document.querySelector(".checkQ");
const proverbe = document.querySelector(".checkP");
const body = document.querySelector("body");
const resetBtn = document.querySelector(".btnRst");

msg.readOnly = true;
//Default management of buttons
if (msg.value == "") resetBtn.disabled = true;
if (quote.checked == false && proverbe.checked == false) btn.disabled = true;
quote.addEventListener("click", function () {
  if (quote.checked) btn.disabled = false;
  else btn.disabled = true;
});
proverbe.addEventListener("click", function () {
  if (proverbe.checked) btn.disabled = false;
  else btn.disabled = true;
});




//Display the quote or proverb based on the checked box
function send() {
  if(quote.checked){
    const quoteTab = data.filter((element) => element.type == "quote");
    const indexRandom = Math.floor(Math.random() * quoteTab.length);
    const elementRandom = quoteTab[indexRandom];
    msg.value = elementRandom.message;
    btn.disabled = true;
    resetBtn.disabled = false;
    addToFavorite(elementRandom);
  }
  if(proverbe.checked){
    const proverbTab = data.filter((element) => element.type == "proverb");
    const indexRandom = Math.floor(Math.random() * proverbTab.length);
    const elementRandom = proverbTab[indexRandom];
    msg.value = elementRandom.message;
    btn.disabled = true;
    resetBtn.disabled = false;
    addToFavorite(elementRandom);
  }
}




//Declaration of a counter to display a buttonAddFavorite only once
let count = 0;


const buttonAddFavorite = document.createElement("button");


function addToFavorite(elementRandom) {
  
  buttonAddFavorite.textContent = "Add to favorite";
  if (count === 0) {
    buttonAddFavorite.classList.toggle("addMessage");
    count++;
    body.appendChild(buttonAddFavorite);
  }

  const dataLocalStorage = JSON.parse(localStorage.getItem("favorites")) || [];

  buttonAddFavorite.addEventListener("click", function () {
    const newFavorite = {
      id: elementRandom.id,
      type: elementRandom.type,
      message: elementRandom.message,
    };
    
    if (compare(newFavorite, dataLocalStorage) == false) {
      dataLocalStorage.push(newFavorite);
      localStorage.setItem("favorites", JSON.stringify(dataLocalStorage));
      displayFavorites();
    }
    reset();

  });
}

//Check if a favorite already exists in the local storage.
function compare(newFavorite, tabFavorites){
  for(let i = 0; i<tabFavorites.length; i++)
  { 
    if(newFavorite.id === tabFavorites[i].id) return true;
  }
  return false;
}

//Declaration of a counter to display a buttonDisplayFavorites only once
let counter = 0;


function displayFavorites() {
  let buttonDisplayFavorites = document.createElement("button");
  buttonDisplayFavorites.textContent = "Display your favorites";
  buttonDisplayFavorites.classList.toggle("addMessage");
  if (counter === 0) {
    counter++;
    body.appendChild(buttonDisplayFavorites);
  }

  buttonDisplayFavorites.addEventListener("click", function () {
    window.location.href = "displayFavorites.html";
  });
}



function reset() {
  msg.value = "";
  btn.disabled = false;

}

function createMessage() {
  //Creation of the form
  const form = document.createElement("form");
  form.classList.add("createMessageForm");

  //Creation of the select element and its options
  const select = document.createElement("select");
  select.classList.add("createMessageSelect");
  const optionQuote = document.createElement("option");
  optionQuote.value = "quote";
  optionQuote.text = "citation";
  optionQuote.textContent = "Quote";
  const optionProverbe = document.createElement("option");
  optionProverbe.value = "proverb";
  optionProverbe.text = "proverbe";
  optionProverbe.textContent = "Proverbe";
  select.add(optionQuote);
  select.add(optionProverbe);

  //Creation of the textarea element
  const textarea = document.createElement("textarea");
  textarea.classList.add("createMassageArea");

  //Creation of the submit button
  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Submit";
  submitBtn.classList.add("addMessage", "submit");
  submitBtn.addEventListener("click", addData);

  //Adding the elements to the form
  form.appendChild(select);
  form.appendChild(textarea);
  form.appendChild(submitBtn);
  msg.replaceWith(form);

  //Disabling the checkbox options and send button
  btn.disabled = true;
  quote.disabled = true;
  proverbe.disabled = true;

  //This function creates a new object and adds it to the data array
  function addData(event) {
    event.preventDefault();
    let type = select.value;
    let message = textarea.value;

    let newData = {
      id: data.length,
      type: type,
      message: message,
    };

    if(newData.type == "quote"){
      quote.disabled = false;
      proverbe.disabled = false;
      quote.checked = true;
    }
    if (newData.type == "proverb") {
      quote.disabled = false;
      proverbe.disabled = false;
      proverbe.checked = true;
    }

    addToFavorite(newData);
   
    data.push(newData);
    form.replaceWith(msg);
    msg.value = newData.message;
    resetBtn.disabled = false;
  }
}

