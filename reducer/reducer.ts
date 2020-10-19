import Filters from "../../actions/filters";
import {
  CLEAN_QUICK_SEARCH_DATA,
  CLEAN_SEARCH_DATA,
  FILTER_QUICK_DATA,
  HIDE_MODAL,
  SearchActionTypes,
  SearchStateType,
  SET_CATEGORY_NAMES,
  SET_INGREDIENT,
  SET_LIST_NAME,
  SET_LOADING,
  SET_QUICK_SEARCH_DATA,
  SET_SEARCH_DATA,
  SET_TYPE,
  SHOW_MODAL,
} from "./types";
import {RecipeType} from "../recipe/types";

const initialState: SearchStateType = {
  searchData: [{ items: [] }],
  quickSearchData: [{ items: [] }],
  pureQuickSearchData: [{ items: [] }],
  modal: false,
  types: [],
  ingredients: [],
  listName: "",
  categoryNames: {},
  loading: true,
};

export const search = (state = initialState, action: SearchActionTypes) => {
  const filterData = (data: Array<RecipeType>) =>
    state.types.length !== 0
      ? [...Filters.filterByTypes(data, state.categoryNames, state.types)]
      : state.ingredients.length !== 0
      ? [...Filters.filterByIngredients(data, state.ingredients)]
      : data;
  switch (action.type) {
    case SET_SEARCH_DATA:
      return {
        ...state,
        searchData: [
          {
            items: [
              ...state.searchData[0].items,
              ...filterData(action.searchData),
            ],
          },
        ],
        loading: false,
      };
    case CLEAN_SEARCH_DATA:
      return {
        ...state,
        searchData: [{ items: [] }],
      };
    case SET_QUICK_SEARCH_DATA:
      return {
        ...state,
        pureQuickSearchData: [
          {
            items: [
              ...state.pureQuickSearchData[0].items,
              ...action.quickSearchData,
            ],
          },
        ],
      };
    case FILTER_QUICK_DATA:
      return {
        ...state,
        quickSearchData: [
          { items: filterData(state.pureQuickSearchData[0].items) },
        ],
      };
    case CLEAN_QUICK_SEARCH_DATA:
      return {
        ...state,
        pureQuickSearchData: [{ items: [] }],
        quickSearchData: [{ items: [] }],
      };
    case SHOW_MODAL:
      return {
        ...state,
        modal: true,
      };
    case HIDE_MODAL:
      return {
        ...state,
        modal: false,
      };
    case SET_TYPE:
      return {
        ...state,
        types: action.event
          ? [...state.types, action.typeItem]
          : state.types
              .slice(0, state.types.indexOf(action.typeItem))
              .concat(
                state.types.slice(state.types.indexOf(action.typeItem) + 1)
              ),
      };
    case SET_INGREDIENT:
      return {
        ...state,
        ingredients: action.event
          ? [...state.ingredients, action.ingredient]
          : state.ingredients
              .slice(0, state.ingredients.indexOf(action.ingredient))
              .concat(
                state.ingredients.slice(
                  state.ingredients.indexOf(action.ingredient) + 1
                )
              ),
      };
    case SET_LIST_NAME:
      return {
        ...state,
        listName: action.name,
      };
    case SET_CATEGORY_NAMES:
      return {
        ...state,
        categoryNames: action.category,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};
