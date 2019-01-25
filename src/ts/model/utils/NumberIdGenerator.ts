export class NumberIdGenerator {
	private index = 10000;
	
	public nextID(): number {
		const id = this.index;
		this.index++;
		return id;
	}
}

export const CALLER_ID_GENERATOR = new NumberIdGenerator();
