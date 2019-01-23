export class Breakpoint {
	private enabled: boolean;
	
	public constructor(enabled?: boolean) {
		if (enabled == null) {
			this.enabled = true;
		} else {
			this.enabled = enabled;
		}
	}
	
	public isEnabled(): boolean { return this.enabled; }
	
	public setEnabled(enabled: boolean): void { this.enabled = enabled; }
}
