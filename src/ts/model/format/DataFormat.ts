export interface DataFormat {
	name: string;
	
	binaryToString(word: number): string;
	
	stringToBinary(str: string): number;
}
