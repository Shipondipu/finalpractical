const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('results');
const apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
let meals = [];

searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (!query) return alert('Please enter a search term.');

  fetchMeals(query);
});

async function fetchMeals(query) {
  try {
    const response = await fetch(`${apiUrl}${query}`);
    const data = await response.json();

    meals = data.meals || [];
    renderMeals(meals.slice(0, 5), false);
  } catch (error) {
    console.error('Error fetching meals:', error);
  }
}
function renderMeals(mealsToShow, showAll = false) {
    resultsContainer.innerHTML = '';
  
    mealsToShow.forEach(meal => {
      const mealCard = document.createElement('div');
      mealCard.className = 'meal-card';
  
      mealCard.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="meal-content">
          <h3>${meal.strMeal}</h3>
          <p><strong>ID:</strong> ${meal.idMeal}</p>
          <p>${meal.strInstructions.slice(0, 100)}...</p>
        </div>
      `;
  
      resultsContainer.appendChild(mealCard);
    });
  
    if (!showAll && meals.length > 5) {
      const showAllButton = document.createElement('button');
      showAllButton.className = 'show-all-btn';
      showAllButton.textContent = 'SHOW ALL';
      showAllButton.addEventListener('click', () => renderMeals(meals, true));
  
      resultsContainer.appendChild(showAllButton);
    }
  }