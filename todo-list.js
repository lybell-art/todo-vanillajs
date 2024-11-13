import TodoFilter from "./todo-filter.js";
import TodoItem from "./todo-item.js";

class TodoList extends HTMLElement
{
	#filter = "all";
	#data = [];
	$filterer = null;
	$listRenderer = null;
	constructor()
	{
		super();
		this.addEventListener("change-filter", ({detail})=>{
			this.filter = detail;
		});
		this.addEventListener("update-item", ({detail})=>{
			this.data = this.#data.map( (item)=>{
				if(item.id === detail.id) return {...item, ...detail};
				return item;
			} );
		});
		this.addEventListener("remove-item", ({detail})=>{
			this.data = this.#data.filter( ({id})=>id !== +detail );
		});
	}
	get filter()
	{
		return this.#filter;
	}
	set filter(value)
	{
		const oldFilter = this.#filter;
		if(["all", "completed", "incompleted"].includes(value)) {
			this.#filter = value;
		}
		else this.#filter = "all";
		if(oldFilter !== this.#filter) this.render();
	}
	get data()
	{
		return [...this.#data];
	}
	set data(value)
	{
		if(!Array.isArray(value)) return;
		if(this.#data === value) return;
		this.#data = value;
		this.dispatchEvent(new Event("change-data"));
		this.render();
	}
	connectedCallback()
	{
		if(this.hasChildNodes()) return;
		this.$filterer = new TodoFilter();
		this.$listRenderer = document.createElement("div");

		this.appendChild(this.$filterer);
		this.appendChild(this.$listRenderer);
	}
	appendItem(value)
	{
		this.data = [...this.#data, {value, completed: false, id: Math.random()}];
	}
	render()
	{
		if(this.$filterer === null || this.$listRenderer === null) return;

		this.$filterer.setAttribute("value", this.filter);
		const filteredList = this.data
			.filter( ({completed})=>{
				if(this.filter === "completed") return completed;
				if(this.filter === "incompleted") return !completed;
				return true;
			} ).map( data=>{
				return new TodoItem(data);
			} );

		this.$listRenderer.innerHTML = "";
		const frag = new DocumentFragment();
		filteredList.forEach( ($el)=>frag.append($el) );
		this.$listRenderer.append(frag);
	}
}

customElements.define("todo-list", TodoList);

export default TodoList;