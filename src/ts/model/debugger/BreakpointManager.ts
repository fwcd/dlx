import { Breakpoint } from "./Breakpoint";

export class BreakpointManager {
	private breakpoints: { [lineNumber: number]: Breakpoint; } = {};
	
	public setBreakpoint(lineNumber: number): void {
		this.breakpoints[lineNumber] = new Breakpoint();
	}
	
	public getBreakpoint(lineNumber: number): Breakpoint | null {
		if (lineNumber in this.breakpoints) {
			return this.breakpoints[lineNumber];
		} else {
			return null;
		}
	}
	
	public shouldBreakAt(lineNumber: number): boolean {
		const bp = this.getBreakpoint(lineNumber);
		return bp != null && bp.isEnabled();
	}
}
