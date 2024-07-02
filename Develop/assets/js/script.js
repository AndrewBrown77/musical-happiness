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
  let card = $("<div>").addClass("card draggable").attr("id", task.Id);
  let cardtitle = $("<div>").addClass("card-title").text(task.title);
  let cardDescription = $("<div>")
    .addClass("carddescription")
    .text(task.cardDescription);
  let cardDueDate = $("<div>").addClass("cardDueDate").text(task.cardDueDate);
  let deletebtn = $("<button>")
    .addClass("btn btn-danger")
    .text("delete")
    .attr("taskId", task.Id);
  deletebtn.on("click", handleDeleteTask);

  return card.append(cardtitle, cardDescription, cardDueDate, deletebtn);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList(tasks) {
  // Clear existing task list
  $("#task-list").empty();

  // Loop through tasks and create a card for each task
  tasks.forEach((task) => {
    const $card = $('<div class="task-card"></div>');
    $card.text(task.title);
    $card.data("task", task); // Store task data in the card element
    $("#task-list").append($card);
  });
}

function makeCardsDraggable() {
  $(".task-card").draggable({
    revert: "invalid",
    helper: "clone",
    start: function (event, ui) {
      $(this).addClass("dragging");
    },
    stop: function (event, ui) {
      $(this).removeClass("dragging");
    },
  });
}
//  Call these functions after loading the tasks and the page:
$(document).ready(function () {
  const tasks = [{ title: "Task 1" }, { title: "Task 2" }, { title: "Task 3" }];

  renderTaskList(tasks);
  makeCardsDraggable();
});

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    var title = $('#taskTitleInput').val();
    var description = $('#taskDescriptionInput').val();
    var deadline = $('#taskDeadlineInput').val();

    var newTask = {
        title: title,
        description: description,
        deadline: deadline,
        status: 'Not Yet Started' // Assuming default status is 'Not Yet Started'
    };
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}
// Event listener for the save button in the modal dialog
$('#saveTaskButton').on('click', function() {
    addNewTask();
});

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    // Remove the task from localStorage
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(function(task) {
        return task.id !== taskId;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Update the UI to remove the deleted task
    // You will need to identify the task element based on its ID and remove it from the task board
    // This may involve finding the task element by its ID and removing it from the DOM
}

// Event listener for the delete button on each task
$('#taskBoard').on('click', '.deleteTaskButton', function() {
    var taskId = $(this).data('task-id');
    deleteTask(taskId);
});


// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    // Update the task status in localStorage
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function(task) {
        if (task.id === taskId) {
            task.status = newStatus;
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Update the UI to move the task to the new status lane
    // You will need to visually move the task element to the new status lane based on its updated status
    // This may involve changing the class or position of the task element in the DOM
}


$('.task').draggable({// Initialize jQuery UI's draggable and droppable features
    revert: 'invalid',
    snap: true
});

$('.status-lane').droppable({
    drop: function(event, ui) {
        var taskId = ui.draggable.data('task-id');
        var newStatus = $(this).data('status');
        updateTaskStatus(taskId, newStatus);
    }
});


// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();
});
