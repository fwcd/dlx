export class StorageCellView {
	private element = document.createElement("input");
	private getter: () => number;
	
	public constructor(getter: () => number, setter: (v: number) => void) {
		this.getter = getter;
		
		this.element.type = "text";
		this.update();
		this.element.addEventListener("keyup", e => setter(+this.element.value));
	}
	
	public update(): void {
		this.element.value = "" + this.getter();
	}
	
	public setChangeable(changeable: boolean): void {
		this.element.disabled = !changeable;
	}
	
	public getElement(): HTMLElement {
		return this.element;
	}
}
