const $meals = document.getElementById("meals");
const $favoriteContainer = document.querySelector(".fav-meals");
const $searchTerm = document.getElementById("searchTerm");
const $searchBtn = document.getElementById("search");
const $mealPopup = document.getElementById("popup-info-container");
const $popupCloseBtn = document.getElementById("close-popup");
const $mealInfo = document.querySelector(".meal-info");

getRandomMeal();
getMealById();
getMealsBySearch();
fetchFavMeals();

async function getRandomMeal() {
    const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const respData = await response.json();
    const randomMeal = respData.meals[0];
    addMeal(randomMeal, true);
    // console.log(randomMeal);
}

async function getMealById(id) {
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
    );

    const respData = await resp.json();
    const meal = respData.meals ? respData.meals[0] : null;

    // console.log("meal", meal);
    return meal;
}

async function getMealsBySearch(term) {
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
    );
    const respData = await resp.json();
    const meals = respData.meals;
    //* we are not selecting the first array value because we need all of the meals to show up in the list
    return meals;
}

function addMeal(mealData, random = false) {
    const $meal = document.createElement("div");
    $meal.classList.add("meal");
    $meal.innerHTML = `
        <div class="meal-header">
            ${random ? `<span class="random"> Random Recipe </span>` : ""}
            <img 
                id="img-${mealData.idMeal}"
                src="${mealData.strMealThumb}"
                alt="${mealData.strMeal}" />
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn">
            <i class="fas fa-heart"></i>
            </button>
        </div>
    `;

    const $mealImg = $meal.querySelector(`#img-${mealData.idMeal}`);

    $mealImg.addEventListener("click", () => {
        showMealInfo(mealData);
    });

    const $btnHeart = $meal.querySelector(".meal-body .fav-btn");

    $btnHeart.addEventListener("click", () => {
        if ($btnHeart.classList.contains("active")) {
            removeMealLS(mealData.idMeal);
            $btnHeart.classList.remove("active");
        } else {
            addMealLS(mealData.idMeal);
            $btnHeart.classList.add("active");
        }
        fetchFavMeals();
    });

    $meals.appendChild($meal);
}

//* localStorage.set('something', the_variable)

function addMealLS(mealId) {
    //* something advanced is going on here
    //* we are setting a func to a var and adding the returned value to the localStorage
    const mealIds = getMealsLS();
    localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeMealLS(mealId) {
    //* the function receives an argument and removes it from the localStorage by filtering the ids that is not the same as the given id in the argument
    const mealIds = getMealsLS();
    const filteredIds = mealIds.filter((id) => id !== mealId);
    localStorage.setItem("mealIds", JSON.stringify(filteredIds));
}

function getMealsLS() {
    //* we're creating a variable that takes the parsed data from the localStorage and returns it
    const mealIds = JSON.parse(localStorage.getItem("mealIds"));
    return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {
    // cleans up the favorite container
    $favoriteContainer.innerHTML = "";

    const mealIds = getMealsLS();

    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i];
        // console.log("mealId", mealId);
        let meal = await getMealById(mealId);

        addMealFav(meal);
    }
    // console.log("fetchFavMeals", meal);

    // add them to the screen
}

function addMealFav(mealData) {
    const $favMeal = document.createElement("li");
    $favMeal.innerHTML = `
        <img 
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        />
        <span>${mealData.strMeal}</span>
        <button class="fa-solid fa-circle-xmark clear"></button>
    `;

    $favMeal.addEventListener("click", () => {
        showMealInfo(mealData);
    });

    const $btn = $favMeal.querySelector(".clear");
    $btn.addEventListener("click", (event) => {
        event.stopPropagation(); // Stop event propagation
        removeMealLS(mealData.idMeal);
        fetchFavMeals();
    });

    $favoriteContainer.appendChild($favMeal);
}

$searchBtn.addEventListener("click", async () => {
    // * we can get the value of the input by just writing like the code below
    // * we used async await method here because it is using api to get the data and we should wait for it to load, after it fully finishes to load the data appears

    // cleaning the after the new search term container
    $meals.innerHTML = "";
    const searchValue = $searchTerm.value;
    const meals = await getMealsBySearch(searchValue);
    // if (meals) {
    //     meals.forEach((meal) => {
    //         addMeal(meal);
    //     });
    // }
    const validMeals = meals || [];

    validMeals.forEach((meal) => {
        addMeal(meal);
    });
});

$popupCloseBtn.addEventListener("click", () => {
    $mealPopup.classList.add("hidden");
});

function showMealInfo(mealData) {
    // clean up the duplicates
    $mealInfo.innerHTML = "";
    // update the meal info
    const $mealEl = document.createElement("div");
    const ingredients = [];

    // GET INGREDIENTS AND MEASURES
    for (let i = 1; i < 20; i++) {
        if (mealData["strIngredient" + i]) {
            ingredients.push(
                `${mealData["strIngredient" + i]} - ${mealData["strMeasure" + i]
                }`
            );
        } else {
            break;
        }
    }
    // console.table(ingredients.join(""));
    $mealEl.innerHTML = `
        <h1>${mealData.strMeal}</h1>
        <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        />
        <p>
            ${mealData.strInstructions}
        </p>
        <h3>
            Ingredients:
        </h3>
        <ul>
            ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
        </ul>
    `;
    // * join method is getting used above because we want to convert our data in the array into string
    $mealInfo.appendChild($mealEl);

    // show the popup
    $mealPopup.classList.remove("hidden");
}
