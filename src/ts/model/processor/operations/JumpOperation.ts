import { Operation } from "./Operation";
import { OperationExecutionParams } from "./OperationExecutionParams";

/**
 * Performs a jump.
 */
export class JumpOperation implements Operation {
	public constructor() {}
	
	public execute(params: OperationExecutionParams) {
		if (params.labelArgs.length > 0) {
			params.counter.jumpToLabel(params.labelArgs[0]);
		} else {
			params.counter.jumpTo(params.numericArgs[0]);
		}
	}
	
	public describe(): string {
		return "Loads from memory to a register.";
	}
	
	public getExpectedArgCount(): number {
		return 1;
	}
}
