import React, { memo, useState } from "react";
import { View, StyleSheet, TextInput, Dimensions } from "react-native";
import { List } from "react-native-paper";
import { LargeList } from "react-native-largelist-v3";

import { useDispatch, useSelector } from "react-redux";
import {
  changeListName,
  setIngredients,
} from "../../../reducers/search/actions";

import Filters from "../../../actions/filters";
import FilterItem from "./filterItem";

import i18n from "i18n-js";
import { RootStateType } from "../../../reducers";

export default memo(() => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const { app, search, settings } = useSelector(
    (state: RootStateType) => state
  );
  const ingredients = app.ingredients;
  const chosenIngredients = search.ingredients;
  const chosenList = search.listName;
  const theme = settings.theme;
  const listName = "ingredients";

  const onClickIngredientsList = () => {
    chosenList === listName
      ? dispatch(changeListName(""))
      : dispatch(changeListName(listName));
  };

  const filteredList = Filters.filterIngredientsByInputValue(
    inputValue,
    ingredients
  );

  const data = [{ items: [...filteredList] }];

  const _renderIndexPath = (props: { section: number; row: number }) => {
    const item = data[props.section].items[props.row];
    return (
      <FilterItem
        checked={chosenIngredients.includes(item.ingredient)}
        addType={setIngredients}
        title={item.ingredient}
        style={theme.text}
      />
    );
  };

  return (
    <View>
      <List.Section style={styles.sectionContainer}>
        <List.Accordion
          title={i18n.t("ingredients")}
          onPress={onClickIngredientsList}
          expanded={chosenList === listName}
          titleStyle={{ ...theme.text }}
        >
          <TextInput
            value={inputValue}
            onChangeText={setInputValue}
            style={{ ...styles.input, ...theme.text }}
            placeholder={i18n.t("ingredientPlaceholder")}
            placeholderTextColor={"#757575"}
          />
          <LargeList
            style={{ ...styles.listContainer, ...theme.modal }}
            data={data}
            heightForIndexPath={() => 30}
            renderIndexPath={_renderIndexPath}
          />
        </List.Accordion>
      </List.Section>
    </View>
  );
});

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  input: {
    borderColor: "gray",
    borderBottomWidth: 1,
    borderBottomColor: "#dedede",
    marginRight: "5%",
    marginLeft: "4.3%",
    marginBottom: 10,
  },
  listContainer: {
    height: height * 0.65,
    paddingRight: "3%",
    paddingLeft: "4.3%",
  },
  sectionContainer: {
    marginVertical: 0,
  },
});
