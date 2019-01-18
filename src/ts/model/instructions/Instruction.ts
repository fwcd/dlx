import { ProcessorState } from "../ProcessorState";

/**
 * A machine instruction. Corresponds to a
 * row of assembly code.
 */
export interface Instruction {
	execute(state: ProcessorState): void;
}
