import React, { Component } from "react";

import styles from "./ToDo.module.css";
import Task from "../Task/Task";
import FilterTask from "../FilterTask/FilterTask";

class ToDoList extends Component {
  state = {
    tasks: [
      { id: 1, name: "Завдання 1", done: false },
      { id: 2, name: "Завдання 2", done: false },
      { id: 3, name: "Завдання 3", done: false },
    ],
    newTaskName: "",
    filter: "All",
    error: "",
    search: "",
  };

  componentDidMount() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
      this.setState({ tasks });
    }
  }

  addTask = () => {
    const { newTaskName, tasks } = this.state;
    if (newTaskName.length < 3) {
      this.setState({ error: "Minimum symbol length - 3" });
      return;
    } else if (newTaskName.length > 20) {
      this.setState({ error: "Maximum symbol length - 20" });
      return;
    }

    const newId =
      tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    const newTask = {
      id: newId,
      name: newTaskName,
      done: false,
    };
    const newTasks = [...tasks, newTask];
    this.setState({ tasks: newTasks, newTaskName: "", error: "" });
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  deleteTask = (taskId) => {
    const newTasks = this.state.tasks.filter((task) => task.id !== taskId);
    this.setState({ tasks: newTasks });
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  clearTasks = () => {
    this.setState({ tasks: [] });
    localStorage.removeItem("tasks");
  };

  toggleDone = (id) => {
    const newTasks = this.state.tasks.map((task) => {
      if (task.id === id) {
        return { ...task, done: !task.done };
      }
      return task;
    });
    this.setState({ tasks: newTasks });
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value });
  };

  filterTasks = () => {
    const { tasks, filter, search } = this.state;
    let filteredTasks = tasks;

    if (filter === "Active") {
      filteredTasks = filteredTasks.filter((task) => !task.done);
    } else if (filter === "Done") {
      filteredTasks = filteredTasks.filter((task) => task.done);
    }

    if (search) {
      filteredTasks = filteredTasks.filter((task) =>
        task.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filteredTasks;
  };

  render() {
    const { filter, newTaskName } = this.state;
    const filteredTask = this.filterTasks();

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>My ToDo</h1>
          <input
            className={styles.input}
            placeholder="New task"
            value={newTaskName}
            onChange={(e) =>
              this.setState({ newTaskName: e.target.value, error: "" })
            }
          />
          <button className={styles.addBtn} onClick={this.addTask}>
            Додати
          </button>

          <div className={styles.error}>{this.state.error}</div>
        </div>
        <div className={styles.searchContent}>
          <input
            className={styles.search}
            placeholder="Search"
            value={this.state.search}
            onChange={(e) => this.setState({ search: e.target.value })}
          />
        </div>
        <div className={styles.filter}>
          <FilterTask
            filter={filter}
            onFilterChange={this.handleFilterChange}
          />
          <button className={styles.clearBtn} onClick={this.clearTasks}>
            X
          </button>
        </div>
        <div className={styles.listContainer}>
          <ul className={styles.list}>
            {filteredTask.map((task) => (
              <Task
                key={task.id}
                task={task}
                onToggleDone={this.toggleDone}
                onDelete={this.deleteTask}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ToDoList;
