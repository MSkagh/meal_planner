import { fetchAllRecepies, fetchRecepieById, deleteRecepie, addRecepie } from "./api.js";
import state from "./state.js";

export const displayRecepies = (recepies, onDelete,) => {
    const recipesContainer = document.getElementById('recipesContainer');
    recipesContainer.innerHTML = '';
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
        recipeElement.querySelector('.recepieName').addEventListener('click', () => fetchRecepieById(recepie._id).then((object) => addMealToDay(object)));

        recipesContainer.appendChild(recipeElement);
    });
};


function addMealToDay(recipe) {
    const day = state.getCurrentlySelectedDay()
    if (!day || !recipe) return
    let dayElement = document.getElementById(day)
    dayElement.querySelector(".weekday--meal-name").innerHTML = recipe.name
    dayElement.querySelector(".weekday--meal-description").innerHTML = recipe.description
}

export const createNewIngredientElement = () => {
    const ingredientsDiv = document.getElementById('ingredients');
    const newIngredientDiv = document.createElement('div');

    newIngredientDiv.className = 'ingredient';
    newIngredientDiv.innerHTML = `
        <input type="text" name="ingredientName" placeholder="Name" required>
        <input type="number" name="ingredientQuantity" placeholder="Quantity" required>
        <input type="text" name="ingredientUnit" placeholder="Unit" required>
    `;
    ingredientsDiv.appendChild(newIngredientDiv);
}



export const setEventListeners = () => {
    // WHEN CLICKING ON THE WEEKDAY ELEMENTS
    let weekdayElements = document.getElementsByClassName('weekday')

    for (let weekday of weekdayElements) {
        let nameOfDay = weekday.querySelector('.weekday--day-name').innerHTML.toLowerCase()
        weekday.addEventListener("click", () => state.setCurrentlySelectedDay(nameOfDay))
    }

    // OPENING AND CLOSING DIALOG
    const modal = document.getElementById("newRecipeModal");
    const openButton = document.getElementById('openNewRecipeModal');
    const closeButton = document.getElementById('closeNewRecipeModal');

    openButton.addEventListener('click', () => {
        modal.showModal();
    });

    closeButton.addEventListener('click', () => {
        modal.close();
    })

    // ADDING MORE INGREDIENTS WHILE ADDING RECIPE
    document.getElementById('addIngredient').addEventListener('click', () => createNewIngredientElement());

    // SUBMITTING A NEW RECIPE
    document.getElementById('recipeForm').addEventListener('submit', (event) => { submitNewRecipe(event,); modal.close() });
};

export const loadRecepies = async () => {
    const recepies = await fetchAllRecepies();
    displayRecepies(recepies, async (id) => {
        await deleteRecepie(id);
        loadRecepies();
    });
};
export const submitNewRecipe = async (event) => {
    event.preventDefault();

    const ingredients = [];
    document.querySelectorAll('.ingredient').forEach(ingredientDiv => {
        const name = ingredientDiv.querySelector('input[name="ingredientName"]').value;
        const quantity = ingredientDiv.querySelector('input[name="ingredientQuantity"]').value;
        const unit = ingredientDiv.querySelector('input[name="ingredientUnit"]').value;
        ingredients.push({ name, quantity, unit });
    });

    const formData = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        ingredients
    };

    await addRecepie(formData);
    loadRecepies();
};

