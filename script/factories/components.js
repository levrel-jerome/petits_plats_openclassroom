export default function componentsFactory() {
  function getIngredientsCardDOM(ingredients) {
    const openIngredients = document.querySelector(".open-ingredients");
    if (ingredients === undefined) {
      openIngredients.innerHTML = "Aucun ingredients ne correspond";
    } else {
      ingredients.forEach((ingredient) => {
        const ingredientHtml = document.createElement("button");
        ingredientHtml.className = "ingredient-button";

        ingredientHtml.textContent = ingredient;

        openIngredients.appendChild(ingredientHtml);
      });
    }
    return openIngredients;
  }

  function getApplianceCardDOM(appliance) {
    const openAppliance = document.querySelector(".open-appareils");

    if (appliance === undefined) {
      openAppliance.innerHTML = "Aucun appareil ne correspond";
    } else {
      appliance.forEach((appli) => {
        const applianceHTML = document.createElement("button");

        applianceHTML.className = "appliance-button";

        applianceHTML.textContent = appli;

        openAppliance.appendChild(applianceHTML);
      });
    }
    return openAppliance;
  }

  function getUstensilsCardDOM(ustensils) {
    const openUstensils = document.querySelector(".open-ustensils");

    if (ustensils === undefined) {
      openUstensils.innerHTML = "Aucun ingredients ne correspond";
    } else {
      ustensils.forEach((ustensil) => {
        const ustensiltHtml = document.createElement("button");

        ustensiltHtml.className = "ustensil-button";

        ustensiltHtml.textContent = ustensil;

        openUstensils.appendChild(ustensiltHtml);
      });
    }
    return openUstensils;
  }

  return { getIngredientsCardDOM, getApplianceCardDOM, getUstensilsCardDOM };
}
