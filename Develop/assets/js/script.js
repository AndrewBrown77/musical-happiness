// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
  let toDoSection = $("#todo-cards");
  let inProgressSection = $("#in-progress-cards");
  let DoneSection = $("#done-cards");
  toDoSection.empty();
  inProgressSection.empty();
  DoneSection.empty();
  for (let i = 0; i < taskList.length; i++) {
    if (taskList.type === "toDo") {
      toDoSection.append(createTaskCard(taskList[i]));
    } else if (taskList.type === "inProgress") {
      inProgressSection.append(createTaskCard(taskList[i]));
    } else if (taskList.type === "Done") {
      DoneSection.append(createTaskCard(taskList[i]));
    }
  }           
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    let card=$("<div>").addClass("card draggable").attr("id",task.Id)
    let cardtitle=$("<div>").addClass("card-title").text(task.title)
    let cardDescription=$("<div>").addClass("carddescription").text(task.cardDescription)
    let cardDueDate=$("<div>").addClass("cardDueDate").text(task.cardDueDate)
    let deletebtn=$("<button>").addClass("btn btn-danger").text("delete").attr("taskId", task.Id)
    deletebtn.on('click', handleDeleteTask)

    return card.append(cardtitle,cardDescription,cardDueDate,deletebtn)
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {


// Todo: create a function to handle adding a new task
function handleAddTask(event) {}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();
});
