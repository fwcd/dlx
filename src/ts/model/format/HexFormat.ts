import { DataFormat } from "./DataFormat";

export class HexFormat implements DataFormat {
	public binaryWordToString(word: number): string {
		return (word >>> 0).toString(16);
	}
}
