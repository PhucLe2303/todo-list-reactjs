import React, { Component } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";

import { findIndex, orderBy } from "lodash";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditting: null,
      filter: {
        name: "",
        status: -1,
      },
      keyWord: "",
      sortBy: "name",
      sortValue: "a",
    };
  }
  componentWillMount() {
    if (localStorage && localStorage.getItem("tasks")) {
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        tasks: tasks,
      });
    }
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  generateID() {
    return this.s4() + this.s4() + "-" + this.s4() + this.s4();
  }

  onToggleForm = () => {
    if (this.state.isDisplayForm && this.state.taskEditting !== null) {
      this.setState({
        isDisplayForm: true,
        taskEditting: null,
      });
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditting: null,
      });
    }
  };

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
    });
  };

  onSubmitForm = (data) => {
    let { tasks } = this.state;
    if (data.id === "") {
      data.id = this.generateID();
      tasks.push(data);
    } else {
      tasks[this.findIndexByID(data.id)] = data;
    }

    this.setState({
      tasks: tasks,
      taskEditting: null,
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  onUpdateStatus = (id) => {
    let { tasks } = this.state;
    let newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.status = !task.status;
      }
      return task;
    });
    this.setState({
      tasks: newTasks,
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  onDelete = (id) => {
    let { tasks } = this.state;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        tasks.splice(index, 1);
      }
    });
    this.setState({
      tasks: tasks,
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.onCloseForm();
  };

  findIndexByID = (id) => {
    let { tasks } = this.state;
    let temp = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        temp = index;
      }
    });
    return temp;
  };

  onShowForm = () => {
    this.setState({
      isDisplayForm: true,
    });
  };

  onUpdate = (id) => {
    let { tasks } = this.state;
    //let index=this.findIndexByID(id);
    let index = findIndex(tasks, (task) => {
      return task.id === id;
    });
    let taskEditting = tasks[index];

    this.setState({
      taskEditting: taskEditting,
    });
    this.onShowForm();
  };

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus,
      },
    });
  };

  onSearch = (keyword) => {
    this.setState({
      keyWord: keyword,
    });
  };

  onSort = (sortBy, sortValue) => {
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue,
    });
  };

  render() {
    let {
      tasks,
      isDisplayForm,
      filter,
      keyWord,
      sortBy,
      sortValue,
    } = this.state; //<=> let tasks = this.state.tasks

    //----------------filter----------------------------
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      tasks = tasks.filter((task) => {
        if (filter.status === -1) return task;
        else {
          return task.status === (filter.status === 1 ? true : false);
        }
      });
    }
    if (keyWord) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1;
      });
    }
    //----------sort--------------------
    if (sortBy === "name") {
      if (sortValue === "a") tasks = orderBy(tasks, ["name"], ["asc"]);
      else tasks = orderBy(tasks, ["name"], ["desc"]);
    } else {
      if (sortValue === "a") tasks = orderBy(tasks, ["status"], ["desc"]);
      else tasks = orderBy(tasks, ["status"], ["asc"]);
    }

    let elmTaskForm = isDisplayForm ? (
      <TaskForm
        onSubmitForm={this.onSubmitForm}
        onCloseForm={this.onCloseForm}
        task={this.state.taskEditting}
      />
    ) : (
      ""
    );
    return (
      <div className="App">
        <div className="container">
          <div className="text-center">
            <h1>Quảng lý công việc</h1>
          </div>
          <div className="row text-left">
            <div className={isDisplayForm ? "col-4" : ""}>{elmTaskForm}</div>
            <div className={isDisplayForm ? "col-8" : "col-12"}>
              <button
                onClick={this.onToggleForm}
                type="Button"
                className="btn btn-primary"
              >
                <span className="fa fa-plus mr-5"></span>
                Thêm công việc
              </button>{" "}
              <div>
                <Control
                  onSearch={this.onSearch}
                  onSort={this.onSort}
                  sortBy={sortBy}
                  sortValue={sortValue}
                />
              </div>
              <div className="row">
                <TaskList
                  tasks={tasks}
                  onUpdateStatus={this.onUpdateStatus}
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
                  onFilter={this.onFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
