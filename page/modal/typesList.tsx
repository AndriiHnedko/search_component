import React, { memo } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { List } from "react-native-paper";
import { LargeList } from "react-native-largelist-v3";

import { useDispatch, useSelector } from "react-redux";
import { changeListName, setTypes } from "../../../reducers/search/actions";

import FilterItem from "./filterItem";

import i18n from "i18n-js";
import { RootStateType } from "../../../reducers";

export default memo(() => {
  const dispatch = useDispatch();
  const { app, search, settings } = useSelector(
    (state: RootStateType) => state
  );
  const categoryNames = app.categoryNames;
  const chosenTypes = search.types;
  const chosenList = search.listName;
  const theme = settings.theme;
  const listName = "types";

  const onClickCategoriesList = () => {
    chosenList === listName
      ? dispatch(changeListName(""))
      : dispatch(changeListName(listName));
  };
  const data = [{ items: Object.values(categoryNames) }];

  const _renderIndexPath = (props: { section: number; row: number }) => {
    const item = data[props.section].items[props.row];
    return (
      <FilterItem
        checked={chosenTypes.includes(item)}
        addType={setTypes}
        title={item}
        style={theme.text}
      />
    );
  };

  return (
    <List.Section style={styles.sectionContainer}>
      <List.Accordion
        title={i18n.t("type")}
        onPress={onClickCategoriesList}
        expanded={chosenList === listName}
        titleStyle={{ ...theme.text }}
      >
        <LargeList
          style={{ ...styles.listContainer, ...theme.modal }}
          data={data}
          heightForIndexPath={() => 30}
          renderIndexPath={_renderIndexPath}
        />
      </List.Accordion>
    </List.Section>
  );
});

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  listContainer: {
    height: height * 0.65,
    paddingRight: "3%",
    paddingLeft: "4.3%",
  },
  sectionContainer: {
    marginVertical: 0,
  },
});
