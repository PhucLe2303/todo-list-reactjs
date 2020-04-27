import React, { Component } from "react";
import "../App.css";

class Search extends Component {
  constructor(props){
    super(props);
    this.state={
      keyWord:""
    }
  }

  onSearch=()=>{
    this.props.onSearch(this.state.keyWord);
  }

  onChange=(event)=>{
    let target=event.target;
    let name=target.name;
    let value=target.value;
    this.setState({
      [name]:value
    })
  }
  render() {
    return (
        <div className="col-6">
          <div className="input-group mb-3">
            <input
              type="text"
              name="keyWord"
              className="form-control"
              placeholder="Nhập từ khóa..."
              aria-label="Nhập từ khóa..."
              aria-describedby="basic-addon2"
              value={this.state.keyWord}
              onChange={this.onChange}
            />
            <div className="input-group-append">
              <button 
                className="btn btn-primary" type="button"
                onClick={this.onSearch}
              >
                <span className="fa fa-search mr-5"></span>
                Search
              </button>
            </div>
          </div>
        </div>
    );
  }
}

export default Search;
