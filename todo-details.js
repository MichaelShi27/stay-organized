const qS = document.querySelector.bind(document);
const qSA = document.querySelectorAll.bind(document);
const path = 'http://localhost:8083/api';

const form = qS('form');
const button = qS('button');
const message = qS('#message');

window.onload = async () => {
  button.style.display = 'none';

  const { completed, id } = await displayDetails();

  form.onsubmit = completed ? null : (e => {
    e.preventDefault();
    markAsCompleted(id);
  });

  if (!completed) 
    button.style.display = 'block';
};

const displayDetails = async () => {
  const params = new URLSearchParams( window.location.search );
  const id = params.get('id');

  const todo = await fetchTodo(id);
  const user = await fetchUser(todo.userid);
  const data = { ...todo, ...user };

  qSA('input').forEach(input => input.value = data[input.id]);

  return todo;
};

const fetchTodo = async id => {
  const resp = await fetch(`${path}/todos/${id}`);
  return resp.json();
};

const fetchUser = async id => {
  const resp = await fetch(`${path}/users`);
  const users = await resp.json();
  return users.find(user => user.id === id);
};

const markAsCompleted = async id => {
  await fetch(`${path}/todos/${id}`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" }
  });

  form.onsubmit = null;
  button.style.display = 'none';
  message.textContent = 'Marked as completed!';
  setTimeout(() => message.textContent = '', 4000);
};
