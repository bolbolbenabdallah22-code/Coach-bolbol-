/* =========================================================
   COACH BOLBOL — FOOD DATABASE
   Approximate nutrition values per 100g
   ========================================================= */

const FOODS = [

  // =========================
  // PROTEINS
  // =========================

  {
    id: "chicken_breast",
    name: "Chicken Breast",
    category: "Protein",
    unit: "100g",
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6
  },

  {
    id: "turkey_breast",
    name: "Turkey Breast",
    category: "Protein",
    unit: "100g",
    calories: 135,
    protein: 29,
    carbs: 0,
    fat: 1.6
  },

  {
    id: "lean_beef",
    name: "Lean Beef",
    category: "Protein",
    unit: "100g",
    calories: 170,
    protein: 26,
    carbs: 0,
    fat: 7
  },

  {
    id: "beef_5_percent",
    name: "5% Lean Beef",
    category: "Protein",
    unit: "100g",
    calories: 137,
    protein: 21,
    carbs: 0,
    fat: 5
  },

  {
    id: "salmon",
    name: "Salmon",
    category: "Protein",
    unit: "100g",
    calories: 208,
    protein: 20,
    carbs: 0,
    fat: 13
  },

  {
    id: "tuna_water",
    name: "Tuna in Water",
    category: "Protein",
    unit: "100g",
    calories: 116,
    protein: 26,
    carbs: 0,
    fat: 1
  },

  {
    id: "shrimp",
    name: "Shrimp",
    category: "Protein",
    unit: "100g",
    calories: 99,
    protein: 24,
    carbs: 0.2,
    fat: 0.3
  },

  {
    id: "white_fish",
    name: "White Fish",
    category: "Protein",
    unit: "100g",
    calories: 110,
    protein: 23,
    carbs: 0,
    fat: 2
  },

  {
    id: "eggs",
    name: "Whole Eggs",
    category: "Protein",
    unit: "100g",
    calories: 143,
    protein: 12.6,
    carbs: 0.7,
    fat: 9.5
  },

  {
    id: "egg_whites",
    name: "Egg Whites",
    category: "Protein",
    unit: "100g",
    calories: 52,
    protein: 10.9,
    carbs: 0.7,
    fat: 0.2
  },

  // =========================
  // CARBOHYDRATES
  // =========================

  {
    id: "rice_raw",
    name: "White Rice — Raw",
    category: "Carbohydrate",
    unit: "100g",
    calories: 365,
    protein: 7.1,
    carbs: 80,
    fat: 0.7
  },

  {
    id: "brown_rice_raw",
    name: "Brown Rice — Raw",
    category: "Carbohydrate",
    unit: "100g",
    calories: 370,
    protein: 7.9,
    carbs: 77.2,
    fat: 2.9
  },

  {
    id: "oats",
    name: "Oats — Dry",
    category: "Carbohydrate",
    unit: "100g",
    calories: 389,
    protein: 16.9,
    carbs: 66.3,
    fat: 6.9
  },

  {
    id: "potato_raw",
    name: "Potato — Raw",
    category: "Carbohydrate",
    unit: "100g",
    calories: 77,
    protein: 2,
    carbs: 17.5,
    fat: 0.1
  },

  {
    id: "sweet_potato_raw",
    name: "Sweet Potato — Raw",
    category: "Carbohydrate",
    unit: "100g",
    calories: 86,
    protein: 1.6,
    carbs: 20.1,
    fat: 0.1
  },

  {
    id: "pasta_dry",
    name: "Pasta — Dry",
    category: "Carbohydrate",
    unit: "100g",
    calories: 371,
    protein: 13,
    carbs: 75,
    fat: 1.5
  },

  {
    id: "whole_wheat_bread",
    name: "Whole Wheat Bread",
    category: "Carbohydrate",
    unit: "100g",
    calories: 247,
    protein: 13,
    carbs: 41,
    fat: 4.2
  },

  {
    id: "white_bread",
    name: "White Bread",
    category: "Carbohydrate",
    unit: "100g",
    calories: 266,
    protein: 9,
    carbs: 49,
    fat: 3.2
  },

  // =========================
  // FRUITS
  // =========================

  {
    id: "banana",
    name: "Banana",
    category: "Fruit",
    unit: "100g",
    calories: 89,
    protein: 1.1,
    carbs: 22.8,
    fat: 0.3
  },

  {
    id: "apple",
    name: "Apple",
    category: "Fruit",
    unit: "100g",
    calories: 52,
    protein: 0.3,
    carbs: 13.8,
    fat: 0.2
  },

  {
    id: "orange",
    name: "Orange",
    category: "Fruit",
    unit: "100g",
    calories: 47,
    protein: 0.9,
    carbs: 11.8,
    fat: 0.1
  },

  {
    id: "strawberries",
    name: "Strawberries",
    category: "Fruit",
    unit: "100g",
    calories: 32,
    protein: 0.7,
    carbs: 7.7,
    fat: 0.3
  },

  {
    id: "blueberries",
    name: "Blueberries",
    category: "Fruit",
    unit: "100g",
    calories: 57,
    protein: 0.7,
    carbs: 14.5,
    fat: 0.3
  },

  {
    id: "dates",
    name: "Dates",
    category: "Fruit",
    unit: "100g",
    calories: 282,
    protein: 2.5,
    carbs: 75,
    fat: 0.4
  },

  // =========================
  // VEGETABLES
  // =========================

  {
    id: "broccoli",
    name: "Broccoli",
    category: "Vegetable",
    unit: "100g",
    calories: 34,
    protein: 2.8,
    carbs: 6.6,
    fat: 0.4
  },

  {
    id: "tomato",
    name: "Tomato",
    category: "Vegetable",
    unit: "100g",
    calories: 18,
    protein: 0.9,
    carbs: 3.9,
    fat: 0.2
  },

  {
    id: "cucumber",
    name: "Cucumber",
    category: "Vegetable",
    unit: "100g",
    calories: 15,
    protein: 0.7,
    carbs: 3.6,
    fat: 0.1
  },

  {
    id: "lettuce",
    name: "Lettuce",
    category: "Vegetable",
    unit: "100g",
    calories: 15,
    protein: 1.4,
    carbs: 2.9,
    fat: 0.2
  },

  {
    id: "carrots",
    name: "Carrots",
    category: "Vegetable",
    unit: "100g",
    calories: 41,
    protein: 0.9,
    carbs: 9.6,
    fat: 0.2
  },

  {
    id: "spinach",
    name: "Spinach",
    category: "Vegetable",
    unit: "100g",
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fat: 0.4
  },

  {
    id: "mixed_vegetables",
    name: "Mixed Vegetables",
    category: "Vegetable",
    unit: "100g",
    calories: 65,
    protein: 3,
    carbs: 12,
    fat: 0.5
  },

  // =========================
  // DAIRY
  // =========================

  {
    id: "greek_yogurt",
    name: "Greek Yogurt",
    category: "Dairy",
    unit: "100g",
    calories: 59,
    protein: 10,
    carbs: 3.6,
    fat: 0.4
  },

  {
    id: "greek_yogurt_full_fat",
    name: "Greek Yogurt Full Fat",
    category: "Dairy",
    unit: "100g",
    calories: 97,
    protein: 9,
    carbs: 3.9,
    fat: 5
  },

  {
    id: "milk_low_fat",
    name: "Low Fat Milk",
    category: "Dairy",
    unit: "100ml",
    calories: 46,
    protein: 3.4,
    carbs: 4.8,
    fat: 1.5
  },

  {
    id: "milk_full_fat",
    name: "Full Fat Milk",
    category: "Dairy",
    unit: "100ml",
    calories: 61,
    protein: 3.2,
    carbs: 4.8,
    fat: 3.3
  },

  // =========================
  // FATS
  // =========================

  {
    id: "olive_oil",
    name: "Olive Oil",
    category: "Fat",
    unit: "100g",
    calories: 884,
    protein: 0,
    carbs: 0,
    fat: 100
  },

  {
    id: "almonds",
    name: "Almonds",
    category: "Fat",
    unit: "100g",
    calories: 579,
    protein: 21.2,
    carbs: 21.6,
    fat: 49.9
  },

  {
    id: "peanut_butter",
    name: "Peanut Butter",
    category: "Fat",
    unit: "100g",
    calories: 588,
    protein: 25,
    carbs: 20,
    fat: 50
  },

  {
    id: "avocado",
    name: "Avocado",
    category: "Fat",
    unit: "100g",
    calories: 160,
    protein: 2,
    carbs: 8.5,
    fat: 14.7
  },

  // =========================
  // SUPPLEMENTS
  // =========================

  {
    id: "whey_protein",
    name: "Whey Protein",
    category: "Supplement",
    unit: "100g",
    calories: 400,
    protein: 80,
    carbs: 8,
    fat: 6
  }

];


