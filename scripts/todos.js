"use strict";

const baseURL = "http://localhost:8083/api/users";
const selectUser = document.getElementById("users")
const searchBtn = document.getElementById("searchBtn");

window.onload = () => {
    fetchUsers()

    searchBtn.onclick = () => {
        displayTasks(selectUser)
    }
}
const fetchUsers = () => {
    selectUser.length = 1;

    fetch(baseURL, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                let userOptions = new Option(data[i].name, data[i].id);
                selectUser.appendChild(userOptions);
            }
        })
}

const displayTasks = (userID) => {
    const baseURL2 = "http://localhost:8083/api/todos/"
    const displayUserTasks = document.getElementById("userTasks");

    fetch(baseURL2 + userID.value)
        .then(response => response.json())
        .then(data => {
            displayUserTasks.innerHTML = `
            <tr class="fw-normal">
                <td class="align-middle">${data.category}</td>
                <td class="align-middle">${data.description}</td>
                <td class="align-middle">
                    <h6 class="mb-0"><span class="badge bg-danger">${data.priority} priority</span></h6>
                </td>
                <td class="align-middle">${data.deadline}</td>
                <td class="align-middle">${data.completed}</td>
            </tr>
            `
        })
}
