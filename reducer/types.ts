import { CategoryNamesType } from "../home/types";
import { ItemsStateType } from "../dishesList/types";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootStateType } from "../index";
import { RecipeType } from "../recipe/types";

export const SET_SEARCH_DATA = "SEARCH/SET_SEARCH_DATA";
export const CLEAN_SEARCH_DATA = "SEARCH/CLEAN_SEARCH_DATA";

export const SET_QUICK_SEARCH_DATA = "SEARCH/SET_QUICK_SEARCH_DATA ";
export const CLEAN_QUICK_SEARCH_DATA = "SEARCH/CLEAN_QUICK_SEARCH_DATA";

export const SHOW_MODAL = "SEARCH/SHOW_MODAL";
export const HIDE_MODAL = "SEARCH/HIDE_MODAL";

export const SET_LIST_NAME = "SEARCH/SET_LIST_NAME";
export const SET_TYPE = "SEARCH/SET_TYPE";
export const SET_INGREDIENT = "SEARCH/SET_INGREDIENT";
export const SET_CATEGORY_NAMES = "SEARCH/SET_CATEGORY_NAMES";

export const FILTER_QUICK_DATA = "SEARCH/FILTER_QUICK_DATA";
export const SET_LOADING = "SEARCH/SET_LOADING";

export type ListNameType = "" | "ingredients" | "types";

type SetSearchDataActionType = {
  type: typeof SET_SEARCH_DATA;
  searchData: Array<RecipeType>;
};

type CleanSearchDataActionType = {
  type: typeof CLEAN_SEARCH_DATA;
};

type SetQuickSearchDataActionType = {
  type: typeof SET_QUICK_SEARCH_DATA;
  quickSearchData: Array<RecipeType>;
};

type CleanQuickSearchActionType = {
  type: typeof CLEAN_QUICK_SEARCH_DATA;
};

type SetShowModalActionType = {
  type: typeof SHOW_MODAL;
};

type SetHideModalActionType = {
  type: typeof HIDE_MODAL;
};

type ChangeTypesActionType = {
  type: typeof SET_TYPE;
  event: boolean;
  typeItem: string;
};

type ChangeIngredientsActionType = {
  type: typeof SET_INGREDIENT;
  event: boolean;
  ingredient: string;
};

type FilterQuickDataActionType = {
  type: typeof FILTER_QUICK_DATA;
};

type SetListNameActionType = {
  type: typeof SET_LIST_NAME;
  name: ListNameType;
};

type SetCategoryNamesToSearchActionType = {
  type: typeof SET_CATEGORY_NAMES;
  category: CategoryNamesType;
};

type SetLoadingActionType = {
  type: typeof SET_LOADING;
  loading: boolean;
};

export type SearchStateType = {
  searchData: Array<ItemsStateType>;
  quickSearchData: Array<ItemsStateType>;
  pureQuickSearchData: Array<ItemsStateType>;
  modal: boolean;
  types: Array<string>;
  ingredients: Array<string>;
  listName: ListNameType;
  categoryNames: CategoryNamesType;
  loading: boolean;
};

export type SearchActionTypes =
  | SetSearchDataActionType
  | CleanSearchDataActionType
  | SetQuickSearchDataActionType
  | CleanQuickSearchActionType
  | SetShowModalActionType
  | SetHideModalActionType
  | ChangeTypesActionType
  | ChangeIngredientsActionType
  | FilterQuickDataActionType
  | SetListNameActionType
  | SetCategoryNamesToSearchActionType
  | SetLoadingActionType;

export type SearchThunkType = ThunkAction<
  Promise<void>,
  RootStateType,
  {},
  SearchActionTypes
>;

export type SearchDispatchType = ThunkDispatch<{}, {}, SearchActionTypes>;
