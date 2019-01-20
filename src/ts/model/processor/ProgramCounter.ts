export class ProgramCounter {
	private index: number = 0;
	private labelIndices: { [label: string]: number; };
	private jumped = false;
	
	public constructor(labelIndices: { [label: string]: number; }) {
		this.labelIndices = labelIndices;
	}
	
	public increment(): void {
		this.index++;
	}
	
	public jumpTo(index: number): void {
		this.index = index;
		this.jumped = true;
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
}
