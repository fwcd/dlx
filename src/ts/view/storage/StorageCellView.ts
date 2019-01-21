export class StorageCellView {
	private element = document.createElement("div");
	private textField = document.createElement("input");
	private getter: () => number;
	
	public constructor(getter: () => number, setter: (v: number) => void, name?: string) {
		this.getter = getter;
		
		this.element.classList.add("storage-cell");
		
		// Configure and add label
		
		if (name) {
			const label = document.createElement("label");
			label.innerText = name;
			this.element.appendChild(label);
		}
		
		// Configure and add text field
		
		this.textField.type = "text";
		this.update();
		this.textField.addEventListener("keyup", e => setter(+this.textField.value));
		
		this.element.appendChild(this.textField);
	}
	
	public update(): void {
		this.textField.value = "" + this.getter();
	}
	
	public setChangeable(changeable: boolean): void {
		this.textField.disabled = !changeable;
	}
	
	public getElement(): HTMLElement {
		return this.element;
	}
}
