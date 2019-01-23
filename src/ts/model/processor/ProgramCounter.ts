import { ListenerList, Listener } from "../utils/ListenerList";

export class ProgramCounter {
	// The zero-indexed (!) current line
	// in the execution flow. Note that whilst
	// line numbers are usually starting from 1,
	// the program counter will always start at 0.
	private index: number = 0;
	private labelIndices: { [label: string]: number; };
	private jumped = false;
	private listeners = new ListenerList<number>();
	
	public constructor(labelIndices: { [label: string]: number; }) {
		this.labelIndices = labelIndices;
	}
	
	public increment(): void {
		this.index++;
		this.listeners.fire(this.index);
	}
	
	public jumpTo(index: number): void {
		this.index = index;
		this.jumped = true;
		this.listeners.fire(this.index);
	}
	
	public jumpToLabel(label: string): void {
		this.jumpTo(this.labelIndices[label]);
	}
	
	public jump(indexOffset: number): void {
		this.jumpTo(this.index + indexOffset);
	}
	
	public getIndex(): number {
		return this.index;
	}
	
	public resetJumpFlag(): void {
		this.jumped = false;
	}
	
	public didJump(): boolean {
		return this.jumped;
	}
	
	public addListener(listener: Listener<number>): void {
		this.listeners.add(listener);
	}
	
	public removeListener(listener: Listener<number>): void {
		this.listeners.remove(listener);
	}
}
