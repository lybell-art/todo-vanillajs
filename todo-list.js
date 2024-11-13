const todoTemplate = document.getElementById("todo-list-template");

class TodoList extends HTMLElement
{
	constructor()
	{
		super();
		this.filter = "all";

		this.addEventListener("change-filter", ({detail})=>{
			this.filter = detail;
			console.log(detail);
		});
	}
	connectedCallback()
	{
		const template = todoTemplate.content.cloneNode(true);
		initializeFilterElem(template.querySelector(".todo-list-filter"));

		this.append(template);
	}
}

function initializeFilterElem($elem)
{
	const buttons = $elem.querySelectorAll("button");
	let prevValue = "all";
	$elem.addEventListener("click", ({target})=>{
		if(target == null) return;
		const value = target.dataset.value;
		if(value === undefined) return;

		buttons.forEach( $button => {
			$button.classList.toggle("selected", $button === target);
		} );
		if(prevValue !== value) {
			$elem.dispatchEvent(new CustomEvent("change-filter", {detail: value, bubbles: true}));
			prevValue = value;
		}
	})
}

customElements.define("todo-list", TodoList);

export default TodoList;