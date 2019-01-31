import { Operation } from "./Operation";
import { OperationExecutionParams } from "./OperationExecutionParams";
import { OperationResult } from "./OperationResult";

/**
 * Loads an immediate value to a register.
 */
export class LoadImmediateOperation implements Operation {
	private argumentSyntax = /^ *R(\d+) *, *#(\-?\d+) *$/;
	
	public constructor() {}
	
	public execute(params: OperationExecutionParams): OperationResult {
		const storage = params.state.getStorage();
		const dest = params.numericArgs[0];
		const literal = params.numericArgs[1];
		
		storage.setRegister(dest, literal);
		return {};
	}
	
	public describe(): string {
		return "Loads an immediate value to a register.";
	}
	
	public getArgumentSyntax(): RegExp {
		return this.argumentSyntax;
	}
	
	public getExpectedArgCount(): number {
		return 2;
	}
}
