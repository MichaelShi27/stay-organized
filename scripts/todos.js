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
    let displayUserTasks = document.getElementById("userTasks");
    displayUserTasks.innerHTML = "";

    fetch(baseURL + "todos/" + "byuser/" + selectUser.value)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
            displayUserTasks.innerHTML += `
            <tr class="fw-normal">
                <td class="align-middle">${data[i].category}</td>
                <td class="align-middle">${data[i].description}</td>
                <td class="align-middle">
                    <h6 class="mb-0"><span class="badge bg-danger">${data[i].priority} priority</span></h6>
                </td>
                <td class="align-middle">${data[i].deadline}</td>
                <td class="align-middle">${data[i].completed}</td>
            </tr>
            `
            }
        })
}
