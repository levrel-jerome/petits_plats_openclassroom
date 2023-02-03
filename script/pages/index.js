import recetteFactory from "../factories/recettes.js";
import componentsFactory from "../factories/components.js";
import searchReceipts from "../utils/recherche.js";
import searchFilterIngredient from "../utils/filterIngredient.js";
import searchFilterUstensil from "../utils/filterUstensil.js";
import searchFilterAppliance from "../utils/filterAppliance.js";
import {
  searchReceiptsTagsUstensils,
  searchReceiptsTagsAppliances,
  searchReceiptsTagsIngredients,
} from "../utils/filterTag.js";

const searchBar = document.querySelector("#search");

const divTag = document.querySelector("#tag");

const ingredientsButton = document.querySelector(".ingredients");
const contentIngredient = document.querySelector(".open-ingredients");
const spanIngredient = document.querySelector(".span-1");

const appareilsButton = document.querySelector(".appareils");
const contentAppareil = document.querySelector(".open-appareils");
const spanAppareil = document.querySelector(".span-2");

const ustensilsButton = document.querySelector(".ustensils");
const contentUstensils = document.querySelector(".open-ustensils");
const spanUstensil = document.querySelector(".span-3");

const down = document.querySelector(".fa-chevron-down");

let receiptsFiltered = [];
let recettes = [];

let ingredients = [];
let ustensils = [];
let appliances = [];

let tags = [];

const spanButton = document.querySelectorAll("span");

async function getRecettes() {
  return fetch("../data/recette.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (myjson) {
      return myjson.recipes;
    });
}

async function displayRecettes(recettes) {
  const recettesSection = document.querySelector(".recettes");
  recettesSection.innerHTML = "";
  ingredients = [];
  appliances = [];
  ustensils = [];
  recettes.forEach((recette) => {
    const recettesModele = recetteFactory(recette);
    const recetteCardDOM = recettesModele.getRecetteCardDOM();
    recettesSection.appendChild(recetteCardDOM);
    recette.ingredients.forEach(({ ingredient }) => {
      ingredients = ingredients.concat(ingredient);
    });
    appliances = appliances.concat(recette.appliance);
    ustensils = ustensils.concat(recette.ustensils);
  });
  ingredients = [...new Set(ingredients)];
  appliances = [...new Set(appliances)];
  ustensils = [...new Set(ustensils)];
}

async function initRecettes() {
  recettes = await getRecettes();
  receiptsFiltered = [...recettes];
  displayRecettes(receiptsFiltered);
  const barreRecherche = document.querySelector("#search-receipts");
  barreRecherche.addEventListener("keyup", (e) => {
    receiptsFiltered = searchReceipts(
      receiptsFiltered,
      e.target.value,
      recettes
    );
    displayRecettes(receiptsFiltered);
  });
}

async function init() {
  await initRecettes();
  initIngredients();
  initAppliance();
  initUstensil();
}

async function displayIngredients() {
  const ingredientsSection = document.querySelector(".dropdown-parent-1");
  contentIngredient.innerHTML = "";
  const ingredientModele = componentsFactory();
  const ingredientCardDOM = ingredientModele.getIngredientsCardDOM(ingredients);
  ingredientsSection.appendChild(ingredientCardDOM);
  function createTag(textContent) {
    let tag = document.createElement("button");
    tag.classList.add("ingredient-tag");
    tag.innerHTML = textContent + "<p class = close>x</p>";
    searchBar.parentNode.insertBefore(tag, searchBar.nextSibling);
    tag.addEventListener("click", () => {
      let indexArray = tags.findIndex(
        (tag) => tag.type === "ingredient" && tag.value === textContent
      );
      if (indexArray > -1) {
        tag.remove();
        tags.splice(indexArray, 1);
        receiptsFiltered = [...recettes];
        tags.forEach((tag) => {
          if (tag.type === "ingredient") {
            receiptsFiltered = searchReceiptsTagsIngredients(
              receiptsFiltered,
              tag.value
            );
          }
          if (tag.type === "ustensil") {
            receiptsFiltered = searchReceiptsTagsUstensils(
              receiptsFiltered,
              tag.value
            );
          }
        });
        displayRecettes(receiptsFiltered);
        displayUstensils();
        displayIngredients();
        displayAppliance();
      }
    });
  }

  const ClickIngredientButton = document.querySelectorAll(".ingredient-button");
  for (var i = 0; i < ClickIngredientButton.length; i++) {
    ClickIngredientButton[i].addEventListener("click", (e) => {
      let textContentTag = e.currentTarget.innerText;
      let tabIgredientTag = tags.find(
        (tag) => tag.type === "ingredient" && tag.value === textContentTag
      );
      if (tabIgredientTag === undefined) {
        receiptsFiltered = searchReceiptsTagsIngredients(
          receiptsFiltered,
          textContentTag
        );
        displayRecettes(receiptsFiltered);
        displayUstensils();
        displayIngredients();
        displayAppliance();

        tags.push({ type: "ingredient", value: textContentTag });
        createTag(textContentTag);
      }
    });
  }
}

