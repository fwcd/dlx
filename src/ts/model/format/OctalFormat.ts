import { DataFormat } from "./DataFormat";

export class OctalFormat implements DataFormat {
	public binaryWordToString(word: number): string {
		return (word >>> 0).toString(8);
	}
}
