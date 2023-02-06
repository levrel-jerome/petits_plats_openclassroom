export default function searchFilterIngredient(recette, letter) {
  //faut que j'attrape le tableau des ingredients, ustensiles
  //for each de ingredients?
  let receiptsFilter = [...recette];

  let letterLowerCase = letter.toLowerCase();

  let ingredients = [];

  receiptsFilter.forEach((recette) => {
    recette.ingredients.forEach(({ ingredient }) => {
      ingredients = ingredients.concat(ingredient);
    });
  });
  ingredients = [...new Set(ingredients)];

  if (letter.length < 3) {
    return ingredients;
  }

  if (
    ingredients.some((ingredient) =>
      ingredient.toLowerCase().includes(letterLowerCase)
    )
  ) {
    ingredients = ingredients.filter((ingredient) =>
      ingredient.toLowerCase().includes(letterLowerCase)
    );

    return ingredients;
  }
}
