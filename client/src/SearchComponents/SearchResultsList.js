import React, { useState, useEffect } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { RecipeGenerator } from "../RecipeGenerator";

export const SearchResultsList = ({ results, inputValue, onIngredientSelect, isTheSearchFocused }) => {
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [recipeToShow, setRecipeToShow] = useState(null);
  const [response, setResponse] = useState([]);
  const [bookmarks, setBookmarks] = useState({});
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [hasMatchingRecipes, setHasMatchingRecipes] = useState(false); // Track if any matching recipes were found
  const [showOnFocus, setShowOnFocus] = useState(false);

  const handleButtonClick = (recipeName) => {
    setShowSearchResult(true);
    setRecipeToShow(recipeName);
    setResponse(inputValue);
  };

  useEffect(() => {
    if (inputValue !== response) {
      setShowSearchResult(false);
      setResponse(inputValue);
    }
  }, [inputValue, response]);

  const handleIngredientClick = (ingredient) => {
    setSelectedIngredient(ingredient);
    onIngredientSelect(ingredient);
  };

  const isBookmark = async (recipeID) => {
    try {
      const response = await Axios.post(
        "http://localhost:3000/users/isBookmarked",
        {
          data: { recipeID },
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );
      return response.data.full === 1;
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return false;
    }
  };

  const toggleBookmark = async (recipeID) => {
    try {
      const isCurrentlyBookmarked = await isBookmark(recipeID);

      if (!isCurrentlyBookmarked) {
        await Axios.post(
          "http://localhost:3000/users/bookmark_recipe",
          {
            data: { recipeID },
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${Cookies.get("userToken")}`,
            },
          }
        );
        console.log("Recipe bookmarked successfully!");
      } else {
        await Axios.post(
          "http://localhost:3000/users/unbookmark_recipe",
          {
            data: { recipeID },
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${Cookies.get("userToken")}`,
            },
          }
        );
        console.log("Recipe unbookmarked successfully!");
      }

      // Update bookmark status after toggling
      setBookmarks((prevBookmarks) => ({
        ...prevBookmarks,
        [recipeID]: !isCurrentlyBookmarked,
      }));
    } catch (error) {
      console.error("Error bookmarking/unbookmarking recipe:", error);
    }
  };

  // Check if any matching recipes were found
  useEffect(() => {
    const hasMatch = results.some(recipe =>
      recipe.recipeName.toLowerCase().includes(inputValue.toLowerCase())
    );
    setHasMatchingRecipes(hasMatch);
    if(inputValue== "") {
      setHasMatchingRecipes(undefined);
    }
    if(isTheSearchFocused == false){
      setTimeout(() => {
        setShowOnFocus(false);
      }, 200);
    }
    else{
      setShowOnFocus(true);
    }
  }, [results, inputValue, isTheSearchFocused]);

  return (
    <div className="results-list">
      <div className="search-results-container">
        <div className="search-results">
          {/* SHOWS RESULTS OF THE SEARCH */}
          {(results.length > 0 && showSearchResult === false 
          && hasMatchingRecipes !== undefined && showOnFocus == true) && (
            results.map((recipe, index) => (
              recipe.recipeName.toLowerCase().includes(inputValue.toLowerCase()) &&
              (<div key={index}>
                <button
                  className="search-result-button"
                  onClick={() => handleButtonClick(recipe.recipeName)}>
                  {recipe.recipeName}
                </button>
              </div>)
            ))
          )}
          {(!hasMatchingRecipes && inputValue !== "") && (
            <p>No results found or not within dietary restriction</p>
          )}
        </div>
      </div>


      {/* IF YOU CLICK ON A RECIPE IT SHOWS IT HERE */}
      {showSearchResult && (
        <div>
          <br />
          {results.map((recipe) => {
            if (recipe.recipeName === recipeToShow) {
              return (
                <li className="recipe-full-space" key={recipe.recipeID}>
                  <button className="bookmark-button" onClick={() => toggleBookmark(recipe.recipeID)}>
                    {bookmarks[recipe.recipeID] ?
                      (<img src=".././images/recipe_generator/bookmark_icon.png" alt="Unbookmark" className="bookmark-icon" />) :
                      (<img src=".././images/recipe_generator/unbookmark_icon.png" alt="Bookmark" className="bookmark-icon" />)
                    }
                  </button>
                  <button className="recipe-title-search">
                    {recipe.recipeName}
                  </button>

                  <br />
                  Missing {recipe.missingIngredients.length} ingredients:
                  <ul>
                    {recipe.missingIngredients.map((ingredient, idx) => (
                      <React.Fragment key={idx}>
                        {idx > 0 && ", "}
                        {<Link
                          to="http://localhost:3001/PriceComparer"
                          onClick={() => handleIngredientClick(ingredient)}>
                          {ingredient}
                        </Link>}
                      </React.Fragment>
                    ))}
                  </ul>

                  <h4 className="separation-line-recipe-to-instructions"></h4>
                  <p className="instructions">{recipe.instructions}</p>
                  <p className="estimated-time-text">Estimated time:</p>
                  <p className="estimated-time-time">{recipe.total_time} mins</p>

                  <br />
                </li>

              );
            }
            return null;
          })}

        </div>
      )}
    </div>
  );
};

export default SearchResultsList;
