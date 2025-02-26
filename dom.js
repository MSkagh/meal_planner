import { fetchRecepieById } from "./api.js";

export const displayRecepies = (recepies, onDelete, currentlySelectedDay) => {
    const recipesContainer = document.getElementById('recipesContainer');
    recipesContainer.innerHTML = ''; // Clear the container
    recepies.forEach(recepie => {
        const recipeElement = document.createElement('div');
        recipeElement.className = 'recipe';
        recipeElement.innerHTML = `
            <h2 class="recepieName">${recepie.name}</h2>
            <p>${recepie.description}</p>
            <ul>
                ${recepie.ingredients.map(ingredient => `
                    <li>${ingredient.name}: ${ingredient.quantity} ${ingredient.unit}</li>
                `).join('')}
            </ul>
            <button class="deleteButton" data-id="${recepie._id}">Delete</button>
        `;
        recipeElement.querySelector('.deleteButton').addEventListener('click', () => onDelete(recepie._id));
        recipeElement.querySelector('.recepieName').addEventListener('click', () => fetchRecepieById(recepie._id).then((object) => addMealToDay(object, currentlySelectedDay)));

        recipesContainer.appendChild(recipeElement);
    });
};


function addMealToDay (recipe, day) {
    if (!day || !recipe) return
    let dayElement = document.getElementById(day)
    dayElement.querySelector(".weekday--meal-name").innerHTML = recipe.name
    dayElement.querySelector(".weekday--meal-description").innerHTML = recipe.description

}