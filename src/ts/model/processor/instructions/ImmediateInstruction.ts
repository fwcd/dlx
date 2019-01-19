import { Instruction } from "./Instruction";
import { ProcessorState } from "../ProcessorState";

/**
 * Performs an operation on a register and a literal.
 */
export class ImmediateInstruction implements Instruction {
	private operation: (a: number, b: number) => number;
	
	public constructor(operation: (a: number, b: number) => number) {
		this.operation = operation;
	}
	
	public execute(state: ProcessorState, ...args: number[]) {
		const storage = state.getStorage();
		const dest = args[0];
		const left = args[1];
		const literal = args[2];
		
		storage.setRegister(dest, this.operation(storage.getRegister(left), literal));
	}
	
	public describe(): string {
		return "Operates on a value in a register and a literal. Places the result in a third register.";
	}
}
