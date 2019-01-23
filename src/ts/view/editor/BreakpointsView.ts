import { BreakpointManager } from "../../model/debugger/BreakpointManager";

export class BreakpointsView {
	private model: BreakpointManager;
	
	public constructor(model: BreakpointManager) {
		this.model = model;
	}
	
	public onMouseDown(lineNumber: number) {
		// The lineNumber is 1-indexed
		this.model.setBreakpoint(lineNumber);
	}
}
