import React, { useState, useEffect } from "react";

import { SearchBar } from "./SearchComponents/SearchBar";
import { SearchResultsList } from "./SearchComponents/SearchResultsList";

function Search( { onIngredientSelect, selectedRecipe, recipeListWhenLoadingThePage } ) {
  const [results, setResults] = useState([]);
  const [inputedValue, setInputedValue] = useState("");
  const [ingredientSelected, setIngredientSelected] = useState(null);
  const [selectedRecipeFromProfile, setSelectedRecipeFromProfile] = useState('');
  const [isFocus, setIsFocus] = useState();

  useEffect(() => {
    if (ingredientSelected !== null) {
      // Reset selectedIngredient after redirection
      ingredientSelected(null);
    }
    if (selectedRecipe !== ""){
      setSelectedRecipeFromProfile(selectedRecipe);
    }
  }, [ingredientSelected, selectedRecipeFromProfile]);

  return (
    <div>
      <div>
      <SearchBar 
        setResults={setResults} 
        inputValue={setInputedValue}
        selectedRecipe={selectedRecipeFromProfile}
        isItFocused={setIsFocus}/>
        <SearchResultsList
          results={recipeListWhenLoadingThePage}
          inputValue={inputedValue}
          onIngredientSelect={onIngredientSelect} // Pass onIngredientSelect to SearchResultsList
          isTheSearchFocused={isFocus}
        />
      </div>
    </div>
  );
}

export default Search;
