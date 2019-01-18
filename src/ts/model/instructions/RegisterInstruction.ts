import { Instruction } from "./Instruction";
import { ProcessorState } from "../ProcessorState";

/**
 * Performs an operation on two registers.
 */
export class RegisterInstruction implements Instruction {
	private operation: (a: number, b: number) => number;
	
	public constructor(operation: (a: number, b: number) => number) {
		this.operation = operation;
	}
	
	public execute(state: ProcessorState, ...args: number[]) {
		const storage = state.getStorage();
		const dest = args[0];
		const left = args[1];
		const right = args[2];
		
		storage.setRegister(dest, this.operation(storage.getRegister(left), storage.getRegister(right)));
	}
}
