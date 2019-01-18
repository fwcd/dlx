import { Instruction } from "./Instruction";
import { ProcessorState } from "../ProcessorState";

/**
 * Loads a byte from memory.
 */
export class LoadByteInstruction implements Instruction {
	private dest: number;
	private offset: number;
	private addressRegister: number;
	
	public constructor(...args: number[]) {
		this.dest = args[0];
		this.offset = args[1];
		this.addressRegister = args[2];
	}
	
	public execute(state: ProcessorState) {
		const storage = state.getStorage();
		storage.setRegister(this.dest, storage.getMemoryByte(this.offset + storage.getRegister(this.addressRegister)));
	}
}
