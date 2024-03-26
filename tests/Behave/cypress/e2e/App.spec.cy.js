// NEED TO CHECK NEGATIVES
describe('My Web Application', () => {
  it('Load Application', () => {
    cy.visit('http://localhost:3001'); // Replace with our domain once it is up
   });
   it('Register', () => {
    // NEEDS NEW ACCOUNT REGISTERED FOR THE VIDEO
    // cy.visit('http://localhost:3001'); // Replace with our domain once it is up
    // cy.contains('Sign Up').click();
    // cy.url().should('include', '/register');
    // cy.get('h1').should('contain', 'Registration');
    // //New for T2
    // cy.get('#username').type('testing');
    // cy.get('#password').type('testtest');
    // cy.get('#email').type('test@email.com'); 
    // cy.contains('Register').click();
    // cy.get('h1').should('contain', 'WhatToCook');
    // Testing already registered account
    cy.visit('http://localhost:3001'); // Replace with our domain once it is up
    cy.contains('Sign Up').click();
    cy.url().should('include', '/register');
    cy.get('h1').should('contain', 'Registration');
    cy.get('#username').type('testing');
    cy.get('#password').type('testtest');
    cy.get('#email').type('test@email.com'); 
    cy.contains('Register').click();
    cy.get('p').should('contain', 'Username or email is already in use. Please choose a different one.');
    //Testing invalid
    cy.visit('http://localhost:3001'); // Replace with our domain once it is up
    cy.contains('Sign Up').click();
    cy.url().should('include', '/register');
    cy.get('h1').should('contain', 'Registration');
    cy.get('#username').type('testing');
    cy.get('#password').type('t');
    cy.get('#email').type('test@email.com'); 
    cy.contains('Register').click();
    cy.get('p').should('contain', 'Password must be at least 8 characters long');    
  });
  it('Go to Login Page and login', () => {
    cy.visit('http://localhost:3001'); // Replace with our domain once it is up
    cy.get('h1').should('contain', 'WhatToCook');
    cy.get('#username').type('colinmanning');
    cy.get('#password').type('cmanning');
    cy.contains('Login').click();
    cy.url().should('include', '/home');
    //Testing non valid
    cy.visit('http://localhost:3001'); // Replace with our domain once it is up
    cy.get('h1').should('contain', 'WhatToCook');
    cy.get('#username').type('colin');
    cy.get('#password').type('cmanning');
    cy.contains('Login').click();
    cy.get('p').should('contain', 'Error during login');
    //Testing no input
    cy.visit('http://localhost:3001'); // Replace with our domain once it is up
    cy.contains('Login').click();
    cy.get('p').should('contain', 'Please enter both username and password');
   });
  it('Navigate page', () => {
    // Login
    cy.visit('http://localhost:3001'); // Replace with our domain once it is up
    cy.get('h1').should('contain', 'WhatToCook');
    cy.get('#username').type('colinmanning');
    cy.get('#password').type('cmanning');
    cy.contains('Login').click();
    cy.url().should('include', '/home');
    // New for T2
    //About
    cy.scrollTo(0, 500);
    cy.contains('About').click();
    cy.url().should('include', '/about');
    cy.contains('Home').click();
    cy.url().should('include', '/home');
    // Contact
    cy.scrollTo(0, 500);
    cy.contains('Contact').click();
    cy.url().should('include', '/contact');
    cy.contains('Home').click();
    cy.url().should('include', '/home');
    // END New for T 2
    // Recipes
    cy.contains('Recipe').click();
    cy.url().should('include', '/RecipeGenerator');
    cy.contains('Home').click();
    cy.url().should('include', '/home');
    // Price
    //New for T2
    cy.contains('Price').click();
    cy.url().should('include', '/PriceComparer');
    cy.contains('Home').click();
    cy.url().should('include', '/home');
    //Dietary
    cy.contains('Dietary').click();
    cy.url().should('include', '/diet');
    cy.contains('Home').click();
    cy.url().should('include', '/home');
    // Profile
    cy.contains('Profile').click();
    cy.url().should('include', '/profile');
    cy.contains('Home').click();
    cy.url().should('include', '/home');
  });
  it('Profile', () => {
    //Login to test profile side
    cy.visit('http://localhost:3001'); // Replace with our domain once it is up
    cy.get('h1').should('contain', 'WhatToCook');
    cy.get('#username').type('colinmanning');
    cy.get('#password').type('cmanning');
    cy.contains('Login').click();
    cy.contains('Profile').click();
    cy.url().should('include', '/profile');
    cy.get('h1').should('contain', 'Profile');
    //Check User Data
    cy.get('img.pic-icon').should('exist').click();
    cy.contains('Change').click();
    cy.contains('Upload').click();
    cy.contains('Cancel').click();
    cy.get('p').should('contain', 'colinmanning');
    cy.get('p').should('contain','c@email.com');
    cy.get('h1').should('contain', 'Meal of the Week');
    cy.get('img.r-arrow').should('exist').click();
    cy.url().should('include', '/RecipeGenerator');
    cy.contains('Profile').click();
    //Booked Marked Recipes
    cy.get('h2').should('contain', 'BOOKMARKED RECIPES');
    cy.get('p').should('contain', 'Grilled Tofu Salad With Miso Dressing');
    cy.get('img.fav_recipe_image').click();
    cy.url().should('include', '/RecipeGenerator');
    //cy.get('button').should('contain', 'Grilled Tofu Salad With Miso Dressing');
    cy.contains('Profile').click();
    // Input Ingredients
    cy.scrollTo(0, 500)
    cy.get('h1').should('contain', "Your Fridge");
    //Chicken
    cy.get('input[placeholder*="Enter Ingredient Name"]').type("Chicken");
    cy.get('input[placeholder*="Quantity"]').type("2");
    cy.contains('Save').click();
    cy.contains('boneless, skinless chicken breasts').click();
    cy.contains('Add').click();
    cy.get('h3').should('contain', 'Boneless, skinless chicken breasts');
    // Salt
    cy.get('input[placeholder*="Enter Ingredient Name"]').type("Salt");
    cy.get('input[placeholder*="Quantity"]').type("2");
    cy.contains('Save').click();
    cy.contains('coarse salt').click();
    cy.contains('Add').click();
    cy.get('h3').should('contain', 'Coarse salt');
    // Cancel the input
    cy.get('input[placeholder*="Enter Ingredient Name"]').type("Pork");
    cy.get('input[placeholder*="Quantity"]').type("2");
    cy.contains('Save').click();
    cy.contains('pork chops').click();
    cy.contains('Cancel').click();
    cy.get('h3').should('not.contain', 'pork chops');
    //Deleting Input
    cy.get('li').contains('Boneless, skinless chicken breasts').parent().find('button').contains('Delete').click();
    //Add Same Element ********** WHAT DO WE WANT ********
  });
  // //needs more work
  it('Price Comparer', () => {
    cy.visit('http://localhost:3001');
    cy.contains('Login').click();
    cy.get('h1').should('contain', 'WhatToCook');
    cy.get('#username').type('colinmanning');
    cy.get('#password').type('cmanning');
    cy.contains('Login').click();
    cy.contains('Price').click();
    cy.get('h1').should('contain', 'Price Comparer');
   // Testing Chicken Value
    cy.get('input[placeholder*="Search for a product..."]').type("Chicken");
    cy.contains('Search').click();
    cy.get('h2').should('contain', 'Heritage Farm');
    cy.get('h2').should('contain', 'Simple Truth');
    cy.get('h2').should('contain', 'Simple Truth Organic');
    cy.get('h2').should('contain', 'Tyson');
    cy.contains('.search-item', 'Tyson').find('p').parent().click();
    cy.get('h2').should('contain', 'Total Price: $4.99');
    cy.contains('Clear').click();
    cy.get('h2').should('contain', 'Total Price: $0');
    // Checking for multiple 
    cy.get('input[placeholder*="Search for a product..."]').clear();
    cy.get('input[placeholder*="Search for a product..."]').type("Chicken");
    cy.contains('Search').click();
    cy.contains('.search-item', 'Tyson').find('p').parent().click();
    cy.get('h2').should('contain', 'Total Price: $4.99');
    cy.get('input[placeholder*="Search for a product..."]').clear();
    cy.get('input[placeholder*="Search for a product..."]').type("Salt");
    cy.contains('Search').click();
    cy.contains('.search-item', 'McCormick').find('p').parent().click();
    cy.contains('McCormick').click();
    cy.get('h2').should('contain', 'Total Price: $7.98');
    // Test PDF
    cy.contains('PDF').click();
    //Checking for unavailable  NEED MORE
    cy.get('input[placeholder*="Search for a product..."]').clear();
    cy.get('input[placeholder*="Search for a product..."]').type("Chicken Apple Sausage");
    cy.contains('Search').click();
    cy.get('div').should('contain', '');
  });
  it('Dietary Page', () => {
    cy.visit('http://localhost:3001'); // Replace with our domain once it is up
    cy.contains('Login').click();
    cy.get('h1').should('contain', 'WhatToCook');
    cy.get('#username').type('colinmanning');
    cy.get('#password').type('cmanning');
    cy.contains('Login').click();
    cy.contains('Dietary').click();
    cy.get('h1').should('contain', 'Dietary Restrictions');
    cy.get('h3').should('contain', 'Select your allergy:');
    // Start with blank slate
    cy.contains('Uncheck all').click();
    cy.contains('Save').click();
    // Check all restrictions are there
    cy.get('div').should('contain', 'EggFree');
    cy.get('div').should('contain', 'Mediterranean');
    cy.get('div').should('contain', 'DairyFree');
    cy.get('div').should('contain', 'GlutenFree');
    cy.get('div').should('contain', 'WheatFree');
    cy.get('div').should('contain', 'PeanutFree');
    cy.get('div').should('contain', 'TreeNutFree');
    cy.get('div').should('contain', 'FishFree');
    cy.get('div').should('contain', 'SoyFree');
    cy.get('div').should('contain', 'ShellfishFree');
    cy.get('div').should('contain', 'PorkFree');
    cy.get('div').should('contain', 'RedMeatFree');
    cy.get('div').should('contain', 'CrustaceanFree');
    cy.get('div').should('contain', 'CeleryFree');
    cy.get('div').should('contain', 'MustardFree');
    cy.get('div').should('contain', 'SesameFree');
    cy.get('div').should('contain', 'LupineFree');
    cy.get('div').should('contain', 'MolluskFree');
    cy.get('div').should('contain', 'Kosher');
    cy.get('div').should('contain', 'SugarConscious');
    cy.get('div').should('contain', 'AlcoholFree');
    cy.get('div').should('contain', 'SulfiteFree');
    cy.get('div').should('contain', 'KetoFriendly');
    cy.get('div').should('contain', 'Paleo');
    cy.get('div').should('contain', 'No oil added');
    cy.get('div').should('contain', 'FODMAPFree');
    cy.get('div').should('contain', 'KidneyFriendly');
    cy.get('div').should('contain', 'ImmunoSupportive');
    cy.get('div').should('contain', 'Low Potassium');
    cy.get('div').should('contain', 'Low Sugar');
    cy.get('div').should('contain', 'Pescatarian');
    cy.get('div').should('contain', 'Vegan');
    cy.get('div').should('contain', 'Vegetarian');
    //Test Clicking Objects
    cy.contains('EggFree').click();
    cy.contains('Mediterranean').click();
    cy.contains('DairyFree').click();
    cy.contains('GlutenFree').click();
    cy.contains('WheatFree').click();
    cy.contains('PeanutFree').click();
    cy.contains('TreeNutFree').click();
    cy.contains('FishFree').click();
    cy.contains('SoyFree').click();
    cy.contains('ShellfishFree').click();
    cy.contains('PorkFree').click();
    cy.contains('RedMeatFree').click();
    cy.contains('CrustaceanFree').click();
    cy.contains('CeleryFree').click();
    cy.contains('MustardFree').click();
    cy.contains('SesameFree').click();
    cy.contains('LupineFree').click();
    cy.contains('MolluskFree').click();
    cy.contains('Kosher').click();
    cy.contains('SugarConscious').click();
    cy.contains('AlcoholFree').click();
    cy.contains('SulfiteFree').click();
    cy.contains('KetoFriendly').click();
    cy.contains('Paleo').click();
    cy.contains('No oil added').click();
    cy.contains('FODMAPFree').click();
    cy.contains('KidneyFriendly').click();
    cy.contains('ImmunoSupportive').click();
    cy.contains('Low Potassium').click();
    cy.contains('Low Sugar').click();
    cy.contains('Pescatarian').click();
    cy.contains('Vegan').click();
    cy.contains('Vegetarian').click();
    cy.contains('Save').click();
    // Check they are all saved
    //cy.get('li').should('contain', 'EggFree');
    cy.get('li').should('contain', 'Mediterranean');
    cy.get('li').should('contain', 'DairyFree');
    cy.get('li').should('contain', 'GlutenFree');
    cy.get('li').should('contain', 'WheatFree');
    cy.get('li').should('contain', 'PeanutFree');
    cy.get('li').should('contain', 'TreeNutFree');
    cy.get('li').should('contain', 'FishFree');
    cy.get('li').should('contain', 'SoyFree');
    cy.get('li').should('contain', 'ShellfishFree');
    cy.get('li').should('contain', 'PorkFree');
    cy.get('li').should('contain', 'RedMeatFree');
    cy.get('li').should('contain', 'CrustaceanFree');
    cy.get('li').should('contain', 'CeleryFree');
    cy.get('li').should('contain', 'MustardFree');
    cy.get('li').should('contain', 'SesameFree');
    cy.get('li').should('contain', 'LupineFree');
    cy.get('li').should('contain', 'MolluskFree');
    cy.get('li').should('contain', 'Kosher');
    cy.get('li').should('contain', 'SugarConscious');
    cy.get('li').should('contain', 'AlcoholFree');
    cy.get('li').should('contain', 'SulfiteFree');
    cy.get('li').should('contain', 'KetoFriendly');
    cy.get('li').should('contain', 'Paleo');
    cy.get('li').should('contain', 'No oil added');
    cy.get('li').should('contain', 'FODMAPFree');
    cy.get('li').should('contain', 'KidneyFriendly');
    cy.get('li').should('contain', 'ImmunoSupportive');
    cy.get('li').should('contain', 'Low Potassium');
    cy.get('li').should('contain', 'Low Sugar');
    cy.get('li').should('contain', 'Pescatarian');
    cy.get('li').should('contain', 'Vegan');
    cy.get('li').should('contain', 'Vegetarian');
    //Uncheck all
    cy.contains('Uncheck all').click();
    cy.contains('Save').click();
  });
  it('Recipe Generator', () => {
    cy.visit('http://localhost:3001'); // Replace with our domain once it is up
    cy.contains('Login').click();
    cy.get('h1').should('contain', 'WhatToCook');
    cy.get('#username').type('colinmanning');
    cy.get('#password').type('cmanning');
    cy.contains('Login').click();
    //Need Dietary Restrictions
    cy.contains('Dietary').click();
    cy.contains('Uncheck all').click();
    cy.contains('Save').click();
    cy.contains('SoyFree').click();
    cy.contains('Save').click();
    cy.contains('Recipe').click();
    // Chicken Stew
    cy.get('input[placeholder*="Search recipes..."]').type("Chicken");
    cy.get('button').should('contain', 'Chicken Stew');
    cy.contains('button', 'Chicken Stew').click();
    cy.get('button').should('contain', 'Bookmark');
    cy.get('h3').should('contain', 'Missing');
    cy.get('h3').should('contain', 'ingredients');
    //Check Ingredients
    cy.get('a').should('contain', 'carrots');
    cy.get('a').should('contain', 'onion');
    cy.get('a').should('contain', 'leek');
    cy.get('a').should('contain', 'green pepper');
    cy.get('a').should('contain', 'kosher salt');
    cy.get('a').should('contain', 'black pepper');
    cy.get('a').should('contain', 'extra virgin olive oil');
    cy.get('a').should('contain', 'white wine');
    cy.get('a').should('contain', 'chicken broth');
    //Click on ingredients
    cy.contains('carrots').click();
    cy.url().should('contain', '/PriceComparer');
    cy.get('input[type="text"]').should('have.value', 'carrots');
    cy.contains('Recipe').click();
    cy.get('input[placeholder*="Search recipes..."]').type("Chicken");
     cy.contains('button', 'Chicken Stew').click();
    cy.contains('onion').click();
    cy.url().should('contain', '/PriceComparer');
    cy.get('input[type="text"]').should('have.value', 'onion');
    cy.contains('Recipe').click();
    cy.get('input[placeholder*="Search recipes..."]').type("Chicken");
     cy.contains('button', 'Chicken Stew').click();
    cy.contains('leek').click();
    cy.url().should('contain', '/PriceComparer');
    cy.get('input[type="text"]').should('have.value', 'leek');
    cy.contains('Recipe').click();
    cy.get('input[placeholder*="Search recipes..."]').type("Chicken");
     cy.contains('button', 'Chicken Stew').click();
    cy.contains('green pepper').click();
    cy.url().should('contain', '/PriceComparer');
    cy.get('input[type="text"]').should('have.value', 'green pepper');
    cy.contains('Recipe').click();
    cy.get('input[placeholder*="Search recipes..."]').type("Chicken");
     cy.contains('button', 'Chicken Stew').click();
    cy.contains('kosher salt').click();
    cy.url().should('contain', '/PriceComparer');
    cy.get('input[type="text"]').should('have.value', 'kosher salt');
    cy.contains('Recipe').click();
    cy.get('input[placeholder*="Search recipes..."]').type("Chicken");
     cy.contains('button', 'Chicken Stew').click();
    cy.contains('black pepper').click();
    cy.url().should('contain', '/PriceComparer');
    cy.get('input[type="text"]').should('have.value', 'black pepper');
    cy.contains('Recipe').click();
    cy.get('input[placeholder*="Search recipes..."]').type("Chicken");
     cy.contains('button', 'Chicken Stew').click();
    cy.contains('extra virgin olive oil').click();
    cy.url().should('contain', '/PriceComparer');
    cy.get('input[type="text"]').should('have.value', 'extra virgin olive oil');
    cy.contains('Recipe').click();
    cy.get('input[placeholder*="Search recipes..."]').type("Chicken");
     cy.contains('button', 'Chicken Stew').click();
    cy.contains('white wine').click();
    cy.url().should('contain', '/PriceComparer');
    cy.get('input[type="text"]').should('have.value', 'white wine');
    cy.contains('Recipe').click();
    cy.get('input[placeholder*="Search recipes..."]').type("Chicken");
     cy.contains('button', 'Chicken Stew').click();
    cy.contains('chicken broth').click();
    cy.url().should('contain', '/PriceComparer');
    cy.get('input[type="text"]').should('have.value', 'chicken broth');
    cy.contains('Recipe').click();
  });
  it('Contact', () => {
    cy.visit('http://localhost:3001'); // Replace with our domain once it is up
    cy.contains('Login').click();
    cy.get('h1').should('contain', 'WhatToCook');
    cy.get('#username').type('colinmanning');
    cy.get('#password').type('cmanning');
    cy.contains('Login').click();
    cy.contains('Contact').click();
    //Send Message
    cy.get('h1').should('contain', 'Contact Us!');
    cy.get('#name').type('Name');
    cy.get('#email').type('name@email.com');
    cy.get('#subject').type('Testing');
    cy.get('#text').type('Testing Testing 123');
    cy.contains('Submit').click();
  });
  it('Contact', () => {
    cy.visit('http://localhost:3001'); // Replace with our domain once it is up
    cy.contains('Login').click();
    cy.get('h1').should('contain', 'WhatToCook');
    cy.get('#username').type('colinmanning');
    cy.get('#password').type('cmanning');
    cy.contains('Login').click();
    cy.contains('Logout').click();
    cy.url().should('contain','http://localhost:3001' );
  });
    // END New for T2
 });
