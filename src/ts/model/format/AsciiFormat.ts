import { DataFormat } from "./DataFormat";

export class AsciiFormat implements DataFormat {
	readonly name: string = "ASCII";
	
	public binaryToString(word: number): string {
		const asciiChars: number[] = [];
		
		for (let i = 3; i >= 0; i--) {
			asciiChars.push((word >>> (i * 8)) & 0xFF)
		}
		
		return String.fromCharCode(...asciiChars);
	}
	
	public stringToBinary(str: string): number {
		let number = 0;
		
		for (let i = 0; i < str.length; i++) {
			number |= str.charCodeAt(i) << (((str.length - 1) - i) * 8);
		}
		
		return number;
	}
}
