import { AssemblyProgram } from "./AssemblyProgram";
import { AssemblyExecutorParams } from "./AssemblyExecutorParams";
import { Instruction } from "./Instruction";
import { ProgramCounter } from "./ProgramCounter";
import { ProcessorState } from "./ProcessorState";

/**
 * A running assembly sequence/program.
 */
export class AssemblyExecutor {
	private program: AssemblyProgram;
	private state: ProcessorState;
	private counter = new ProgramCounter();
	private halted = false;
	private instructionDelay: number;
	private messageHandler: (msg: string) => void;
	
	public constructor(params: AssemblyExecutorParams) {
		this.program = params.program;
		this.state = params.state;
		this.messageHandler = params.messageHandler;
		this.instructionDelay = this.instructionDelay || 0;
	}
	
	public run(): void {
		if (this.instructionDelay > 0 && !this.halted) {
			this.execNextInstruction();
			window.setTimeout(() => this.run(), this.instructionDelay);
		} else {
			while (!this.halted) {
				this.execNextInstruction();
			}
		}
	}
	
	public halt(): void {
		this.halted = true;
	}
	
	public execNextInstruction(): void {
		const instruction = this.getNextInstruction();
		
		instruction.operation.execute({
			counter: this.counter,
			state: this.state,
			labelArgs: instruction.labelArgs,
			numericArgs: instruction.numericArgs
		});
		this.counter.increment();
		if (this.counter.getIndex() >= this.program.instructions.length) {
			this.halt();
		}
	}
	
	private getNextInstruction(): Instruction {
		return this.program.instructions[this.counter.getIndex()];
	}
}
