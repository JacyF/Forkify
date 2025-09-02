import * as model from './model.js';
import recipeView from './views/recipeView.js';


import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

if (module.hot) {
  module.hot.accept();
}

// const recipeContainer = document.querySelector('.recipe');


// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////


const controlRecipes = async function () {
  try {

    const id = window.location.hash.slice(1);
    if (!id) return;

    // LOADING SPINNER
    recipeView.renderSpinner();

    // 1. LOADING RECEPE
    await model.loadRecipe(id);
    const {
      recipe
    } = model.state

    // 2. RENDERING RECEPE
    recipeView.render(model.state.recipe)
  } catch (err) {
    recipeView.renderError();
  }
}

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();


    // 1. GET SEARCH QUERY
    const query = searchView.getQuery();
    if (!query) return;

    // 2. GET SEARCH RESULTS
    await model.loadSearchResults(query);

    // 3. RENDER RESULTS
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage(1));

    // 4. RENDER INITIAL PAGINATION
    paginationView.render(model.state.search)
  } catch (err) {
    console.log(err);
  }
}

const controlPag = function (goToPage) {
  // 1. RENDER  NEW RESULTS
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2. RENDER NEW PAGINATION
  paginationView.render(model.state.search)
}

const init = function () {
  recipeView.aaddHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerCick(controlPag);
}
init();