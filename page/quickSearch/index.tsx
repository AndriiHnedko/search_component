import React from "react";
import { View, StyleSheet, Image } from "react-native";

import { connect } from "react-redux";
import {
  cleanQuickSearchData,
  getQuickSearchData,
} from "../../../reducers/search/actions";

import debounce from "lodash.debounce";
import { LargeList } from "react-native-largelist-v3";

import QuickSearchItem from "./quickSearchItem";
import { RootStateType } from "../../../reducers";
import { QuickSearchPropsType } from "../types";
// @ts-ignore
import cookImage from "../../../../assets/searchPovar.png";

export class QuickSearch extends React.PureComponent<QuickSearchPropsType> {
  getQuickSearchData = debounce((inputValue) => {
    const { props } = this;
    props.cleanQuickSearchData();
    props.getQuickSearchData(0, inputValue, props.language as string);
  }, 800);

  componentDidUpdate(prevProps: QuickSearchPropsType) {
    const { props } = this;
    if (
      props.inputValue.length > 3 &&
      prevProps.inputValue !== props.inputValue
    ) {
      this.getQuickSearchData(props.inputValue);
    }
    if (props.inputValue.length === 0 && props.data[0].items.length !== 0) {
      props.cleanQuickSearchData();
    }
  }

  render() {
    const { props } = this;
    const { quickSearch } = props.theme;
    if (props.data[0].items.length !== 0) {
      return (
        <View
          style={{
            ...styles.searchBlock,
            ...quickSearch,
          }}
        >
          <LargeList
            data={props.data}
            heightForIndexPath={() => 30}
            renderIndexPath={this._renderIndexPath}
            style={{ ...props.theme.quickSearch }}
          />
        </View>
      );
    }
    return (
      <View style={styles.sadCock}>
        <Image source={cookImage} style={{ width: 160, height: 300 }} />
      </View>
    );
  }
  _renderIndexPath = (props: { section: number; row: number }) => {
    const item = this.props.data[props.section].items[props.row];
    return <QuickSearchItem navigation={this.props.navigation} item={item} />;
  };
}

const styles = StyleSheet.create({
  searchBlock: {
    width: "90%",
    marginHorizontal: "5%",
    marginTop: "2%",
    maxHeight: "68%",
    overflow: "hidden",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 11,
    paddingBottom: 5,
  },
  sadCock: {
    width: "50%",
    alignItems: "center",
    marginHorizontal: "25%",
    marginTop: 40,
  },
});

const mapStateToProps = (state: RootStateType) => {
  return {
    data: state.search.quickSearchData,
    language: state.settings.language,
    theme: state.settings.theme,
  };
};

export default connect(mapStateToProps, {
  getQuickSearchData,
  cleanQuickSearchData,
})(QuickSearch);
