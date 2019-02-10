import { DataFormat } from "./DataFormat";

export class FloatFormat implements DataFormat {
	readonly name: string = "Float";
	
	public binaryToString(word: number): string {
		const intBuffer = new Int32Array(1);
		intBuffer[0] = word;
		return new Float32Array(intBuffer.buffer)[0].toString(10);
	}
	
	public stringToBinary(str: string): number {
		const floatBuffer = new Float32Array(1);
		floatBuffer[0] = parseFloat(str);
		return new Int32Array(floatBuffer.buffer)[0]
	}
}
