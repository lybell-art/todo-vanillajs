const filterTemplate = document.getElementById("todo-filter-template");

class TodoFilter extends HTMLElement
{
	static observedAttributes = ["value"];
	constructor()
	{
		super();
		this.setAttribute("value", "all");
		this.buttons = [];
	}
	connectedCallback()
	{
		if(this.hasChildNodes()) return;

		const elem = filterTemplate.content.cloneNode(true);
		this.buttons = elem.querySelectorAll("button");
		this.addEventListener("click", ({target})=>{
			if(target === "null") return;
			this.dispatchEvent(new CustomEvent("change-filter", {detail:target.dataset.value, bubbles: true}))
		})
		this.appendChild(elem);
	}
	attributeChangedCallback(name, oldValue, newValue)
	{
		if(name !== "value") return;
		this.buttons?.forEach( (button)=>{
			button.classList.toggle("selected", button.dataset.value === newValue);
		} ) 
	}
}

customElements.define("todo-filter", TodoFilter);

export default TodoFilter;