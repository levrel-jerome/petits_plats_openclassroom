export default function searchReceipts(recipes, filter, recettes) {

  let googledCards = [];

  for (let recipe of recipes) {

    if (
      // une recette ?
      recipe.name.toLowerCase().trim().indexOf(filter.toLowerCase().trim()) > -1 ||
      recipe.description
        .toLowerCase()
        .trim()
        .indexOf(filter.toLowerCase().trim()) > -1 ||
      // un appareil ?
      recipe.appliance
        .toLowerCase()
        .trim()
        .indexOf(filter.toLowerCase().trim()) > -1
    ) {
      googledCards.push(recipe);

      continue;
    }
    // un ustensil ?
    for (let ustensil of recipe.ustensils) {
      if (ustensil.toLowerCase().trim().indexOf(filter) > -1) {
        googledCards.push(recipe);
        break;
      }
    }

    // un ingredient ?
    for (let ingredient of recipe.ingredients) {
      if (ingredient.ingredient.toLowerCase().trim().indexOf(filter) > -1) {
        googledCards.push(recipe);
        break;
      }
    }
  }
  return googledCards;
};
