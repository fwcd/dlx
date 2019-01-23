import { DataFormat } from "./DataFormat";

export class OctalFormat implements DataFormat {
	readonly name: string = "Octal";
	
	public binaryToString(word: number): string {
		return (word >>> 0).toString(8);
	}
	
	public stringToBinary(str: string): number {
		return parseInt(str, 8);
	}
}
