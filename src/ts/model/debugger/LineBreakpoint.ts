import { Breakpoint } from "./Breakpoint";

export interface LineBreakpoint {
	breakpoint: Breakpoint;
	
	/** The 1-indexed lineNumber. */
	lineNumber: number;
}
