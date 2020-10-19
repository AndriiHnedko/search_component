import React, { memo, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { useSelector } from "react-redux";
import { Portal, Provider } from "react-native-paper";

import FirstHeader from "../../components/headerComponent/firstHeader";
import QuickSearch from "./quickSearch";
import FilterModal from "./modal";
import SelectedFilters from "./filterTag";
import ShowSearchItems from "./showSearchItems";

import i18n from "i18n-js";
import { RootStateType } from "../../reducers";
import {
  SearchButtonPropsType,
  SearchInputPropsType,
  SearchPropsType,
} from "./types";

export default memo<SearchPropsType>(({ navigation, route }) => {
  const [inputValue, setInputValue] = useState("");
  const { mainContainer, text, button } = useSelector(
    (state: RootStateType) => state.settings.theme
  );

  useEffect(() => {
    setInputValue("");
  }, [route.params]);

  const onPressSearchButton = () => {
    navigation.navigate("ShowSearchItems", {
      value: inputValue,
    });
    setInputValue("");
  };

  return (
    <Provider>
      <Portal>
        <FilterModal />
        <View
          style={{
            ...styles.container,
            ...mainContainer,
          }}
        >
          <FirstHeader
            title={i18n.t("search")}
            navigation={navigation}
            search={false}
            searchFilter={true}
          />
          <SearchInput
            inputValue={inputValue}
            styleText={text}
            setInputValue={setInputValue}
          />
          <SelectedFilters />
          <QuickSearch inputValue={inputValue} navigation={navigation} />
          <SearchButton
            style={button}
            onPressSearchButton={onPressSearchButton}
            value={inputValue}
          />
        </View>
      </Portal>
    </Provider>
  );
});

const SearchInput: React.FC<SearchInputPropsType> = memo(
  ({ inputValue, styleText, setInputValue }) => {
    const onChangeInput = (event: string) => {
      setInputValue(event);
    };

    return (
      <View style={styles.inputWrapper}>
        <TextInput
          style={{ ...styles.input, ...styleText }}
          onChangeText={onChangeInput}
          placeholder={i18n.t("searchPlaceholder")}
          value={inputValue}
          placeholderTextColor={"#757575"}
        />
      </View>
    );
  }
);

const SearchButton: React.FC<SearchButtonPropsType> = memo(
  ({ value, style, onPressSearchButton }) => {
    return (
      <View style={styles.searchButtonWrapper}>
        {value.length > 1 && (
          <TouchableOpacity
            onPress={onPressSearchButton}
            style={{ ...styles.searchButton, ...style.container }}
          >
            <Text style={{ ...styles.searchButtonText, ...style.text }}>
              {i18n.t("search")}
            </Text>
          </TouchableOpacity>
        )}
        {value.length < 2 && (
          <View
            style={{
              ...styles.searchButton,
              ...styles.deactivateSearchButton,
            }}
          >
            <Text
              style={{
                ...styles.searchButtonText,
                color: "rgba(14, 2, 2, 0.4)",
              }}
            >
              {i18n.t("search")}
            </Text>
          </View>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  inputWrapper: {
    width: "90%",
    marginHorizontal: "5%",
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 1,
    borderBottomColor: "#dedede",
    width: "100%",
    fontSize: 16,
    marginBottom: 5,
  },
  searchButtonWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
    position: "absolute",
  },
  searchButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    bottom: 0,
  },
  deactivateSearchButton: {
    backgroundColor: "rgba(34,34,34,0.4)",
  },
  searchButtonText: {
    fontSize: 18,
    fontWeight: "700",
  },
});
