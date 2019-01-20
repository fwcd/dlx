import { Operation } from "./Operation";
import { OperationExecutionParams } from "./OperationExecutionParams";
import { OperationResult } from "./OperationResult";

/**
 * Performs an operation on a register and a literal.
 */
export class ImmediateOperation implements Operation {
	private operation: (a: number, b: number) => number;
	
	public constructor(operation: (a: number, b: number) => number) {
		this.operation = operation;
	}
	
	public execute(params: OperationExecutionParams): OperationResult {
		const storage = params.state.getStorage();
		const dest = params.numericArgs[0];
		const left = params.numericArgs[1];
		const literal = params.numericArgs[2];
		
		storage.setRegister(dest, this.operation(storage.getRegister(left), literal));
		return {};
	}
	
	public describe(): string {
		return "Operates on a value in a register and a literal. Places the result in a third register.";
	}
	
	public getExpectedArgCount(): number {
		return 3;
	}
}
