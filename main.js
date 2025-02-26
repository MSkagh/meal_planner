import { fetchAllRecepies, deleteRecepie, addRecepie } from './api.js';
import { displayRecepies } from './dom.js';

let currentlySelectedDay;

const loadRecepies = async () => {
    const recepies = await fetchAllRecepies();
    displayRecepies(recepies, async (id) => {
        await deleteRecepie(id);
        loadRecepies();
    }, currentlySelectedDay);
};

document.getElementById('addIngredient').addEventListener('click', () => {
    const ingredientsDiv = document.getElementById('ingredients');
    const newIngredientDiv = document.createElement('div');
    newIngredientDiv.className = 'ingredient';
    newIngredientDiv.innerHTML = `
        <input type="text" name="ingredientName" placeholder="Name" required>
        <input type="number" name="ingredientQuantity" placeholder="Quantity" required>
        <input type="text" name="ingredientUnit" placeholder="Unit" required>
    `;
    ingredientsDiv.appendChild(newIngredientDiv);
});

document.getElementById('recipeForm').addEventListener('submit', async (event) => {
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
    loadRecepies(); // Refresh the list of recipes
});

document.addEventListener('DOMContentLoaded', () => {
    loadRecepies(); // Initial load
});


let weekdayElements = document.getElementsByClassName('weekday')
for(let weekday of weekdayElements) {

    let nameOfDay = weekday.querySelector('.weekday--day-name').innerHTML.toLowerCase()
 
    weekday.addEventListener("click", ()=> {
        currentlySelectedDay = nameOfDay
        console.log(`currently selected day: ${currentlySelectedDay}`)
        loadRecepies()
    })
}

const modal = document.getElementById("newRecipeModal");

const openButton = document.getElementById('openNewRecipeModal');
const closeButton = document.getElementById('closeNewRecipeModal');

openButton.addEventListener('click', () => {
    modal.showModal();
});

closeButton.addEventListener('click', () => {
    modal.close();
})


