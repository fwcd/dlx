import { Operation } from "./Operation";
import { OperationExecutionParams } from "./OperationExecutionParams";
import { OperationResult } from "./OperationResult";

/**
 * Performs an operation on two registers.
 */
export class RegisterOperation implements Operation {
	private argumentSyntax = /^ *R(\d+) *, *R(\d+) *, *R(\d+) *$/;
	private operation: (a: number, b: number) => number;
	
	public constructor(operation: (a: number, b: number) => number) {
		this.operation = operation;
	}
	
	public execute(params: OperationExecutionParams): OperationResult {
		const storage = params.state.getStorage();
		const dest = params.numericArgs[0];
		const left = params.numericArgs[1];
		const right = params.numericArgs[2];
		
		storage.setRegister(dest, this.operation(storage.getRegister(left), storage.getRegister(right)));
		return {};
	}
	
	public describe(): string {
		return "Operates on two registers and places the result in a third register.";
	}
	
	public getArgumentSyntax(): RegExp {
		return this.argumentSyntax;
	}
	
	public getExpectedArgCount(): number {
		return 3;
	}
}
