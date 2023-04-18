const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');


// event listners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click',getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove(`showRecipe`);
});

//get meal list that matches the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=d754f2a20f5c4ac48492fa63e7f44463&ingredients=${searchInputTxt}}&number=10&limitLicense=true&ranking=1&ignorePantry=false`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data){
            data.forEach(data => {
                html += `
                    <div class="meal-item" data-id = "${data.id}">
                    <div class="meal-img">
                        <img src="${data.image}" alt="food">
                    </div>
                    <div class="meal-name">
                        <h3>${data.title}</h3>
                        <a href="#" class="recipe-btn">Get Recipe</a>
                    </div>
                </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!" ;
            mealList.classList.add('notFound');
        }
        mealList.innerHTML = html;
    })
}

// get recipe for the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://api.spoonacular.com/recipes/${mealItem.dataset.id}/information?includeNutrition=false&apiKey=d754f2a20f5c4ac48492fa63e7f44463`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data));
    }
}


function mealRecipeModal(meal){
    console.log(meal);
     let  html = `<div>
            <h2 class="recipe-title">${meal.title}</h2>
            <p class="recipe-category">${meal.dishTypes}</p>
            <div class="recipe-instructions">
                <h3>Instructions</h3>
                    <p>${meal.instructions}</p>
            </div>
            <div class="recipe-meal-img">
                <img src="${meal.image}" alt="">
            </div>
            <div class="recipe-link">
                <a href="${meal.spoonacularSourceUrl}" target="_blank">Get detailed recipe</a>
            </div>
            </div>`;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add(`showRecipe`);
}