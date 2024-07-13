// Retrieve tasks and nextId from localStorage
let localList = JSON.parse(localStorage.getItem("tasks"));
let localId = JSON.parse(localStorage.getItem("nextId"));
let taskList = []
const nextId = []
const titleInput = $('#titleInput')
const dateInput = $('#dateInput')
const descriptionInput = $('#descriptionInput');


// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    for (x of taskList) {
        const card = $('<div>', { class: 'card text-center' });
        const cardHeader = $('<div>', { class: 'card-header', text: 'due' + x.date });
        const cardBody = $('<div>', { class: 'card-body' });
        const cardTitle = $('<h5>', { class: 'card-title', text: x.title });
        const cardText = $('<p>', { class: 'card-text', text: x.desription });
        const cardLink = $('<a>', { href: '#', class: 'btn btn-danger', text: 'Delete' });
        const cardFooter = $('<div>', { class: 'card-footer text-muted', text: '' });

        cardBody.append(cardTitle, cardText, cardLink);
        card.append(cardHeader, cardBody, cardFooter);

        $('#todo-cards').append(card)
        card.css('z-index', '0')
        card.draggable()
    }
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    if (localList !== null) {
        taskList = localList
        createTaskCard()
    }

    // for (let i = 0; i < taskList.length; i++) {
    //     $(taskList[i]).draggable()
    // }
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    let task = {
        title: titleInput.val(),
        date: dateInput.val(),
        desription: descriptionInput.val()
    }

    taskList.push(task)

    localStorage.setItem('tasks', JSON.stringify(taskList))

    titleInput.val('')
    dateInput.val('')
    descriptionInput.val('')

    $('.modal').css('display', 'none')


    createTaskCard()
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    $(event.target).parent().parent().remove()
    // console.log($(event.target).parent().get())

    // for (let i = 0; i< taskList.length; i++) {
    //     if (taskList[i].title === 
    // }
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList()
    $('#to-do').droppable({
        drop: function (event, ui) {
            $(this)
                .addClass("ui-state-highlight")
                .find("p")
                .html("Dropped!");
        }
    })
    $('#in-progress').droppable({
        drop: function (event, ui) {
            $(this)
                .find("p")
        }
    })
    $('#done').droppable({
        drop: function (event, ui) {
            $(this)
                .addClass("ui-state-highlight")
                .find("p")
                .html("Dropped!");
        }
    })

    //add event listener to show modal
    $('#getModal').on('click', function () {
        $('.modal').css('display', 'unset')
    })

    //add event listener to close modal
    $('.close').on('click', function () {
        $('.modal').css('display', 'none')
    })

    //add event listener to add a task
    $('#addTask').on('click', handleAddTask)

    $('#todo-cards').on('click', '.btn-danger', handleDeleteTask)

});
