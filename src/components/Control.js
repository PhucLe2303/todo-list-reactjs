import React, { Component } from "react";
import "../App.css";
import Search from "../components/Search";
import Sort from "../components/Sort";

class Control extends Component {
  render() {
    return (
      <div className="row mt-15">
        <Search onSearch={this.props.onSearch}></Search>
        <Sort 
          onSort={this.props.onSort}
          sortBy={this.props.sortBy}
          sortValue={this.props.sortValue}
        />
      </div>
    );
  }
}

export default Control;
