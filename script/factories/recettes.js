export default function recetteFactory(data) {
    const {name, ingredients, time, description} = data;

    function getRecetteCardDOM() {

        const recetteDiv = document.createElement('div');
        recetteDiv.className = 'all-receipts';

        const imgRecette = document.createElement('div');
        imgRecette.className = 'receipts-image';

        const textRecette = document.createElement('div');
        textRecette.className = 'text-receipts';

        recetteDiv.appendChild(imgRecette);
        recetteDiv.appendChild(textRecette);

        const titleTime = document.createElement('div');
        titleTime.className = 'title-receipts';

        textRecette.appendChild(titleTime);

        const necessary = document.createElement('div');
        necessary.className = 'explication-receipts';

        const necessaryIngredient = document.createElement('div');
        necessaryIngredient.className = 'ingredient-receipts';

        const necessaryReceipt = document.createElement('div');
        necessaryReceipt.className = 'information-receipts';

        textRecette.appendChild(necessary);
        necessary.appendChild(necessaryIngredient);
        necessary.appendChild(necessaryReceipt);

        const h1 = document.createElement('h1');
        h1.textContent = name;

        titleTime.appendChild(h1);

        const timer = document.createElement('p');
        timer.textContent = `${time} min`;

        titleTime.appendChild(timer);

        const descriptionRecette = document.createElement('p');
        descriptionRecette.textContent = description;

        textRecette.appendChild(necessary);

        ingredients.forEach( (ingredient) => {
            const ingredientHtml = document.createElement('p');
            ingredientHtml.textContent = ingredient.ingredient;
            if(ingredient.quantity !== undefined) {
                ingredientHtml.textContent += ` : ${ingredient.quantity} `;
            }
            if(ingredient.unit !== undefined) {
                ingredientHtml.textContent += ingredient.unit;
            }

            necessaryIngredient.appendChild(ingredientHtml);
        })
        necessaryReceipt.appendChild(descriptionRecette);

        return(recetteDiv);

    }

    return {getRecetteCardDOM}
}

