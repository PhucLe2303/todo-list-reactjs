import React, { Component } from "react";
import "../App.css";

class TaskItem extends Component {

  onUpdateStatus=()=>{
    this.props.onUpdateStatus(this.props.task.id);
  }
  onDelete=()=>{
    this.props.onDelete(this.props.task.id);
  }

  onUpdate=()=>{
    this.props.onUpdate(this.props.task.id);
  }
  
  render() {
    let { task, index } = this.props;
    return (
      <tr>
        <td>{index+1}</td>
        <td>{task.name}</td>
        <td className="text-center">
          <span 
            className={task.status===true ? "badge badge-danger hv-click": "badge badge-success hv-click"}
            onClick={this.onUpdateStatus}
          >
            {task.status===true ? "kích hoạt":"Ẩn"}</span>
        </td>
        <td className="text-center">
          <button 
            className="btn btn-warning"
            onClick={this.onUpdate}
          >
            <span className="fas fa-pencil-alt mr-5"></span>
            Sữa
          </button>{" "}
          &nbsp;
          <button 
            className="btn btn-danger"
            onClick={this.onDelete}
          >
            <span className="fas fa-trash-alt mr-5"></span>
            Xóa
          </button>
        </td>
      </tr>
    );
  }
}

export default TaskItem;
