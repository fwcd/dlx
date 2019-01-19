import { ProcessorState } from "../ProcessorState";

/**
 * A machine operation.
 */
export interface Operation {
	execute(state: ProcessorState, numericArgs: number[], labelArgs: string[]): void;
	
	getExpectedArgCount(): number;
	
	describe(): string;
}
