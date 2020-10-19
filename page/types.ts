import { RouteProp } from "@react-navigation/native";
import { RootDrawerParamListType } from "../../navigation/types";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { ButtonThemeType, TextThemeType, ThemeType } from "../../themes/types";
import { ItemsStateType } from "../../reducers/dishesList/types";
import { RecipeType } from "../../reducers/recipe/types";

export type SearchPropsType = {
  route: RouteProp<RootDrawerParamListType, "Search">;
  navigation: DrawerNavigationProp<
    RootDrawerParamListType,
    "Search" | "RecipeContainer"
  >;
};

export type SearchInputPropsType = {
  inputValue: string;
  styleText: TextThemeType;
  setInputValue: (value: string) => void;
};
export type SearchButtonPropsType = {
  value: string;
  style: ButtonThemeType;
  onPressSearchButton: () => void;
};

export type ShowSearchItemsPropsType = {
  route: RouteProp<RootDrawerParamListType, "ShowSearchItems">;
  navigation: DrawerNavigationProp<RootDrawerParamListType, "SubCategory">;
  theme: ThemeType;
  searchData: Array<ItemsStateType>;
  language: string | null;
  loading: boolean;
  types: Array<string>;
  ingredients: Array<string>;
  getSearchData: (offset: number, title: string, language: string) => void;
  setData: (data: Array<RecipeType>) => void;
  cleanSearchData: () => void;
  cleanData: () => void;
  setSearchLoading: (loading: boolean) => void;
};

export type QuickSearchPropsType = {
  inputValue: string;
  navigation: DrawerNavigationProp<
    RootDrawerParamListType,
    "Search" | "RecipeContainer"
  >;
  data: Array<ItemsStateType>;
  language: string | null;
  theme: ThemeType;
  getQuickSearchData: (offset: number, title: string, language: string) => void;
  cleanQuickSearchData: () => void;
};

export type QuickSearchItemPropsType = {
  navigation: DrawerNavigationProp<
    RootDrawerParamListType,
    "Search" | "RecipeContainer"
  >;
  item: RecipeType;
};

export type FilterItemPropsType = {
  title: string;
  checked: boolean;
  style: TextThemeType;
  addType: (checked: boolean, title: string) => void;
};

export type FilterTagItemPropsType = {
  tagName: string;
  colorContainer: string;
  colorClose: string;
  removeTag: (event: boolean, tagName: string) => void;
};
