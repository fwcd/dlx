export class Debouncer {
	private delay: number;
	private lastTime = 0;
	private currentTimeout?: number;
	
	public constructor(delay: number) {
		this.delay = delay;
	}
	
	public run(task: () => void): void {
		if (this.currentTimeout) {
			window.clearTimeout(this.currentTimeout);
			this.currentTimeout = undefined;
		}
		
		const now = new Date().getTime();
		const delta = now - this.lastTime;
		
		if (delta >= this.delay) {
			task();
			this.lastTime = now;
		} else {
			this.currentTimeout = window.setTimeout(task, this.delay - delta);
		}
	}
}
