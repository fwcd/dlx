import { Instruction } from "./Instruction";

/**
 * A sequence of machine instructions and
 * labels.
 */
export interface AssemblyProgram {
	labelIndices: { [label: string]: number; };
	instructions: Instruction[];
}
