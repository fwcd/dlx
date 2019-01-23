import { DataFormat } from "./DataFormat";

export class DecimalFormat implements DataFormat {
	public binaryWordToString(word: number): string {
		return word.toString(10);
	}
}
