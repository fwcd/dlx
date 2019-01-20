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
	private memoryByteListeners: { [index: number]: ListenerList<number>; } = {};
	private memoryWordListeners: { [index: number]: ListenerList<number>; } = {};
	
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
	
	public setMemoryByte(address: number, newValue: number, silent?: boolean): void {
		this.setMemoryByteByIndex(address - this.memoryStartAddress, newValue, silent);
	}
	
	public getMemoryByteByIndex(index: number): number {
		if (index >= 0 && index < this.memory.length) {
			return this.memory[index] & 0xFF;
		} else {
			throw new Error("Could not read memory location with index " + index + " which is out of bounds!");
		}
	}
	
	public setMemoryByteByIndex(index: number, newValue: number, silent?: boolean): void {
		if (index >= 0 && index < this.memory.length) {
			this.memory[index] = newValue;
			if (silent == null || !silent) {
				const address = index + this.memoryStartAddress;
				this.fireMemoryByteListener(address);
				this.fireMemoryWordListener(address);
			}
		} else {
			throw new Error("Could not write to memory location with index " + index + " which is out of bounds!");
		}
	}
	
	public getMemoryWord(address: number): number {
		return (this.getMemoryByte(address) << 24) | (this.getMemoryByte(address + 1) << 16) | (this.getMemoryByte(address + 2) << 8) | this.getMemoryByte(address + 3);
	}
	
	public setMemoryWord(address: number, newValue: number, silent?: boolean): void {
		this.setMemoryByte(address, (newValue >>> 24) & 0xFF, silent);
		this.setMemoryByte(address + 1, (newValue >>> 16) & 0xFF, silent);
		this.setMemoryByte(address + 2, (newValue >>> 8) & 0xFF, silent);
		this.setMemoryByte(address + 3, newValue & 0xFF, silent);
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
	
	public getMemoryStartAddress(): number {
		return this.memoryStartAddress;
	}
	
	public clearRegisters(): void {
		const registerCount = this.getRegisterCount();
		for (let i = 0; i < registerCount; i++) {
			this.registers[i] = 0;
		}
		this.fireRegisterListeners();
	}
	
	public clearMemory(): void {
		const memoryByteCount = this.getMemoryByteCount();
		for (let i = 0; i < memoryByteCount; i++) {
			this.memory[i] = 0;
		}
		this.fireMemoryListeners();
	}
	
	public clear(): void {
		this.clearRegisters();
		this.clearMemory();
	}
	
	private fireRegisterListener(index: number): void {
		if (index in this.registerListeners) {
			this.registerListeners[index].fire(this.getRegister(index));
		}
	}
	
	private fireMemoryByteListener(address: number): void {
		if (address in this.memoryByteListeners) {
			this.memoryByteListeners[address].fire(this.getMemoryByte(address));
		}
	}
	
	private fireMemoryWordListener(address: number): void {
		const wordAddress = this.addressOfWordAt(address);
		if (wordAddress in this.memoryWordListeners) {
			this.memoryWordListeners[wordAddress].fire(this.getMemoryWord(wordAddress));
		}
	}
	
	private fireRegisterListeners(): void {
		for (let index in this.registerListeners) {
			this.fireRegisterListener(+index);
		}
	}
	
	private fireMemoryListeners(): void {
		for (let address in this.memoryByteListeners) {
			this.fireMemoryWordListener(+address);
		}
		for (let address in this.memoryWordListeners) {
			this.fireMemoryWordListener(+address);
		}
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
	
	private addressOfWordAt(byteAddress: number): number {
		return Math.floor(byteAddress / 4) * 4;
	}
	
	public addMemoryWordListener(address: number, listener: Listener<number>): void {
		if (!(address in this.memoryWordListeners)) {
			this.memoryWordListeners[address] = new ListenerList();
		}
		this.memoryWordListeners[address].add(listener);
	}
	
	public removeMemoryWordListener(address: number, listener: Listener<number>): void {
		this.memoryWordListeners[address].remove(listener);
	}
	
	public addMemoryByteListener(address: number, listener: Listener<number>): void {
		if (!(address in this.memoryByteListeners)) {
			this.memoryByteListeners[address] = new ListenerList();
		}
		this.memoryByteListeners[address].add(listener);
	}
	
	public removeMemoryByteListener(address: number, listener: Listener<number>): void {
		this.memoryByteListeners[address].remove(listener);
	}
}
