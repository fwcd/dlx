import { Instruction } from "./Instruction";
import { ProcessorState } from "../ProcessorState";

/**
 * Adds a literal to a register and places the
 * result a third register.
 */
export class AddImmediateInstruction implements Instruction {
	private dest: number;
	private left: number;
	private immediate: number;
	
	public constructor(...args: number[]) {
		this.dest = args[0];
		this.left = args[1];
		this.immediate = args[2];
	}
	
	public execute(state: ProcessorState) {
		const storage = state.getStorage();
		storage.setRegister(this.dest, storage.getRegister(this.left) + this.immediate);
	}
}
