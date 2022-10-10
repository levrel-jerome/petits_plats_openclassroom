export default function searchFilterUstensil(recette, letter, allreceipts) {
  //faut que j'attrape le tableau des ingredients, ustensiles
  //for each de ingredients?
  let receiptsFilter = [...recette];

  let letterLowerCase = letter.toLowerCase();

  let ustensils = [];

  receiptsFilter.forEach((recette) => {
    ustensils = ustensils.concat(recette.ustensils);
  });

  ustensils = [...new Set(ustensils)];

  if (letter.length < 3) {
    return ustensils;
  }

  if (
    ustensils.some((ustensil) =>
      ustensil.toLowerCase().includes(letterLowerCase)
    )
  ) {
    ustensils = ustensils.filter((ustensil) =>
      ustensil.toLowerCase().includes(letterLowerCase)
    );

    return ustensils;
  }
}
