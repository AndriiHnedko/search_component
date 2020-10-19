import React, { memo } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

import { useDispatch, useSelector } from "react-redux";
import { setIngredients, setTypes } from "../../reducers/search/actions";
import { RootStateType } from "../../reducers";
import { FilterTagItemPropsType } from "./types";

export default memo(() => {
  const searchState = useSelector((state: RootStateType) => state.search);
  const chosenTypes = searchState.types;
  const chosenIngredients = searchState.ingredients;
  return (
    <View>
      <View style={styles.itemWrapper}>
        {chosenTypes.map((type, index) => (
          <TagItem
            tagName={type}
            removeTag={setTypes}
            key={`tagType${index}`}
            colorContainer={"#CCF600"}
            colorClose={"#84A000"}
          />
        ))}
      </View>
      <View style={styles.itemWrapper}>
        {chosenIngredients.map((ingredient, index) => (
          <TagItem
            tagName={ingredient}
            removeTag={setIngredients}
            key={`tagType${index}`}
            colorContainer={"#64AA2B"}
            colorClose={"#3A6F0E"}
          />
        ))}
      </View>
    </View>
  );
});

const TagItem: React.FC<FilterTagItemPropsType> = ({
  tagName,
  removeTag,
  colorClose,
  colorContainer,
}) => {
  const dispatch = useDispatch();
  const onPressTag = (tagName: string) => dispatch(removeTag(false, tagName));
  return (
    <View
      style={{
        ...styles.filterTagWrapper,
        backgroundColor: colorContainer,
      }}
    >
      <TouchableOpacity
        onPress={() => onPressTag(tagName)}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <Text style={styles.tagTitle}>{tagName}</Text>
        <Icon
          name="close"
          size={18}
          color="black"
          style={{ backgroundColor: colorClose, borderRadius: 10 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 3,
    marginHorizontal: "4%",
  },
  filterTagWrapper: {
    marginVertical: 3,
    marginHorizontal: "1%",
    padding: 1,
    borderRadius: 15,
    paddingLeft: 10,
  },
  tagTitle: {
    fontSize: 16,
    paddingRight: 3,
  },
});
