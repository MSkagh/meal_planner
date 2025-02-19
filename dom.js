export const displayRecepies = (recepies, onDelete) => {
    const recipesContainer = document.getElementById('recipesContainer');
    recipesContainer.innerHTML = ''; // Clear the container
    recepies.forEach(recepie => {
        const recipeElement = document.createElement('div');
        recipeElement.className = 'recipe';
        recipeElement.innerHTML = `
            <h2>${recepie.name}</h2>
            <p>${recepie.description}</p>
            <ul>
                ${recepie.ingredients.map(ingredient => `
                    <li>${ingredient.name}: ${ingredient.quantity} ${ingredient.unit}</li>
                `).join('')}
            </ul>
            <button class="deleteButton" data-id="${recepie._id}">Delete</button>
        `;
        recipeElement.querySelector('.deleteButton').addEventListener('click', () => onDelete(recepie._id));
        recipesContainer.appendChild(recipeElement);
    });
};
