import React, { Component } from "react";
import "../App.css";


class TaskForm extends Component {

  constructor(props){
    super(props);
    this.state={
      id:"",
      name:"",
      status:false
    }
  }

  componentWillMount(){
    if(this.props.task){
      this.setState({
        id:this.props.task.id,
        name:this.props.task.name,
        status:this.props.task.status
      });
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps&&nextProps.task){
      this.setState({
        id:nextProps.task.id,
        name:nextProps.task.name,
        status:nextProps.task.status
      });
    }else if(nextProps.task===null){
      this.setState({
        id:"",
        name:"",
        status:false
      });
    }
  }

  onCloseForm=()=>{
     this.props.onCloseForm();
  }

  onChange=(event)=>{
    let target=event.target;
    let name=target.name;
    let value=target.value;
    if(name==="status"){
      value=target.value==='true'?true:false;
    }
    this.setState({
      [name]:value
    })
  }

  onSubmit=(event)=>{
    this.props.onSubmitForm(this.state);
    event.preventDefault();
  //  this.onClear()
  }

  onClear=()=>{
    this.setState({
      name:"",
      status:false
    })
    this.onCloseForm();
  }

  render() {
    let {id}=this.state;
    return (
      <div className="card bg-light">
        <div className="card-header">
          <h5 className="card-title">
            {id===""? "Thêm công việc" : "Cập Nhật Công Việc"}
            <span
              className="text-right hv"
              onClick={this.onCloseForm}
            ><i className="fa fa-times-circle"></i></span>
          </h5>
        </div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Tên công việc:</label>
              <input
                type="text"
                className="form-control"
                name='name'
                placeholder="Nhập tên công việc"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <label>Trạng thái:</label>
              <select
                className="form-control" 
                name="status"
                value={this.state.status}
                onChange={this.onChange}>
                <option value={false}>Ẩn</option>
                <option value={true}>Kích hoạt</option>
              </select>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                <span className="fa fa-plus mr-5"></span>
                Save
              </button>
              &nbsp;
              <button 
                type="Button" 
                className="btn btn-danger"
                onClick={this.onClear}>
                <span className="fa fa-times mr-5"></span>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TaskForm;
