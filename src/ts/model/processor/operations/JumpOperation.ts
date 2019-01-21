import { Operation } from "./Operation";
import { OperationExecutionParams } from "./OperationExecutionParams";
import { OperationResult } from "./OperationResult";

/**
 * Performs a jump.
 */
export class JumpOperation implements Operation {
	private argumentSyntax = /^ *(\w+) *$/;
	
	public constructor() {}
	
	public execute(params: OperationExecutionParams): OperationResult {
		if (params.labelArgs.length > 0) {
			params.counter.jumpToLabel(params.labelArgs[0]);
		} else {
			params.counter.jumpTo(params.numericArgs[0]);
		}
		return {};
	}
	
	public describe(): string {
		return "Jumps.";
	}
	
	public getArgumentSyntax(): RegExp {
		return this.argumentSyntax;
	}
	
	public getExpectedArgCount(): number {
		return 1;
	}
}
