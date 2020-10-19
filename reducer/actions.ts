import { Home } from "../../actions/app";
import toast from "../../components/toast/toast";
import {
  CLEAN_QUICK_SEARCH_DATA,
  CLEAN_SEARCH_DATA,
  FILTER_QUICK_DATA,
  HIDE_MODAL,
  ListNameType,
  SearchActionTypes,
  SearchDispatchType,
  SearchThunkType,
  SET_CATEGORY_NAMES,
  SET_INGREDIENT,
  SET_LIST_NAME,
  SET_LOADING,
  SET_QUICK_SEARCH_DATA,
  SET_SEARCH_DATA,
  SET_TYPE,
  SHOW_MODAL,
} from "./types";
import { CategoryNamesType } from "../home/types";
import { RecipeType } from "../recipe/types";

const setSearchData = (searchData: Array<RecipeType>): SearchActionTypes => ({
  type: SET_SEARCH_DATA,
  searchData,
});
export const cleanSearchData = (): SearchActionTypes => ({
  type: CLEAN_SEARCH_DATA,
});

const setQuickSearchData = (
  quickSearchData: Array<RecipeType>
): SearchActionTypes => ({ type: SET_QUICK_SEARCH_DATA, quickSearchData });
export const cleanQuickSearchData = (): SearchActionTypes => ({
  type: CLEAN_QUICK_SEARCH_DATA,
});

export const showModal = (): SearchActionTypes => ({ type: SHOW_MODAL });
export const hideModal = (): SearchActionTypes => ({ type: HIDE_MODAL });

const changeTypes = (event: boolean, typeItem: string): SearchActionTypes => ({
  type: SET_TYPE,
  typeItem,
  event,
});
const changeIngredients = (
  event: boolean,
  ingredient: string
): SearchActionTypes => ({
  type: SET_INGREDIENT,
  ingredient,
  event,
});

const filterQuickData = (): SearchActionTypes => ({ type: FILTER_QUICK_DATA });

export const changeListName = (name: ListNameType): SearchActionTypes => ({
  type: SET_LIST_NAME,
  name,
});
export const setCategoryNamesToSearch = (
  category: CategoryNamesType
): SearchActionTypes => ({
  type: SET_CATEGORY_NAMES,
  category,
});

export const setSearchLoading = (loading: boolean): SearchActionTypes => ({
  type: SET_LOADING,
  loading,
});

export const getSearchData = (
  offset: number,
  title: string,
  language: string
): SearchThunkType => async (dispatch) => {
  try {
    let data = await Home.searchDish(offset, title, language);
    dispatch(setSearchData(data));
  } catch (error) {
    toast(error.message);
  }
};

export const getQuickSearchData = (
  offset: number,
  title: string,
  language: string
): SearchThunkType => async (dispatch) => {
  try {
    let data = await Home.searchDish(offset, title, language);
    dispatch(setQuickSearchData(data));
    dispatch(filterQuickData());
  } catch (error) {
    toast(error.message);
  }
};

export const setTypes = (event: boolean, typeItem: string) => (
  dispatch: SearchDispatchType
) => {
  dispatch(changeTypes(event, typeItem));
  dispatch(filterQuickData());
};

export const setIngredients = (event: boolean, ingredient: string) => (
  dispatch: SearchDispatchType
) => {
  dispatch(changeIngredients(event, ingredient));
  dispatch(filterQuickData());
};
