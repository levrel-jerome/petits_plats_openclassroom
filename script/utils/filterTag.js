export function searchReceiptsTagsIngredients(recettes, tagContent) {
  let receiptsIngredientsFilter = [...recettes];

  receiptsIngredientsFilter = receiptsIngredientsFilter.filter(
    ({ ingredients }) =>
      ingredients.some(({ ingredient }) => ingredient === tagContent)
  );
  return receiptsIngredientsFilter;
}
export function searchReceiptsTagsAppliances(recettes, tagContent) {
  let receiptsAppliancesFilter = [...recettes];

  receiptsAppliancesFilter = receiptsAppliancesFilter.filter(
    ({ appliance }) => {
      return appliance === tagContent;
    }
  );
  return receiptsAppliancesFilter;
}

export function searchReceiptsTagsUstensils(recettes, tagContent) {
  let receiptsUstensilsFilter = [...recettes];

  receiptsUstensilsFilter = receiptsUstensilsFilter.filter(({ ustensils }) =>
    ustensils.some((ustensil) => ustensil === tagContent)
  );
  return receiptsUstensilsFilter;
}
