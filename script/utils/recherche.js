export default function searchReceipts(recette, letter, allreceipts) {
  
  
  let theMillTurns = (recipes, filter) => {
  //   console.log(recipes, filter);
  let googledCards = [];

  for (let recipe of recipes) {
    // console.log(recipe);
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
      //   console.log(cards);
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

theMillTurns(recette, letter);
}
