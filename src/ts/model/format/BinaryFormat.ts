import { DataFormat } from "./DataFormat";

export class BinaryFormat implements DataFormat {
	readonly name: string = "Binary";
	
	public binaryToString(word: number): string {
		return (word >>> 0).toString(2);
	}
	
	public stringToBinary(str: string): number {
		return parseInt(str, 2);
	}
}
