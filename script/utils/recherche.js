export default function searchReceipts(recette, letter, allreceipts) {
  let receiptsFilter = [...recette];

  document.querySelector(".no-receipts-error")?.remove();

  if (letter.length < 3) {
    //Si moins de 3 caracteres on entre pas dans la boucle
    return allreceipts;
  }

  let letterLowerCase = letter.toLowerCase();

  if (
    receiptsFilter.some((receipt) =>
      receipt.name.toLowerCase().includes(letterLowerCase)
    )
  ) {
    receiptsFilter = receiptsFilter.filter((receipt) =>
      receipt.name.toLowerCase().includes(letterLowerCase)
    );

    return receiptsFilter;
  }

  if (
    receiptsFilter.some((receipt) =>
      receipt.description.toLowerCase().includes(letterLowerCase)
    )
  ) {
    receiptsFilter = receiptsFilter.filter((receipt) =>
      receipt.description.toLowerCase().includes(letterLowerCase)
    );
    return receiptsFilter;
  }
  if (
    receiptsFilter.some((receipt) =>
      receipt.ingredients.toLowerCase().includes(letterLowerCase)
    )
  ) {
    receiptsFilter = receiptsFilter.filter((receipt) =>
      receipt.ingredients.toLowerCase().includes(letterLowerCase)
    );
    return receiptsFilter;
  } else {
    const searchBar = document.querySelector("#search");
    const error = "La recette est mauvaise";
    const errorMessage = document.createElement("p");
    errorMessage.className = "no-receipts-error";
    errorMessage.textContent = error;
    searchBar.parentNode.insertBefore(errorMessage, searchBar.nextSibling);

    return receiptsFilter;
  }
}
