import { DataFormat } from "./DataFormat";

export class BinaryFormat implements DataFormat {
	public binaryWordToString(word: number): string {
		return (word >>> 0).toString(2);
	}
}
