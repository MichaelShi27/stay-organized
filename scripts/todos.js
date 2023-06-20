"use strict";

const baseURL = "http://localhost:8083/api/";
const selectUser = document.getElementById("users")
const searchBtn = document.getElementById("searchBtn");

window.onload = () => {
    fetchUsers()

    searchBtn.onclick = () => {
        displayTasks(selectUser)
    }
}
const fetchUsers = () => {


    fetch(baseURL + "users")
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                const userOption = new Option(data[i].name, data[i].id);
                selectUser.appendChild(userOption);
            }
        })
}

const displayTasks = (selectUser) => {
    const displayUserTasks = document.getElementById("userTasks");

    fetch(baseURL + "todos/" + selectUser.value)
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
