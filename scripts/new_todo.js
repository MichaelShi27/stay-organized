"use strict"

const userIdInput = document.getElementById("user-ID");
const categoryInput = document.getElementById("category");
const priorityInput = document.getElementById("urgency");
const descriptionInput = document.getElementById("description");
const deadlineInput = document.getElementById("deadline");
const newToDoInput = document.getElementById("todo-form");

window.onload = function() {
    populateUserDropdown();
    populateCategoriesDropdown();
}

function populateUserDropdown() {

    fetch('http://localhost:8083/api/users')
    .then(response => response.json())
    .then(users => {
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.text = user.name;
            userIdInput.add(option);
        });
    });
}

function populateCategoriesDropdown() {

    fetch('http://localhost:8083/api/categories')
    .then(response => response.json())
    .then(categories => {
      categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.name;
        option.text = category.name;
        categoryInput.add(option);
      });
    });
}

const todoData = {
    userid: userIdInput.value,
    category: categoryInput.value,
    priority: priorityInput.value,
    description: descriptionInput.value,
    deadline: deadlineInput.value,
};

fetch("http://localhost:8081/api/todos", {
    method: "POST",
    body: JSON.stringify(todoData),
    headers: {
        "Content-Type": "application/json",
    }
})
    .then(() => {
    location.href = "todos.html";
    })