import { Operation } from "./operations/Operation";

/**
 * A machine instruction. Corresponds to a
 * line of assembly code.
 */
export interface Instruction {
	operation: Operation,
	numericArgs: number[],
	labelArgs: string[]
}
