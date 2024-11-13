import "./todo-list.js";

const $todoInsertForm = document.getElementById("todo-insert");
const $todoList = document.querySelector("todo-list");
const $todoInput = $todoInsertForm.querySelector("input");

$todoInsertForm.addEventListener("submit", (e)=>{
	e.preventDefault();
	if(!$todoInput.value) return;

	console.log($todoInput.value);
	$todoInput.value = "";
});