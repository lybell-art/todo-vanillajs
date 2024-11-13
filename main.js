import "./todo-list.js";

const $todoInsertForm = document.getElementById("todo-insert");
const $todoList = document.querySelector("todo-list");
const $todoInput = $todoInsertForm.querySelector("input");

$todoInsertForm.addEventListener("submit", (e)=>{
	e.preventDefault();
	if(!$todoInput.value) return;

	$todoList.appendItem($todoInput.value);
	$todoInput.value = "";
});

$todoList.addEventListener("change-data", (e)=>{
	localStorage.setItem("todo-vanilla-data", JSON.stringify(e.target.data));
});
try {
	$todoList.data = JSON.parse(localStorage.getItem("todo-vanilla-data"));
}
catch {
	localStorage.removeItem("todo-vanilla-data");
}
