import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { getRecipe } from "../../../reducers/recipe/actions";
import { QuickSearchItemPropsType } from "../types";
import { RootStateType } from "../../../reducers";

export default memo<QuickSearchItemPropsType>(({ item, navigation }) => {
  const dispatch = useDispatch();
  const { theme, language } = useSelector(
    (state: RootStateType) => state.settings
  );
  const onClickQuickSearch = async () => {
    if (language) dispatch(getRecipe(item.id, language));
    navigation.navigate("RecipeContainer");
  };
  return (
    <TouchableOpacity onPress={onClickQuickSearch} style={styles.itemWrapper}>
      <Text style={{ ...styles.itemText, ...theme.text }}>{item.title}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  itemWrapper: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    height: 30,
  },
  itemText: {
    fontSize: 14,
  },
});