async function initIngredients() {
  displayIngredients();
  const ingredientsRecherche = document.querySelector("#placeholder-color");
  ingredientsRecherche.addEventListener("keyup", (e) => {
    ingredients = searchFilterIngredient(receiptsFiltered, e.target.value);
    displayIngredients();
  });
}

async function displayAppliance() {
  const applianceSection = document.querySelector(".dropdown-parent-2");
  contentAppareil.innerHTML = "";
  const applianceModele = componentsFactory();
  const applianceCardDOM = applianceModele.getApplianceCardDOM(appliances);
  applianceSection.appendChild(applianceCardDOM);

  function createTag(textContent) {
    let tag = document.createElement("button");
    tag.classList.add("appliance-tag");
    tag.innerHTML = textContent + "<p class = close>x</p>";
    searchBar.parentNode.insertBefore(tag, searchBar.nextSibling);
    tag.addEventListener("click", () => {
      let indexArray = tags.findIndex(
        (tag) => tag.type === "appliance" && tag.value === textContent
      );
      if (indexArray > -1) {
        tag.remove();
        tags.splice(indexArray, 1);
        receiptsFiltered = [...recettes];
        tags.forEach((tag) => {
          if (tag.type === "appliance") {
            receiptsFiltered = searchReceiptsTagsUstensils(
              receiptsFiltered,
              tag.value
            );
          }
          if (tag.type === "ustensil") {
            receiptsFiltered = searchReceiptsTagsUstensils(
              receiptsFiltered,
              tag.value
            );
          }
          if (tag.type === "ingredient") {
            receiptsFiltered = searchReceiptsTagsIngredients(
              receiptsFiltered,
              tag.value
            );
          }
        });
        displayRecettes(receiptsFiltered);
        displayUstensils();
        displayIngredients();
        displayAppliance();
      }
    });
  }
  const ClickApplianceButton = document.querySelectorAll(".appliance-button");
  for (var i = 0; i < ClickApplianceButton.length; i++) {
    ClickApplianceButton[i].addEventListener("click", (e) => {
      let textContentTag = e.currentTarget.innerText;
      let tabApplianceTag = tags.find(
        (tag) => tag.type === "appliance" && tag.value === textContentTag
      );
      if (tabApplianceTag === undefined) {
        receiptsFiltered = searchReceiptsTagsAppliances(
          receiptsFiltered,
          textContentTag
        );
        displayRecettes(receiptsFiltered);
        displayUstensils();
        displayIngredients();
        displayAppliance();
        tags.push({ type: "appliance", value: textContentTag });
        createTag(textContentTag);
      }
    });
  }
}

async function initAppliance() {
  displayAppliance(receiptsFiltered);
  const applianceRecherche = document.querySelector("#placeholder-color-2");
  applianceRecherche.addEventListener("keyup", (e) => {
    appliances = searchFilterAppliance(receiptsFiltered, e.target.value);
    displayAppliance(appliances);
  });
}

async function displayUstensils() {
  const ustensilSection = document.querySelector(".dropdown-parent-3");
  contentUstensils.innerHTML = "";
  const ustensilModele = componentsFactory();
  const ustensilCardDOM = ustensilModele.getUstensilsCardDOM(ustensils);
  ustensilSection.appendChild(ustensilCardDOM);
  function createTag(textContent) {
    let tag = document.createElement("button");
    tag.classList.add("ustensil-tag");
    tag.innerHTML = textContent + "<p class = close>x</p>";
    searchBar.parentNode.insertBefore(tag, searchBar.nextSibling);
    tag.addEventListener("click", () => {
      let indexArray = tags.findIndex(
        (tag) => tag.type === "ustensil" && tag.value === textContent
      );
      if (indexArray > -1) {
        tag.remove();
        tags.splice(indexArray, 1);
        receiptsFiltered = [...recettes];
        tags.forEach((tag) => {
          if (tag.type === "ustensil") {
            receiptsFiltered = searchReceiptsTagsUstensils(
              receiptsFiltered,
              tag.value
            );
          }
          if (tag.type === "ingredient") {
            receiptsFiltered = searchReceiptsTagsIngredients(
              receiptsFiltered,
              tag.value
            );
          }
        });
        displayRecettes(receiptsFiltered);
        displayUstensils();
        displayIngredients();
        displayAppliance();
      }
    });
  }
  const ClickUstensilButton = document.querySelectorAll(".ustensil-button");
  for (var i = 0; i < ClickUstensilButton.length; i++) {
    ClickUstensilButton[i].addEventListener("click", (e) => {
      let textContentTag = e.currentTarget.innerText;
      let tabUstensileTag = tags.find(
        (tag) => tag.type === "ustensil" && tag.value === textContentTag
      );
      if (tabUstensileTag === undefined) {
        receiptsFiltered = searchReceiptsTagsUstensils(
          receiptsFiltered,
          textContentTag
        );
        displayRecettes(receiptsFiltered);
        displayUstensils();
        displayIngredients();
        displayAppliance();
        tags.push({ type: "ustensil", value: textContentTag });
        createTag(textContentTag);
      }
    });
  }
}

