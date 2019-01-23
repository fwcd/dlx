import { DataFormat } from "./DataFormat";

export class AsciiFormat implements DataFormat {
	public binaryWordToString(word: number): string {
		const asciiChars: number[] = [];
		
		for (let i = 4; i >= 0; i--) {
			asciiChars.push((word >>> i) & 1)
		}
		
		return String.fromCharCode(...asciiChars);
	}
}
