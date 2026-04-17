import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import TodoCounter from "../components/TodoCounter.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = addTodoPopup.querySelector(".popup__form");

const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
};

const todoCounter = new TodoCounter(initialTodos, ".counter");

const createTodo = (data) => {
  const todo = new Todo(data, "#todo-template", {
    handleCheckboxChange: (isChecked) => {
      todoCounter.updateCompleted(isChecked);
    },
    handleDelete: (isCompleted) => {
      todoCounter.updateTotal(false);
      if (isCompleted) {
        todoCounter.updateCompleted(false);
      }
    },
  });
  return todo.getView();
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const element = createTodo(item);
    section.addItem(element);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

const addTodoPopup = new PopupWithForm("#add-todo-popup", (inputValues) => {
  const newTodo = { name: inputValues.name, completed: false };
  const element = createTodo(newTodo);
  section.addItem(element);
  todoCounter.updateTotal(true);
  formValidator.resetValidation();
});

addTodoPopup.setEventListeners();
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});
