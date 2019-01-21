import { Operation } from "./Operation";
import { OperationExecutionParams } from "./OperationExecutionParams";
import { OperationResult } from "./OperationResult";

/**
 * Performs a jump if a certain condition holds.
 */
export class BranchOperation implements Operation {
	private argumentSyntax = /^ *R(\d+) *, *(\w+) *$/;
	private condition: (value: number) => boolean;
	
	public constructor(condition: (value: number) => boolean) {
		this.condition = condition;
	}
	
	public execute(params: OperationExecutionParams): OperationResult {
		const operand = params.numericArgs[0];
		
		if (this.condition(params.state.getStorage().getRegister(operand))) {
			if (params.labelArgs.length > 0) {
				params.counter.jumpToLabel(params.labelArgs[0]);
			} else {
				params.counter.jumpTo(params.numericArgs[1]);
			}
		}
		
		return {};
	}
	
	public describe(): string {
		return "Branches if a condition is met.";
	}
	
	public getArgumentSyntax(): RegExp {
		return this.argumentSyntax;
	}
	
	public getExpectedArgCount(): number {
		return 2;
	}
}
