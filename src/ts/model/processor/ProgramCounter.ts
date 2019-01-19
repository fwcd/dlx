export class ProgramCounter {
	private index: number;
	
	public increment(): void {
		this.index++;
	}
	
	public jumpTo(index: number): void {
		this.index = index;
	}
	
	public jump(indexOffset: number): void {
		this.index += indexOffset;
	}
	
	public getIndex(): number {
		return this.index;
	}
}
