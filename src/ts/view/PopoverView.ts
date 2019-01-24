export class PopoverView {
	private element = document.getElementById("popover");
	private content?: HTMLElement;
	
	public show(content: HTMLElement): void {
		if (this.content) {
			this.element.removeChild(this.content);
		}
		this.element.appendChild(content);
		this.content = content;
	}
}
