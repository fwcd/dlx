import { ListenerList, Listener } from "../utils/ListenerList";

/**
 * Holds all processor registers and the main memory.
 * Words are stored in big endian notation.
 */
export class ProcessorStorage {
	private registers: Int32Array;
	private memory: Int8Array;
	private memoryStartAddress: number;
	
	private registerListeners: { [index: number]: ListenerList<number>; } = {};
	private memoryListeners: { [address: number]: ListenerList<number>; } = {};
	
	public constructor(registerCount: number, memoryByteCount: number, memoryStartAddress: number) {
		this.registers = new Int32Array(registerCount);
		this.memory = new Int8Array(memoryByteCount);
		this.memoryStartAddress = memoryStartAddress;
	}
	
	public getRegister(index: number): number {
		if (index >= 0 && index < this.registers.length) {
			return this.registers[index];
		} else {
			throw new Error("Could not read register with index " + index + " which is out of bounds!");
		}
	}
	
	public setRegister(index: number, newValue: number, silent?: boolean): void {
		if (index > 0 && index < this.registers.length) {
			this.registers[index] = newValue;
			if (silent == null || !silent) {
				this.fireRegisterListener(index);
			}
		} else if (index == 0) {
			throw new Error("Can not write to the register at zero!");
		} else {
			throw new Error("Could not write to register with index " + index + " which is out of bounds!");
		}
	}
	
	public getMemoryByte(address: number): number {
		return this.getMemoryByteByIndex(address - this.memoryStartAddress);
	}
	
	public setMemoryByte(address: number, newValue: number): void {
		this.setMemoryByteByIndex(address - this.memoryStartAddress, newValue);
	}
	
	public getMemoryByteByIndex(index: number): number {
		if (index >= 0 && index < this.memory.length) {
			return this.memory[index];
		} else {
			throw new Error("Could not read memory location with index " + index + " which is out of bounds!");
		}
	}
	
	public setMemoryByteByIndex(index: number, newValue: number, silent?: boolean): void {
		if (index >= 0 && index < this.memory.length) {
			this.memory[index] = newValue;
			if (silent != null && !silent) {
				this.fireMemoryListener(index);
			}
		} else {
			throw new Error("Could not write to memory location with index " + index + " which is out of bounds!");
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
	
	public getRegisterCount(): number {
		return this.registers.length;
	}
	
	public getMemoryByteCount(): number {
		return this.memory.length;
	}
	
	public getMemoryWordCount(): number {
		return this.getMemoryByteCount() / 4;
	}
	
	public reset(): void {
		const registerCount = this.getRegisterCount();
		const memoryByteCount = this.getMemoryByteCount();
		
		for (let i = 0; i < registerCount; i++) {
			this.registers[i] = 0;
		}
		
		for (let i = 0; i < memoryByteCount; i++) {
			this.memory[i] = 0;
		}
	}
	
	private fireRegisterListener(index: number): void {
		this.registerListeners[index].fire(this.getRegister(index));
	}
	
	private fireMemoryListener(index: number): void {
		this.memoryListeners[index].fire(this.getRegister(index));
	}
	
	public addRegisterListener(index: number, listener: Listener<number>): void {
		if (!(index in this.registerListeners)) {
			this.registerListeners[index] = new ListenerList();
		}
		this.registerListeners[index].add(listener);
	}
	
	public removeRegisterListener(index: number, listener: Listener<number>): void {
		this.registerListeners[index].remove(listener);
	}
	
	public addMemoryByteListener(index: number, listener: Listener<number>): void {
		if (!(index in this.memoryListeners)) {
			this.memoryListeners[index] = new ListenerList();
		}
		this.memoryListeners[index].add(listener);
	}
	
	public removeMemoryByteListener(index: number, listener: Listener<number>): void {
		this.memoryListeners[index].remove(listener);
	}
}
