export class PopoverView {
	private element = document.createElement("div");
	
	public constructor(content: HTMLElement, close: () => void) {
		const closeButton = document.createElement("button");
		closeButton.innerText = "Close";
		closeButton.addEventListener("click", () => close());
		this.element.appendChild(closeButton);
		
		this.element.appendChild(content);
	}
	
	public getElement(): HTMLElement {
		return this.element;
	}
}
