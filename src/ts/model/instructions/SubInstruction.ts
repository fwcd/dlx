import { Instruction } from "./Instruction";
import { ProcessorState } from "../ProcessorState";

/**
 * Performs subtraction on two registers and places the
 * result a third register.
 */
export class SubInstruction implements Instruction {
	private dest: number;
	private left: number;
	private right: number;
	
	public constructor(...args: number[]) {
		this.dest = args[0];
		this.left = args[1];
		this.right = args[2];
	}
	
	public execute(state: ProcessorState) {
		const storage = state.getStorage();
		storage.setRegister(this.dest, storage.getRegister(this.left) - storage.getRegister(this.right));
	}
}
