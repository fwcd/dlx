import { Breakpoint } from "./Breakpoint";
import { LineBreakpoint } from "./LineBreakpoint";
import { ListenerList, Listener } from "../utils/ListenerList";

export class BreakpointManager {
	// Line numbers are 1-indexed
	private breakpoints: { [lineNumber: number]: Breakpoint; } = {};
	private breakpointListeners = new ListenerList<LineBreakpoint[]>();
	
	public setBreakpoint(lineNumber: number): void {
		this.breakpoints[lineNumber] = new Breakpoint();
		this.fireListeners();
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
	
	private fireListeners(): void {
		const lineBreakpoints: LineBreakpoint[] = [];
		
		for (let lineNumber in this.breakpoints) {
			lineBreakpoints.push({
				breakpoint: this.breakpoints[lineNumber],
				lineNumber: +lineNumber
			});
		}
		
		this.breakpointListeners.fire(lineBreakpoints);
	}
	
	public addBreakpointListener(listener: Listener<LineBreakpoint[]>): void {
		this.breakpointListeners.add(listener);
	}
	
	public removeBreakpointListener(listener: Listener<LineBreakpoint[]>): void {
		this.breakpointListeners.remove(listener);
	}
}
