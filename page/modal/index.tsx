import React, { memo, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Modal, Portal } from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../../reducers/search/actions";

import TypesList from "./typesList";
import IngredientsList from "./ingredientsList";
import { RootStateType } from "../../../reducers";

export default memo(() => {
  const theme = useSelector((state: RootStateType) => state.settings.theme);
  const modalState = useSelector((state: RootStateType) => state.search.modal);
  const dispatch = useDispatch();
  const onDismiss = useCallback(() => dispatch(hideModal()), [dispatch]);
  return (
    <Portal>
      <Modal visible={modalState} onDismiss={onDismiss}>
        <View
          style={{
            ...styles.modalWrapper,
            ...theme.modal,
          }}
        >
          <TypesList />
          <IngredientsList />
        </View>
      </Modal>
    </Portal>
  );
});

const styles = StyleSheet.create({
  modalWrapper: {
    marginHorizontal: "5%",
  },
});
