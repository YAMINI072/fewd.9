const RecipeApp = (() => {
    // Private variables
    let recipes = [
        {
            id: 1,
            title: "Spaghetti Carbonara",
            image: "https://via.placeholder.com/300x200?text=Spaghetti+Carbonara",
            difficulty: "medium",
            time: 30,
            ingredients: ["200g spaghetti", "100g pancetta", "2 eggs", "50g Parmesan", "Black pepper"],
            steps: [
                "Boil salted water and cook spaghetti according to package instructions.",
                {
                    text: "Prepare the sauce",
                    substeps: [
                        "In a pan, cook pancetta until crispy.",
                        "In a bowl, whisk eggs and grated Parmesan.",
                        "Add black pepper to taste."
                    ]
                },
                "Drain pasta, reserving some cooking water.",
                "Mix pasta with pancetta, then add egg mixture off heat.",
                "Add reserved water if needed for creaminess.",
                "Serve immediately with extra Parmesan."
            ]
        },
        {
            id: 2,
            title: "Chicken Stir Fry",
            image: "https://via.placeholder.com/300x200?text=Chicken+Stir+Fry",
            difficulty: "easy",
            time: 20,
            ingredients: ["300g chicken breast", "2 bell peppers", "1 onion", "2 tbsp soy sauce", "1 tbsp oil"],
            steps: [
                "Slice chicken and vegetables.",
                "Heat oil in a wok or large pan.",
                "Cook chicken until browned.",
                "Add vegetables and stir fry for 5 minutes.",
                "Add soy sauce and cook for another 2 minutes.",
                "Serve with rice."
            ]
        },
        {
            id: 3,
            title: "Chocolate Chip Cookies",
            image: "https://via.placeholder.com/300x200?text=Chocolate+Chip+Cookies",
            difficulty: "easy",
            time: 25,
            ingredients: ["1 cup butter", "1 cup sugar", "1 cup brown sugar", "2 eggs", "2 cups flour", "1 tsp vanilla", "1 cup chocolate chips"],
            steps: [
                "Preheat oven to 350°F (175°C).",
                "Cream butter and sugars together.",
                "Beat in eggs and vanilla.",
                "Mix in flour gradually.",
                "Stir in chocolate chips.",
                "Drop spoonfuls onto baking sheet.",
                "Bake for 10-12 minutes."
            ]
        },
        {
            id: 4,
            title: "Beef Tacos",
            image: "https://via.placeholder.com/300x200?text=Beef+Tacos",
            difficulty: "medium",
            time: 30,
            ingredients: ["500g ground beef", "1 onion", "2 cloves garlic", "1 tbsp chili powder", "8 taco shells", "Lettuce", "Cheese"],
            steps: [
                "Cook ground beef in a pan until browned.",
                "Add chopped onion and garlic, cook until soft.",
                "Stir in chili powder and spices.",
                "Warm taco shells in oven.",
                "Fill shells with beef mixture.",
                "Top with lettuce and cheese.",
                "Serve immediately."
            ]
        },
        {
            id: 5,
            title: "Vegetable Soup",
            image: "https://via.placeholder.com/300x200?text=Vegetable+Soup",
            difficulty: "easy",
            time: 45,
            ingredients: ["2 carrots", "2 potatoes", "1 onion", "2 celery stalks", "4 cups vegetable broth", "Salt", "Pepper"],
            steps: [
                "Chop all vegetables.",
                "Heat broth in a large pot.",
                "Add vegetables and bring to boil.",
                "Reduce heat and simmer for 30 minutes.",
                "Season with salt and pepper.",
                "Blend if desired for creamy texture.",
                "Serve hot."
            ]
        },
        {
            id: 6,
            title: "Grilled Salmon",
            image: "https://via.placeholder.com/300x200?text=Grilled+Salmon",
            difficulty: "medium",
            time: 25,
            ingredients: ["4 salmon fillets", "2 tbsp olive oil", "Lemon juice", "Salt", "Pepper", "Fresh herbs"],
            steps: [
                "Preheat grill to medium-high.",
                "Brush salmon with olive oil.",
                "Season with salt, pepper, and lemon juice.",
                "Place salmon on grill skin-side down.",
                "Cook for 4-5 minutes per side.",
                "Garnish with fresh herbs.",
                "Serve with sides."
            ]
        },
        {
            id: 7,
            title: "Pancakes",
            image: "https://via.placeholder.com/300x200?text=Pancakes",
            difficulty: "easy",
            time: 15,
            ingredients: ["1 cup flour", "1 tbsp sugar", "1 tsp baking powder", "1 cup milk", "1 egg", "2 tbsp butter"],
            steps: [
                "Mix dry ingredients in a bowl.",
                "Whisk wet ingredients separately.",
                "Combine wet and dry ingredients.",
                "Heat butter in a pan.",
                "Pour batter to form pancakes.",
                "Cook until bubbles form, then flip.",
                "Serve with syrup."
            ]
        },
        {
            id: 8,
            title: "Caesar Salad",
            image: "https://via.placeholder.com/300x200?text=Caesar+Salad",
            difficulty: "easy",
            time: 15,
            ingredients: ["Romaine lettuce", "Croutons", "Parmesan cheese", "Caesar dressing", "Croutons"],
            steps: [
                "Wash and chop romaine lettuce.",
                "Toss lettuce with Caesar dressing.",
                "Add croutons and Parmesan.",
                "Mix well to coat.",
                "Serve immediately."
            ]
        }
    ];

    let currentFilter = 'all';
    let currentSort = 'name';

    // Private functions
    const renderSteps = (steps, level = 0) => {
        return steps.map((step, index) => {
            if (typeof step === 'string') {
                return `<div class="step">
                    <span class="step-number">${index + 1}.</span> ${step}
                </div>`;
            } else {
                const substepsHtml = step.substeps ? renderSteps(step.substeps, level + 1) : '';
                return `<div class="step">
                    <span class="step-number">${index + 1}.</span> ${step.text}
                    ${substepsHtml ? `<ul class="substep">${substepsHtml.map(s => `<li>${s}</li>`).join('')}</ul>` : ''}
                </div>`;
            }
        }).join('');
    };

    const createStepsHTML = (steps) => {
        return `<div class="steps-container">
            ${renderSteps(steps)}
        </div>`;
    };

    const createIngredientsHTML = (ingredients) => {
        return `<div class="ingredients-container">
            <ul class="ingredients-list">
                ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
        </div>`;
    };

    const createRecipeCard = (recipe) => {
        return `
            <div class="recipe-card" data-recipe-id="${recipe.id}">
                <img src="${recipe.image}" alt="${recipe.title}">
                <div class="recipe-card-content">
                    <h3>${recipe.title}</h3>
                    <p>Difficulty: ${recipe.difficulty}</p>
                    <p>Time: ${recipe.time} minutes</p>
                    <button class="toggle-btn" data-toggle="steps">Show Steps</button>
                    <button class="toggle-btn" data-toggle="ingredients">Show Ingredients</button>
                    ${createStepsHTML(recipe.steps)}
                    ${createIngredientsHTML(recipe.ingredients)}
                </div>
            </div>
        `;
    };

    const filterRecipes = (recipes, filter) => {
        if (filter === 'all') return recipes;
        return recipes.filter(recipe => recipe.difficulty === filter);
    };

    const sortRecipes = (recipes, sort) => {
        return [...recipes].sort((a, b) => {
            if (sort === 'name') {
                return a.title.localeCompare(b.title);
            } else if (sort === 'time') {
                return a.time - b.time;
            }
            return 0;
        });
    };

    const updateDisplay = () => {
        const filteredRecipes = filterRecipes(recipes, currentFilter);
        const sortedRecipes = sortRecipes(filteredRecipes, currentSort);
        const recipeContainer = document.getElementById('recipe-container');
        recipeContainer.innerHTML = sortedRecipes.map(createRecipeCard).join('');
    };

    const updateActiveButtons = () => {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === currentFilter);
        });
        document.querySelectorAll('.sort-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.sort === currentSort);
        });
    };

    const handleFilterClick = (e) => {
        currentFilter = e.target.dataset.filter;
        updateActiveButtons();
        updateDisplay();
    };

    const handleSortClick = (e) => {
        currentSort = e.target.dataset.sort;
        updateActiveButtons();
        updateDisplay();
    };

    const handleToggleClick = (e) => {
        if (!e.target.classList.contains('toggle-btn')) return;

        const button = e.target;
        const recipeCard = button.closest('.recipe-card');
        const recipeId = recipeCard.dataset.recipeId;
        const toggleType = button.dataset.toggle;

        const container = recipeCard.querySelector(`.${toggleType}-container`);
        container.classList.toggle('visible');

        const isVisible = container.classList.contains('visible');
        button.textContent = isVisible ? `Hide ${toggleType.charAt(0).toUpperCase() + toggleType.slice(1)}` : `Show ${toggleType.charAt(0).toUpperCase() + toggleType.slice(1)}`;
    };

    const setupEventListeners = () => {
        document.querySelector('.filters').addEventListener('click', handleFilterClick);
        document.querySelector('.sorts').addEventListener('click', handleSortClick);
        document.getElementById('recipe-container').addEventListener('click', handleToggleClick);
    };

    // Public API
    return {
        init: () => {
            console.log('RecipeApp initializing...');
            setupEventListeners();
            updateDisplay();
            console.log('RecipeApp ready!');
        },
        updateDisplay: updateDisplay
    };
})();

// Initialize the app
document.addEventListener('DOMContentLoaded', RecipeApp.init);