async function initUstensil() {
  displayUstensils();
  const ustensilRecherche = document.querySelector("#placeholder-color-3");
  ustensilRecherche.addEventListener("keyup", (e) => {
    ustensils = searchFilterUstensil(
      receiptsFiltered,
      e.target.value,
      recettes
    );
    displayUstensils(ustensils);
  });
}

let clicked = false;

function openButton(n) {
  document.getElementById("placeholder-color" + n).removeAttribute("readonly");
  document
    .getElementById("placeholder-color" + n)
    .removeAttribute("placeholder");
  document.getElementById("placeholder-color" + n).focus();
}

function closeButton(n) {
  document
    .getElementById("placeholder-color" + n)
    .setAttribute("readonly", "readonly");
}

ingredientsButton.addEventListener("click", () => {
  if (!clicked) {
    clicked = true;
    contentIngredient.style.display = "flex";
    ingredientsButton.classList.add("ingredients-click");
    spanIngredient.style.transform = "rotate(180deg)";
    spanAppareil.style.transform = "rotate(0deg)";
    spanUstensil.style.transform = "rotate(0deg)";
    openButton("");
    contentAppareil.style.display = "none";
    appareilsButton.classList.remove("appareils-click");
    closeButton("-2");
    document
      .getElementById("placeholder-color-2")
      .setAttribute("placeholder", "Appareils");
    contentUstensils.style.display = "none";
    ustensilsButton.classList.remove("ustensils-click");
    closeButton("-3");
    document
      .getElementById("placeholder-color-3")
      .setAttribute("placeholder", "Ustensiles");
  } else if (clicked) {
    clicked = false;
    contentIngredient.style.display = "none";
    spanIngredient.style.transform = "rotate(0deg)";
    ingredientsButton.classList.remove("ingredients-click");
    closeButton("");
    let getPlaceHolder = document.getElementById("placeholder-color");
    getPlaceHolder.setAttribute("placeholder", "Ingredients");
    getPlaceHolder.value = "";
    getPlaceHolder.dispatchEvent(new Event("keyup"));
  }
});

appareilsButton.addEventListener("click", () => {
  if (!clicked) {
    clicked = true;
    contentAppareil.style.display = "flex";
    appareilsButton.classList.add("appareils-click");
    spanAppareil.style.transform = "rotate(180deg)";
    spanIngredient.style.transform = "rotate(0deg)";
    spanUstensil.style.transform = "rotate(0deg)";
    openButton("-2");
    contentIngredient.style.display = "none";
    ingredientsButton.classList.remove("ingredients-click");
    closeButton("");
    document
      .getElementById("placeholder-color")
      .setAttribute("placeholder", "Ingredients");
    contentUstensils.style.display = "none";
    ustensilsButton.classList.remove("ustensils-click");
    closeButton("-3");
    document
      .getElementById("placeholder-color-3")
      .setAttribute("placeholder", "Ustensiles");
  } else if (clicked) {
    clicked = false;
    contentAppareil.style.display = "none";
    spanAppareil.style.transform = "rotate(0deg)";
    appareilsButton.classList.remove("appareils-click");
    closeButton("-2");
    let getPlaceHolder = document.getElementById("placeholder-color-2");
    getPlaceHolder.setAttribute("placeholder", "Appareils");
    getPlaceHolder.value = "";
    getPlaceHolder.dispatchEvent(new Event("keyup"));
  }
});

ustensilsButton.addEventListener("click", () => {
  if (!clicked) {
    clicked = true;
    contentUstensils.style.display = "flex";
    ustensilsButton.classList.add("ustensils-click");
    spanUstensil.style.transform = "rotate(180deg)";
    spanIngredient.style.transform = "rotate(0deg)";
    spanAppareil.style.transform = "rotate(0deg)";
    openButton("-3");
    contentIngredient.style.display = "none";
    ingredientsButton.classList.remove("ingredients-click");
    closeButton("");
    document
      .getElementById("placeholder-color")
      .setAttribute("placeholder", "Ingredients");
    contentAppareil.style.display = "none";
    appareilsButton.classList.remove("appareils-click");
    closeButton("-2");
    document
      .getElementById("placeholder-color-2")
      .setAttribute("placeholder", "Appareils");
  } else if (clicked) {
    clicked = false;
    contentUstensils.style.display = "none";
    spanUstensil.style.transform = "rotate(0deg)";
    ustensilsButton.classList.remove("ustensils-click");
    closeButton("-3");
    let getPlaceHolder = document.getElementById("placeholder-color-3");
    getPlaceHolder.setAttribute("placeholder", "Ustensiles");
    getPlaceHolder.value = "";
    getPlaceHolder.dispatchEvent(new Event("keyup"));
  }
});

init();
