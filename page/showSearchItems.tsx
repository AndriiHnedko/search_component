import React from "react";

import { connect } from "react-redux";
import {
  cleanSearchData,
  getSearchData,
  setSearchLoading,
} from "../../reducers/search/actions";
import { cleanData, setData } from "../../reducers/dishesList/actions";

import SubCategory from "../subCategory";
import i18n from "i18n-js";
import { RootStateType } from "../../reducers";
import { ShowSearchItemsPropsType } from "./types";

export class ShowSearchItems extends React.PureComponent<
  ShowSearchItemsPropsType
> {
  componentDidMount() {
    this.initNewData();
  }

  getData = (offset: number, id: number | string, language: string) => {
    const { props } = this;
    if (typeof id === "string") {
      props.getSearchData(offset, id, language);
    }
  };

  initNewData = () => {
    const { props } = this;
    if (props.language) {
      props.cleanData();
      props.cleanSearchData();
      props.setSearchLoading(true);
      props.getSearchData(0, props.route.params.value, props.language);
    }
  };

  componentDidUpdate(prevProps: ShowSearchItemsPropsType) {
    const { props } = this;
    if (
      !props.loading &&
      prevProps.searchData[0].items.length !==
        props.searchData[0].items.length &&
      prevProps.route.params.value === props.route.params.value
    ) {
      props.setData(props.searchData[0].items);
    }
    if (
      props.route.params.value !== prevProps.route.params.value ||
      props.types.length !== prevProps.types.length ||
      props.ingredients.length !== prevProps.ingredients.length
    ) {
      this.initNewData();
    }
    if (
      !props.loading &&
      props.searchData[0].items.length === 0 &&
      prevProps.route.params.value === props.route.params.value
    ) {
      props.setData(props.searchData[0].items);
    }
  }

  render() {
    const { props } = this;
    const color = props.theme.header.container.backgroundColor;
    return (
      <SubCategory
        navigation={props.navigation}
        color={color}
        title={`${i18n.t("search")} "${props.route.params.value}"`}
        dataId={props.route.params.value}
        getData={this.getData}
      />
    );
  }
}

const mapStateToProps = (state: RootStateType) => {
  return {
    theme: state.settings.theme,
    searchData: state.search.searchData,
    language: state.settings.language,
    loading: state.search.loading,
    types: state.search.types,
    ingredients: state.search.ingredients,
  };
};

export default connect(mapStateToProps, {
  getSearchData,
  setData,
  cleanSearchData,
  cleanData,
  setSearchLoading,
})(ShowSearchItems);
