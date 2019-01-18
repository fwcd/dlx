/**
 * Holds all processor registers and the main memory.
 */
export class ProcessorStorage {
	private registers: Int32Array;
	private memory: Int32Array;
	private memoryStartAddress: number;
	
	public constructor(registerCount: number, memoryBytes: number, memoryStartAddress: number) {
		this.registers = new Int32Array(registerCount);
		this.memory = new Int32Array(memoryBytes);
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
	
	public getMemory(address: number): number {
		const index = address - this.memoryStartAddress;
		if (index >= 0 && index < this.memory.length) {
			return this.memory[index];
		} else {
			throw new Error("Could not read memory location with address " + address + " (index: " + index + ") which is out of bounds!");
		}
	}
	
	public setMemory(address: number, newValue: number): void {
		const index = address - this.memoryStartAddress;
		if (index >= 0 && index < this.memory.length) {
			this.memory[index] = newValue;
		} else {
			throw new Error("Could not write to memory location with address " + address + " (index: " + index + ") which is out of bounds!");
		}
	}
}
