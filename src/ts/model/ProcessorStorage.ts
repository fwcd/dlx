/**
 * Holds all processor registers and the main memory.
 * Words are stored in big endian notation.
 */
export class ProcessorStorage {
	private registers: Int32Array;
	private memory: Int8Array;
	private memoryStartAddress: number;
	
	public constructor(registerCount: number, memoryBytes: number, memoryStartAddress: number) {
		this.registers = new Int32Array(registerCount);
		this.memory = new Int8Array(memoryBytes);
		this.memoryStartAddress = memoryStartAddress;
	}
	
	public getRegister(index: number): number {
		if (index >= 0 && index < this.registers.length) {
			return this.registers[index];
		} else {
			throw new Error("Could not read register with index " + index + " which is out of bounds!");
		}
	}
	
	public setRegister(index: number, newValue: number): void {
		if (index > 0 && index < this.registers.length) {
			this.registers[index] = newValue;
		} else if (index == 0) {
			throw new Error("Can not write to the register at zero!");
		} else {
			throw new Error("Could not write to register with index " + index + " which is out of bounds!");
		}
	}
	
	public getMemoryByte(address: number): number {
		const index = address - this.memoryStartAddress;
		if (index >= 0 && index < this.memory.length) {
			return this.memory[index];
		} else {
			throw new Error("Could not read memory location with address " + address + " (index: " + index + ") which is out of bounds!");
		}
	}
	
	public setMemoryByte(address: number, newValue: number): void {
		const index = address - this.memoryStartAddress;
		if (index >= 0 && index < this.memory.length) {
			this.memory[index] = newValue;
		} else {
			throw new Error("Could not write to memory location with address " + address + " (index: " + index + ") which is out of bounds!");
		}
	}
	
	public getMemoryWord(address: number): number {
		return (this.getMemoryByte(address) << 24) | (this.getMemoryByte(address + 1) << 16) | (this.getMemoryByte(address + 2) << 8) | this.getMemoryByte(address + 3);
	}
	
	public setMemoryWord(address: number, newValue: number): void {
		this.setMemoryByte(address, (newValue >> 24) & 0xFF);
		this.setMemoryByte(address + 1, (newValue >> 16) & 0xFF);
		this.setMemoryByte(address + 2, (newValue >> 8) & 0xFF);
		this.setMemoryByte(address + 3, newValue & 0xFF);
	}
}
