export class IDGenerator {
	private prefix: string;
	private lastID = 0;
	
	public constructor(prefix: string) {
		this.prefix = prefix;
	}
	
	public nextID(): string {
		const next = this.prefix + this.lastID;
		this.lastID++;
		return next;
	}
}
