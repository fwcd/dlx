import { AssemblyProgram } from "./AssemblyProgram";
import { ProcessorState } from "./ProcessorState";
import { BreakpointManager } from "../debugger/BreakpointManager";

export interface AssemblyExecutorParams {
	program: AssemblyProgram;
	state: ProcessorState;
	instructionDelay?: number;
	messageHandler: (msg: string) => void;
	breakpoints: BreakpointManager;
}
