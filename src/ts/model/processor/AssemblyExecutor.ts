import { AssemblyProgram } from "./AssemblyProgram";
import { AssemblyExecutorParams } from "./AssemblyExecutorParams";
import { Instruction } from "./Instruction";
import { ProgramCounter } from "./ProgramCounter";
import { ProcessorState } from "./ProcessorState";
import { ListenerList, Listener } from "../utils/ListenerList";
import { BreakpointManager } from "../debugger/BreakpointManager";

/**
 * A running assembly sequence/program.
 */
export class AssemblyExecutor {
	private program: AssemblyProgram;
	private breakpoints: BreakpointManager;
	private state: ProcessorState;
	private counter: ProgramCounter;
	private paused = false;
	private stopped = false;
	private instructionDelay: number;
	
	private messageHandler: (msg: string) => void;
	private pausedListeners = new ListenerList<boolean>();
	private lineListeners = new ListenerList<number>();
	
	public constructor(params: AssemblyExecutorParams) {
		this.program = params.program;
		this.state = params.state;
		this.messageHandler = params.messageHandler;
		this.instructionDelay = params.instructionDelay || 0;
		this.counter = new ProgramCounter(params.program.labelIndices);
		this.breakpoints = params.breakpoints;
	}
	
	public run(): void {
		if (this.instructionDelay > 0 && !this.paused) {
			this.execNextInstruction();
			window.setTimeout(() => this.run(), this.instructionDelay);
		} else {
			while (!this.paused) {
				this.execNextInstruction();
			}
		}
	}
	
	public pause(): void {
		this.paused = true;
		this.pausedListeners.fire(true);
	}
	
	public stop(): void {
		this.pause();
		this.stopped = true;
		this.lineListeners.fire(-1);
	}
	
	public execNextInstruction(): void {
		const instruction = this.getNextInstruction();
		
		if (instruction == null) {
			this.messageHandler("Warning: No instruction found at program counter index " + this.counter.getIndex());
			this.pause();
		} else {
			this.validateInstruction(instruction);
			this.counter.resetJumpFlag();
			
			try {
				const result = instruction.operation.execute({
					counter: this.counter,
					state: this.state,
					labelArgs: instruction.labelArgs,
					numericArgs: instruction.numericArgs
				});
			
				if (!this.counter.didJump()) {
					this.counter.increment();
				}
				
				const reachedEnd = this.counter.getIndex() >= this.program.instructions.length;
				const shouldHalt = ((result.shouldHalt == null) ? false : result.shouldHalt);
				
				if (shouldHalt) {
					this.pause();
				}
				
				if (reachedEnd) {
					this.stop();
				}
				
				const nextInstruction = this.getNextInstruction();
				if (nextInstruction != null) {
					this.lineListeners.fire(nextInstruction.asmCodeLine);
					if (this.breakpoints.shouldBreakAt(nextInstruction.asmCodeLine)) {
						this.pause();
					}
				}
			} catch (err) {
				if (err instanceof Error) {
					this.messageHandler(err.name + ": " + err.message);
				}
				this.pause();
			}
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
		return this.program.instructions[this.counter.getIndex()];
	}
	
	public isHalted(): boolean {
		return this.paused;
	}
	
	public isStopped(): boolean {
		return this.stopped;
	}
	
	public resume(): void {
		this.paused = false;
		this.pausedListeners.fire(false);
		this.run();
	}
	
	public step(): void {
		this.execNextInstruction();
	}
	
	public addLineListener(listener: Listener<number>): void {
		this.lineListeners.add(listener);
		const instruction = this.getNextInstruction();
		if (instruction != null) {
			listener(instruction.asmCodeLine);
		}
	}
	
	public removeLineListener(listener: Listener<number>): void {
		this.lineListeners.remove(listener);
	}
	
	public addPausedListener(listener: Listener<boolean>): void {
		this.pausedListeners.add(listener);
		listener(this.paused);
	}
	
	public removePausedListener(listener: Listener<boolean>): void {
		this.pausedListeners.remove(listener);
	}
}
