import React, { memo } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { useDispatch } from "react-redux";
import { FilterItemPropsType } from "../types";

export default memo<FilterItemPropsType>(
  ({ title, checked, style, addType }) => {
    const dispatch = useDispatch();
    const onCheck = () => {
      dispatch(addType(!checked, title));
    };
    return (
      <TouchableOpacity onPress={onCheck} style={styles.container}>
        <Text style={{ ...style }}>{title}</Text>
        <CheckBox
          value={checked}
          tintColors={{ true: style.color, false: style.color }}
          onChange={onCheck}
        />
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 1,
    justifyContent: "space-between",
    alignItems: "center",
    height: 30,
  },
});
