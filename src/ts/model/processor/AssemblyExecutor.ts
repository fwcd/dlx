import { AssemblyProgram } from "./AssemblyProgram";
import { AssemblyExecutorParams } from "./AssemblyExecutorParams";
import { Instruction } from "./Instruction";
import { ProgramCounter } from "./ProgramCounter";
import { ProcessorState } from "./ProcessorState";
import { ListenerList, Listener } from "../utils/ListenerList";

/**
 * A running assembly sequence/program.
 */
export class AssemblyExecutor {
	private program: AssemblyProgram;
	private state: ProcessorState;
	private counter: ProgramCounter;
	private halted = false;
	private instructionDelay: number;
	
	private messageHandler: (msg: string) => void;
	private lineListeners = new ListenerList<number>();
	
	public constructor(params: AssemblyExecutorParams) {
		this.program = params.program;
		this.state = params.state;
		this.messageHandler = params.messageHandler;
		this.instructionDelay = params.instructionDelay || 0;
		this.counter = new ProgramCounter(params.program.labelIndices);
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
		
		if (instruction == null) {
			this.halt();
		}
		
		this.lineListeners.fire(instruction.asmCodeLine);
		this.validateInstruction(instruction);
		this.counter.resetJumpFlag();
		
		instruction.operation.execute({
			counter: this.counter,
			state: this.state,
			labelArgs: instruction.labelArgs,
			numericArgs: instruction.numericArgs
		});
		
		if (!this.counter.didJump()) {
			this.counter.increment();
		}
		
		if (this.counter.getIndex() >= this.program.instructions.length) {
			this.halt();
		}
	}
	
	private validateInstruction(instruction: Instruction): void {
		instruction.labelArgs.forEach(arg => {
			if (arg == null) {
				this.messageHandler("Warning: Found label argument " + arg + " in instruction " + instruction);
			}
		});
		instruction.numericArgs.forEach(arg => {
			if (arg == null) {
				this.messageHandler("Warning: Found numeric argument " + arg + " in instruction " + instruction);
			}
		});
	}
	
	public getProgramCounter(): ProgramCounter {
		return this.counter;
	}
	
	private getNextInstruction(): Instruction {
		const instruction = this.program.instructions[this.counter.getIndex()];
		if (instruction == null) {
			this.messageHandler("Warning: No instruction found at program counter index " + this.counter.getIndex());
		}
		return instruction;
	}
	
	public isHalted(): boolean {
		return this.halted;
	}
	
	public resume(): void {
		this.halted = false;
		this.run();
	}
	
	public step(): void {
		this.execNextInstruction();
	}
	
	public addLineListener(listener: Listener<number>): void {
		this.lineListeners.add(listener);
	}
	
	public removeLineListener(listener: Listener<number>): void {
		this.lineListeners.remove(listener);
	}
}
