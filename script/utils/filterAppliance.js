export default function searchFilterAppliance(recette, letter) {
  let receiptsFilter = [...recette];

  let letterLowerCase = letter.toLowerCase();

  let appliances = [];

  receiptsFilter.forEach((recette) => {
    appliances = appliances.concat(recette.appliance);
  });

  appliances = [...new Set(appliances)];

  if (letter.length < 3) {
    return appliances;
  }

  if (
    appliances.some((appliance) =>
      appliance.toLowerCase().includes(letterLowerCase)
    )
  ) {
    appliances = appliances.filter((appliance) =>
      appliance.toLowerCase().includes(letterLowerCase)
    );
    return appliances;
  }
}
