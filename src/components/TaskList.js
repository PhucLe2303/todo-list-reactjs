import React, { Component } from "react";
import "../App.css";
import TaskItem from "../components/TaskItem";

class TaskList extends Component {

  constructor(props){
    super(props);
    this.state={
      filterName:"",
      filterStatus:-1
    }
  }

  onChange=(event)=>{
    let target=event.target;
    let name=target.name;
    let value=target.value;
    this.props.onFilter(name==='filterName'? value : this.state.filterName,
                        name==='filterStatus'? value : this.state.filterStatus);
    this.setState({
      [name]:value
    });
  }

  render() {
      let tasks=this.props.tasks;
      let elmtasks=tasks.map((task,index)=>{
          return <TaskItem 
                    key={task.id} 
                    index={index} 
                    task={task}
                    onUpdateStatus={this.props.onUpdateStatus}
                    onDelete={this.props.onDelete}
                    onUpdate={this.props.onUpdate}
                    />;
      })
    return (
      <div className="col-12">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tên</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr className="height-5">
              <td></td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="filterName"
                  onChange={this.onChange}
                ></input>
              </td>
              <td>
                <select 
                  className="form-control" 
                  name="filterStatus"
                  onChange={this.onChange}
                >
                  <option value="-1">Tất cả</option>
                  <option value="0">Ẩn</option>
                  <option value="1">Kích hoạt</option>
                </select>
              </td>
              <td></td>
            </tr>
            {elmtasks}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TaskList;
