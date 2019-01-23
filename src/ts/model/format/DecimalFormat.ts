import { DataFormat } from "./DataFormat";

export class DecimalFormat implements DataFormat {
	readonly name: string = "Decimal";
	
	public binaryToString(word: number): string {
		return word.toString(10);
	}
	
	public stringToBinary(str: string): number {
		return parseInt(str, 10);
	}
}
