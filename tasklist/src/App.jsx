import { useState } from "react";

function App() {
  const [sortType, setSortType] = useState("date"); // priority
  const [sortOrder, setSortOrder] = useState("ascending"); // descending
  const [tasks, setTasks] = useState([]);
  const [openSection, setOpenSection] = useState({
    taskList: true,
    tasks: true,
    completedTasks: true,
  });

  function addTask(task) {
    setTasks([...tasks, { ...task, completed: false, id: Date.now() }]);
  }

  function toggleSection(section) {
    setOpenSection((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }
  function completeTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  }

  function toggleSortOrder(type) {
    if (sortType === type) {
      setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
    } else {
      setSortType(type);
      setSortOrder("ascending");
    }
  }

  function taskSorting(tasks) {
    return [...tasks].sort((a, b) => {
      if (sortType === "priority") {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return sortOrder === "ascending"
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      } else {
        return sortOrder === "ascending"
          ? new Date(a.deadline) - new Date(b.deadline)
          : new Date(b.deadline) - new Date(a.deadline);
      }
    });
  }

  const currentTasks = taskSorting(tasks.filter((task) => !task.completed));
  const completedTasks = tasks.filter((task) => task.completed);
  return (
    <div className="app">
      <div className="task-container">
        <button
          className={`close-button ${openSection.taskList ? "open" : ""}`}
          onClick={() => toggleSection("taskList")}
        >
          +
        </button>
        <h1>Task List with Priority</h1>
        {openSection.taskList && <TaskForm addTask={addTask} />}
      </div>
      <div className="task-container">
        <button
          className={`close-button ${openSection.tasks ? "open" : ""}`}
          onClick={() => toggleSection("tasks")}
        >
          +
        </button>
        <h2>Tasks:</h2>
        <div className="sort-controls">
          <button
            className={`sort-button ${sortType === "date" ? "active" : ""}`}
            onClick={() => toggleSortOrder("date")}
          >
            By Date{" "}
            {sortType === "date" &&
              (sortOrder === "ascending" ? "\u2191" : "\u2193")}
          </button>
          <button
            className={`sort-button ${sortType === "priority" ? "active" : ""}`}
            onClick={() => toggleSortOrder("priority")}
          >
            By Priority{" "}
            {sortType === "priority" &&
              (sortOrder === "ascending" ? "\u2191" : "\u2193")}
          </button>
        </div>
        {openSection.tasks && (
          <TaskList
            completeTask={completeTask}
            deleteTask={deleteTask}
            currentTasks={currentTasks}
          />
        )}
      </div>
      <div className="completed-task-container">
        <h2>Completed Tasks:</h2>
        <button
          className={`close-button ${openSection.completedTasks ? "open" : ""}`}
          onClick={() => toggleSection("completedTasks")}
        >
          +
        </button>
        {openSection.completedTasks && (
          <CompletedTaskList
            deleteTask={deleteTask}
            completedTasks={completedTasks}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("High");
  const [deadline, setDeadline] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (title.trim() && deadline) {
      addTask({ title, priority, deadline });
      setTitle("");
      setPriority("High");
      setDeadline("");
    }
  }

  return (
    <form action="" className="task-form" onSubmit={addTask}>
      <input
        type="text"
        placeholder="Task title"
        required
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <select
        required
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input
        type="datetime-local"
        name="task-datetime"
        required
        value={deadline}
        onChange={(event) => setDeadline(event.target.value)}
      />
      <button className="task-button" type="submit" onClick={handleSubmit}>
        Add Task
      </button>
    </form>
  );
}
function TaskList({ currentTasks, deleteTask, completeTask }) {
  return (
    <ul className="task-list">
      {currentTasks.map((task) => (
        <TaskItem
          completeTask={completeTask}
          deleteTask={deleteTask}
          task={task}
          key={task.id}
        />
      ))}
    </ul>
  );
}
function CompletedTaskList({ completedTasks, deleteTask }) {
  return (
    <ul className="completed-task-list">
      {completedTasks.map((task) => (
        <TaskItem deleteTask={deleteTask} task={task} key={task.id} />
      ))}
    </ul>
  );
}

function TaskItem({ task, deleteTask, completeTask }) {
  const { title, priority, deadline, id } = task;
  return (
    <li className={`task-item ${priority.toLowerCase()}`}>
      <div className="task-info">
        <h3>
          #1 {title} - <b>{priority}</b>
        </h3>
        <p className="task-deadline">
          Due: {new Date(deadline).toLocaleString()}
        </p>
      </div>
      <div className="task-buttons">
        {task.completed === false ? (
          <button className="complete-button" onClick={() => completeTask(id)}>
            Complete
          </button>
        ) : (
          ""
        )}
        <button className="delete-button" onClick={() => deleteTask(id)}>
          Delete
        </button>
      </div>
    </li>
  );
}
function Footer() {
  return (
    <footer className="footer">
      <p>
        Technologies and React concepts used: React, JSX, props, useState,
        component composition, conditional rendering, array methods (map,
        filter), event handling
      </p>
    </footer>
  );
}
export default App;
