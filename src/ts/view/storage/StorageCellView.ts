import { ProcessorStorage } from "../../model/ProcessorStorage";

export class StorageCellView {
	private element = document.createElement("input");
	
	public constructor(getter: () => number, setter: (v: number) => void) {
		this.element.type = "text";
		this.element.value = "" + getter();
		this.element.addEventListener("keyup", e => setter(+this.element.value));
	}
	
	public setChangeable(changeable: boolean): void {
		this.element.disabled = !changeable;
	}
	
	public getElement(): HTMLElement {
		return this.element;
	}
}
