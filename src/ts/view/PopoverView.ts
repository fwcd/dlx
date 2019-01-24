export class PopoverView {
	private element = document.getElementById("popover");
	private content?: HTMLElement;
	
	public constructor() {
		const closeButton = document.createElement("button");
		closeButton.addEventListener("click", () => this.setVisible(false));
		this.setVisible(false);
	}
	
	public show(content: HTMLElement): void {
		if (this.content) {
			this.element.removeChild(this.content);
		}
		this.element.appendChild(content);
		this.content = content;
		this.setVisible(true);
	}
	
	private setVisible(visible: boolean): void {
		if (visible) {
			this.element.style.display = "block";
		} else {
			this.element.style.display = "none";
		}
	}
}
