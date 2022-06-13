import React, { Component } from 'react';
import './App.css';
import CustomModal from './components/Modal';

const tasks = [
  {
    id: 1,
    title: "test one",
    description: "bla bla bla",
    completed: false
  },
  {
    id: 2,
    title: "test two",
    description: "bla bla bla",
    completed: true
  },
  {
    id: 3,
    title: "test three",
    description: "bla bla bla",
    completed: false
  },
]



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      viewCompleted: false,
      taskList: tasks,
      activeItem: {
        title: "",
        description: "",
        completed: false
      }
    };
  }

  toggle = () => {
    this.setState({modal: !this.state.modal });
  }

  handleSubmit = item => {
    this.toggle();
  }

  handleDelete = item => {
    this.toggle()
  }

  createItem = () => {
    const item = { title: "", modal: !this.state.modal };
    this.setState({ activeItem: item, modal: !this.state.modal});
  }

  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal});
  }

  displayCompleted = status => {
    if (status) {
      return this.setState({viewCompleted: true});
    }
    return this.setState({viewCompleted: false})
  }

  renderTabList = () => {
    return(
      <div className="my-5 tab-list">
        <span onClick={() => this.displayCompleted(true)} className={this.state.viewCompleted ? "active" : ""}>Completed</span>
        <span onClick={() => this.displayCompleted(false)} className={this.state.viewCompleted ? "" : "active"}>Incompleted</span>
      </div>
    )
  };

  renderItems = () => {
    const {viewCompleted } = this.state;
    const newItems = this.state.taskList.filter(
      item => item.completed == viewCompleted
    );
    return newItems.map(item => (
      <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
        <span className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""}`} title={item.title}>
          {item.title}
        </span>
        <span>
          <button className="btn btn-info mr-2">Edit</button>
          <button className="btn btn-danger mr-2">Delete</button>
        </span>
      </li>
    ))
  };

  render() {
    return(
      <main className="context">
        <h1 className="text-black text-uppercase text-center my-4">Task Manager</h1>
        <div className="row">
          <div className="coll-md-6 col-sma-10 mx-auto p-0">
            <div className="card p-3">
              <div>
                <button className="btn btn-primary">Add Task</button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <CustomModal activeItem={this.state.activeItem} toggle={this.toggle} onSave={this.handleSubmit} />
        ) : null}
      </main>
    )
  }


}

export default App;