/* =========================================================
   CALCULATE FOOD NUTRITION
   ========================================================= */

function calculateFood(foodId, grams) {

  const food = FOODS.find(item => item.id === foodId);

  if (!food) {
    return null;
  }

  const amount = Number(grams) || 0;
  const factor = amount / 100;

  return {
    id: food.id,
    name: food.name,
    grams: amount,

    calories: Number((food.calories * factor).toFixed(1)),
    protein: Number((food.protein * factor).toFixed(1)),
    carbs: Number((food.carbs * factor).toFixed(1)),
    fat: Number((food.fat * factor).toFixed(1))
  };
}


/* =========================================================
   SEARCH FOOD
   ========================================================= */

function searchFoods(query = "") {

  const text = query.toLowerCase().trim();

  if (!text) {
    return FOODS;
  }

  return FOODS.filter(food =>
    food.name.toLowerCase().includes(text) ||
    food.category.toLowerCase().includes(text)
  );
}


/* =========================================================
   GET FOOD BY ID
   ========================================================= */

function getFood(foodId) {
  return FOODS.find(food => food.id === foodId) || null;
}


/* =========================================================
   GET BY CATEGORY
   ========================================================= */

function getFoodsByCategory(category) {

  if (!category) {
    return FOODS;
  }

  return FOODS.filter(
    food => food.category.toLowerCase() === category.toLowerCase()
  );
}


/* =========================================================
   GET ALL CATEGORIES
   ========================================================= */

function getFoodCategories() {

  return [...new Set(
    FOODS.map(food => food.category)
  )];

}


/* =========================================================
   DAILY NUTRITION TOTAL
   ========================================================= */

function calculateNutritionTotal(items = []) {

  return items.reduce(
    (total, item) => {

      total.calories += Number(item.calories) || 0;
      total.protein += Number(item.protein) || 0;
      total.carbs += Number(item.carbs) || 0;
      total.fat += Number(item.fat) || 0;

      return total;

    },
    {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    }
  );

}


/* =========================================================
   ROUND NUTRITION
   ========================================================= */

function roundNutrition(data) {

  return {
    calories: Math.round(data.calories || 0),
    protein: Math.round((data.protein || 0) * 10) / 10,
    carbs: Math.round((data.carbs || 0) * 10) / 10,
    fat: Math.round((data.fat || 0) * 10) / 10
  };

}


/* =========================================================
   GLOBAL API
   ========================================================= */

window.CoachBolbolFoods = {

  FOODS,

  getFood,
  searchFoods,
  getFoodsByCategory,
  getFoodCategories,

  calculateFood,
  calculateNutritionTotal,
  roundNutrition

};
