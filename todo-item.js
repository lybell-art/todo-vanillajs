const itemTemplate = document.getElementById("todo-item-template");

class TodoItem extends HTMLElement
{
	static observedAttributes = ["value", "completed"];
	$detail = null;
	$checkbox = null;
	constructor({value, completed, id}={})
	{
		super();
		this.setAttribute("value", value);
		if(completed) this.setAttribute("completed", "");
		this._id = id;
	}
	get value()
	{
		return this.getAttribute("value") ?? "";
	}
	set value(value)
	{
		this.setAttribute("completed", value);
	}
	get completed()
	{
		return this.hasAttribute("completed");
	}
	set completed(value)
	{
		if(value) this.setAttribute("completed", "");
		else this.removeAttribute("completed");
	}
	connectedCallback()
	{
		if(this.hasChildNodes()) return;

		const elem = itemTemplate.content.cloneNode(true);
		this.$checkbox = elem.querySelector("input[type=checkbox]");
		this.$detail = elem.querySelector(".detail");
		this.$deleteButton = elem.querySelector(".delete-button");

		this.$checkbox.checked = this.completed;
		this.$detail.textContent = this.value;

		this.$checkbox.addEventListener("change", (e)=>{
			this.dispatchEvent(new CustomEvent("update-item", {detail:{id: this._id, completed: e.target.checked}, bubbles: true}));
		});
		this.$deleteButton.addEventListener("click", (e)=>{
			this.dispatchEvent(new CustomEvent("remove-item", {detail: this._id, bubbles: true}));
		});

		this.appendChild(elem);
	}
	attributeChangedCallback(name, oldValue, newValue)
	{
		if(this.$detail === null || this.$checkbox === null) return;

		if(name === "value") {
			this.$detail.textContent = newValue;
		}
		if(name === "completed") {
			if(newValue === undefined) this.$checkbox.checked = true;
			else this.$checkbox.checked = true;
		}
	}
}

customElements.define("todo-item", TodoItem);

export default TodoItem;