const fs = require("fs");
const path = require("path");
const { Ingredient } = require("../models");

const ingredientImages = {
  'Anaheim': 'anaheim.png',
  'Bacon': 'bacon.png',
  'Baguette': 'baguette.png',
  'Balsalmic Vinegar': 'balsamic_vinegar.png',
  'Basil': 'basil.png',
  'Basmati Rice': 'basmati_rice.png',
  'Bay': 'bay.png',
  'Blue Cheese': 'blue_cheese.png',
  'Brandy': 'brandy.png',
  'Brown Sugar': 'brown_sugar.png',
  'Butter': 'butter.png',
  'Canola Oil': 'canola_oil',
  'Capers': 'capers_png',
  'Carrot': 'carrot.png',
  'Cayenne': 'cayenne.png',
  'Celery': 'celery.png',
  'Chedder': 'chedder.png',
  'Cherry Tomatoes': 'cherry_tomatoes.png',
  'Chicken Breast': 'chicken_breast.png',
  'Chicken Broth': 'chicken_broth.png',
  'Chicken Liver': 'cicken_liver.png',
  'Chicken Skin': 'chicken_skin.png',
  'Chicken Stock': 'chicken_stock.png',
  'Chili Powder': 'chili_powder.png',
  'Chilies': 'chilies.png',
  'Chipotle Pepper': 'chipotle_pepper.png',
  'Chives': 'chives.png',
  'Cilantro': 'cilantro.png',
  'Cinnamon': 'cinnamon.png',
  'Cloves': 'cloves.png',
  'Cognac': 'cognac.png',
  'Cooked Shrimp': 'cooked_shrimp.png',
  'Coriander': 'coriander.png',
  'Cornstarch': 'cornstarch.png',
  'Cream': 'cream.png',
  'Creme Fraiche': 'creme_fraiche.png',
  'Crutons': 'crutons.png',
  'Cucumber': 'cucumber.png',
  'Cumin': 'cumin.png',
  'Currant': 'currant.png',
  'Curry Powder': 'curry_powder.png',
  'Dijon Mustard': 'dijon_mustard.png',
  'Dill': 'dill.png',
  'Dr. Pepper': 'dr_pepper.png',
  'Eggplant': 'eggplant.png',
  'Eggs': 'eggs.png',
  'Fat': 'fat.png',
  'Fat Free Yogurt': 'fat_free_yogurt.png',
  'Fennel': 'fennel.png',
  'Feta': 'feta.png',
  'Fish Sauce': 'fish_sauce.png',
  'Flour': 'flour.png',
  'Friedeggs': 'friedeggs.png',
  'Garbanzo Beans': 'Garbanzo Beans',
  'Garlic': 'garlic.png',
  'Ginger': 'ginger.png',
  'Goat Cheese': 'goat_cheese.png',
  'Green Pepper': 'green_pepper.png',
  'Ground Lamb': 'ground_lamb.png',
  'Habenero Pepper': 'habenero_pepper.png',
  'Hazelnuts': 'hazelnuts.png',
  'Herb Salad': 'herb_salad.png',
  'Hoisin': 'hoisin.png',
  'Honey and Mustard Salad Dressing': 'honey_and_mustard_salad_dressing',
  'Jalapenos': 'jalapenos.png',
  'Ketchup': 'ketchup.png',
  'Lamb Cutlet': 'lamb_cutlet.png',
  'Lamb Stew Meat': 'lamb_stew_meat.png',
  'Lard': 'lard.png',
  'Leek': 'leek.png',
  'Lemon': 'lemon.png',
  'Lime': 'lime.png',
  'Mango': 'mango.png',
  'Mayonnaise': 'mayonnaise.png',
  'Milk': 'milk.png',
  'Mirin Rice Wine': 'mirin_rice_wine',
  'Miso & Easy': 'miso_&_easy.png',
  'Mixed Salad Greens': 'mixed_salad_greens',
  'Monterey': 'monterey.png',
  'Mushrooms': 'mushrooms.png',
  'Mustard': 'mustard.png',
  'New York Strip Steak': 'new_york_strip_streak',
  'Olive Oil': 'olive_oil.png',
  'Oregano': 'oregano.png',
  'Paprika': 'paprika.png',
  'Parmesan': 'parmesan.png',
  'Parsley': 'parsley.png',
  'Peas': 'peas.png',
  'Pecorino': 'pecorino.png',
  'Pepitas': 'pepitas.png',
  'Peppercorn': 'peppercorn.png',
  'Pernod': 'pernod.png',
  'Pine Nuts': 'pine_nuts.png',
  'Pink Sea Salt': 'pink_sea_salt.png',
  'Polenta': 'polenta.png',
  'Pork Belly': 'pork_belly.png',
  'Pork Chop': 'pork_chop.png',
  'Pork Loin': 'pork_loin.png',
  'Pork Shoulder': 'pork_shoulder.png',
  'Pork Tenderloin': 'pork_tenderloin.png',
  'Porterhouse Steak': 'porterhouse_steak.png',
  'Potato Wedges': 'potato_wedges.png',
  'Potatoe': 'potatoe.png',
  'Rack of Lamb': 'rack_of_lamb.png',
  'Red Onion': 'red_onion.png',
  'Romaine Salad Mix': 'romaine_salad_mix',
  'Rosemary': 'rosemary.png',
  'Rotisserie Chicken': 'rotisserie_chicken.png',
  'Rump Steak': 'rump_steak.png',
  'Sage': 'sage.png',
  'Sake': 'sake.png',
  'Salad Dressing': 'salad_dressing.png',
  'Salad Greens': 'salad_greens.png',
  'Salad Oil': 'salad_greens.png',
  'Salmon': 'salmon.png',
  'Salt': 'salt',
  'Screw Pine': 'screw_pine.png',
  'Sea Salt': 'sea_salt.png',
  'Sesame Oil': 'sesame_oil.png',
  'Shallot': 'shallot.png',
  'Skirt Steak': 'skirt_steak.png',
  'Smoked Salmon': 'smoked_salmon.png',
  'Sourcream': 'sourcream.png',
  'Soy Sauce': 'soy_sauce.png',
  'Spinach': 'spinach.png',
  'Spring Onion': 'spring_onion.png',
  'Stock': 'stock.png',
  'Strawberries': 'strawberries.png',
  'Sugar': 'sugar.png',
  'Sunflower Oil': 'sunflower_oil.png',
  'Sweet Peppers': 'sweet_peppers.png',
  'Swiss Chard': 'swiss_chard',
  'Thyme': 'thyme.png',
  'Tofu': 'tpfu.png',
  'Tomato': 'tomato.png',
  'Tortillas': 'tortillas.png',
  'Tumeric': 'tumeric.png',
  'Vegetable Oil': 'vegetable_oil.png',
  'Vinegar': 'vinegar.png',
  'Water': 'water.png',
  'Watermelon': 'watermelon.png',
  'Wheat': 'wheat.png',
  'White Onion': 'white_onion.png',
  'White Pepper': 'white_pepper.png',
  'While Chicken': 'whole_chicken.png',
  'Wine': 'wine.png',
  'Wonton': 'wonton.png',
  'Yeast': 'yeast.png',
  'Yellow Onion': 'yellow_onion.png'
};

const updateIngredientImages = async () => {
  try {
    // Loop through the recipeImages object and update the images
    for (const [ingredientName, imageName] of Object.entries(
      ingredientImages
    )) {
      const ingredient = await Ingredient.findOne({
        where: { name: ingredientName },
      });

      if (ingredient) {
        // Update the 'image' field with the new image filename
        await ingredient.update({ image: imageName });
        console.log(`Updated image for ${ingredientName}`);
      } else {
        console.log(`Ingredient not found: ${ingredientName}`);
      }
    }

    console.log("Finished updating ingredient images.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};
updateIngredientImages();
