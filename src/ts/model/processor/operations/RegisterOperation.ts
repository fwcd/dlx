import { Operation } from "./Operation";
import { ProcessorState } from "../ProcessorState";

/**
 * Performs an operation on two registers.
 */
export class RegisterOperation implements Operation {
	private operation: (a: number, b: number) => number;
	
	public constructor(operation: (a: number, b: number) => number) {
		this.operation = operation;
	}
	
	public execute(state: ProcessorState, numericArgs: number[], labelArgs: string[]) {
		const storage = state.getStorage();
		const dest = numericArgs[0];
		const left = numericArgs[1];
		const right = numericArgs[2];
		
		storage.setRegister(dest, this.operation(storage.getRegister(left), storage.getRegister(right)));
	}
	
	public describe(): string {
		return "Operates on two registers and places the result in a third register.";
	}
	
	public getExpectedArgCount(): number {
		return 3;
	}
}
