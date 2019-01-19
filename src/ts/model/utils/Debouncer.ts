export class Debouncer {
	private lastTime = 0;
	private delay: number;
	
	public constructor(delay: number) {
		this.delay = delay;
	}
	
	public runMaybe(task: () => void): void {
		const now = new Date().getTime();
		const delta = now - this.lastTime;
		if (delta > this.delay) {
			task();
			this.lastTime = now;
		}
	}
}
