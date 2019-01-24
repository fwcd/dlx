import { PopoverView } from "./PopoverView";

export class OverlayView {
	private element = document.getElementById("overlay");
	private popover?: PopoverView;
	
	public constructor() {
		this.setVisible(false);
	}
	
	public show(content: HTMLElement): void {
		if (this.popover) {
			this.element.removeChild(this.popover.getElement());
		}
		
		this.popover = new PopoverView(content, () => this.setVisible(false));
		this.element.appendChild(this.popover.getElement());
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
