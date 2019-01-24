export class OverlayView {
	private element = document.getElementById("overlay");
	private content?: HTMLElement;
	
	public constructor() {
		const closeButton = document.createElement("button");
		closeButton.innerText = "Close";
		closeButton.addEventListener("click", () => this.setVisible(false));
		this.element.appendChild(closeButton);
		
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
