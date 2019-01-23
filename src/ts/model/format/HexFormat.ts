import { DataFormat } from "./DataFormat";

export class HexFormat implements DataFormat {
	readonly name: string = "Hex";
	
	public binaryToString(word: number): string {
		return (word >>> 0).toString(16);
	}
	
	public stringToBinary(str: string): number {
		return parseInt(str, 16);
	}
}
