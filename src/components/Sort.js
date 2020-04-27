import React, { Component } from "react";
import "../App.css";

class Sort extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     sortBy: "name",
  //     sortValue: "a",
  //   };
  // }

   componentWillReceiveProps(nextProps) {
   // console.log(nextProps);
   }

  onClick = (sortBy, sortValue) => {
    this.props.onSort(sortBy,sortValue);
  };

  render() {
   
   let {sortBy,sortValue}=this.props;
    return (
      <div className="col-6">
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-primary dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Sort
            <span className="far fa-caret-square-down ml-5"></span>
          </button>
          <div className="dropdown-menu">
            <ul className="padding-5">
              <li
                onClick={() => {
                  this.onClick("name", "a");
                }}
                type="button"
                className="dropdown-item"
              >
                <span className="fas fa-sort-alpha-down" /> Tên A-Z
                {sortBy === "name" &&
                  sortValue === "a" && (
                    <span className="sortSelected fas fa-check"></span>
                  )}
              </li>
              <li
                onClick={() => {
                  this.onClick("name", "b");
                }}
                type="button"
                className="dropdown-item"
              >
                <span className="fas fa-sort-alpha-down-alt" /> Tên Z-A
                <span
                  className={
                    sortBy === "name" && sortValue === "b"
                      ? "sortSelected fas fa-check"
                      : ""
                  }
                />
              </li>
              <div className="dropdown-divider"></div>
              <li
                onClick={() => {
                  this.onClick("status", "a");
                }}
                type="button"
                className="dropdown-item"
              >
                <span className=""> Trạng thái kích hoạt</span>
                <span
                  className={
                    sortBy === "status" &&
                    sortValue === "a"
                      ? "sortSelected fas fa-check"
                      : ""
                  }
                ></span>
              </li>
              <li
                onClick={() => {
                  this.onClick("status", "b");
                }}
                type="button"
                className="dropdown-item"
              >
                <span className=""> Trạng thái ẩn</span>
                <span
                  className={
                    sortBy === "status" &&
                    sortValue === "b"
                      ? "sortSelected fas fa-check"
                      : ""
                  }
                ></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Sort;
