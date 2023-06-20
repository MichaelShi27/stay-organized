const qS = document.querySelector.bind(document);
const qSA = document.querySelectorAll.bind(document);
const path = 'http://localhost:8083/api';

window.onload = () => {
  displayDetails();
};

const displayDetails = async () => {
  const params = new URLSearchParams( window.location.search );
  const id = params.get('id');

  const todo = await fetchTodo(id);
  const user = await fetchUser(todo.userid);
  const data = { ...todo, ...user };

  qSA('input').forEach(input => input.value = data[input.id]);
};

const fetchTodo = async id => {
  try {
    const resp = await fetch(`${path}/todos/${id}`);
    return resp.json();
  } catch(err) {
    console.log(err);
  }
};

const fetchUser = async id => {
  try {
    const resp = await fetch(`${path}/users`);
    const users = await resp.json();
    return users.find(user => user.id === id);
  } catch(err) {
    console.log(err);
  }
};
