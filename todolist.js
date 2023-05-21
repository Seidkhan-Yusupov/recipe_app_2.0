// todo-main: recipe info on click
// todo-main: fav recipe (localStorage)

// todo: Create a function that gives a random meal
// todo: Create a function that gives meals based on search
// todo: Function gives meals based by the id
// todo: inside of those 3 asynchronous functions get the api
// todo: manipulate the api link to get the info you need
// todo: make sure they all the exact object json data {...}
// todo: create a function called addMeal() import it to getRandomMeal() and grab the html code that starts with class="meal"
// todo: grab the meals id element with $ sign before it
// todo: addMeal(randomMeal, true) should accept two parameters. This function creates random meal html elements
// todo: create a div and add class into it called 'meal' and paste the html code there
// todo: remove the meal div if it's written in the html code and grab the span.random and if the random is true execute the span.random if not then display an empty string
// todo: add meal picture path and name path from the object
// todo: append the div to the $meals var by using appendChild()
// todo: with query selector select the .meal-body .fav-btn and add event listener then toggle the heart button with active class
// todo: when you tap on the button it should add the meal id to the localStorage
// todo: create removeMealLS, addMealLS and getMealsLS function, make the like button to remove the mealId from the localStorage else add it
// todo: create an async function fetchFavMeals() to get the favorite meals list that loops through each id and waits for getMealById() to give the full object meal info
// todo: In the addMealFav() we take the li tag from html and put it inside and modify it, so it gets displayed in the screen inside the circles
// todo: when you tap on the heart button the meal gets added to the fav-meals with duplicates before it so to prevent it you should add $favoriteContainer.innerHTML = "" and fetchFavMeal
// todo: create the id in the input 'searchTerm' and select 'search' button and the input
// todo: set event listener to the zoom button and assign a var to the $searchTerm.value, connect it to search api, loop through every meal data and make it display in the screen by using addMeal() function, don't forget the null problem
// todo: select the popup close button and popup container. When you tap on the popup close btn it should add the class 'hidden' and hide the content
// todo: create showMealInfo() function the popup container needs extra styling, the duplicates needs to be cleared take html code and create elements accordingly
// todo: make a for loop and loop through strIngredient and put the inside of li tag
// todo: add the showMealInfo() as an event listener to images of the containers and when you tap the function should remove the .hidden class
// todo: it needs specific type of actions to trigger the showMealInfo() function
