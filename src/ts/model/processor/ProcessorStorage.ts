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
	private memorySizeListeners = new ListenerList<number>();
	private memoryStartAddressListeners = new ListenerList<number>();
	private registerCountListeners = new ListenerList<number>();
	
	public constructor(registerCount: number, memoryByteCount: number, memoryStartAddress: number) {
		this.registers = new Int32Array(registerCount);
		this.memory = new Int8Array(memoryByteCount);
		this.memoryStartAddress = memoryStartAddress;
	}
	
	public getRegister(index: number): number {
		if (index >= 0 && index < this.registers.length) {
			return this.registers[index];
		} else {
			throw new Error("Could not read register at index " + index + " which is out of bounds!");
		}
	}
	
	public setRegister(index: number, newValue: number, callerID?: number): void {
		if (index > 0 && index < this.registers.length) {
			this.registers[index] = newValue;
			this.fireRegisterListener(index, callerID);
		} else if (index == 0) {
			throw new Error("Can not write to the register at zero!");
		} else {
			throw new Error("Could not write to register at index " + index + " which is out of bounds!");
		}
	}
	
	private memoryIndexToAddress(index: number): number {
		return index + this.memoryStartAddress;
	}
	
	private addressToMemoryIndex(address: number): number {
		return address - this.memoryStartAddress;
	}
	
	public getMemoryByte(address: number): number {
		return this.getMemoryByteByIndex(this.addressToMemoryIndex(address));
	}
	
	public setMemoryByte(address: number, newValue: number, callerID?: number): void {
		this.setMemoryByteByIndex(this.addressToMemoryIndex(address), newValue, callerID);
	}
	
	public getMemoryByteByIndex(index: number): number {
		if (index >= 0 && index < this.memory.length) {
			return this.memory[index] & 0xFF;
		} else {
			const address = this.memoryIndexToAddress(index);
			throw new Error("Could not read memory location at address " + address + " which is out of bounds!");
		}
	}
	
	public setMemoryByteByIndex(index: number, newValue: number, callerID?: number): void {
		if (index >= 0 && index < this.memory.length) {
			this.memory[index] = newValue;
			const address = this.memoryIndexToAddress(index);
			this.fireMemoryByteListener(address, callerID);
			this.fireMemoryWordListener(address, callerID);
		} else {
			const address = this.memoryIndexToAddress(index);
			throw new Error("Could not write to memory location at address " + address + " which is out of bounds!");
		}
	}
	
	public getMemoryWord(address: number): number {
		return (this.getMemoryByte(address) << 24) | (this.getMemoryByte(address + 1) << 16) | (this.getMemoryByte(address + 2) << 8) | this.getMemoryByte(address + 3);
	}
	
	public setMemoryWord(address: number, newValue: number, callerID?: number): void {
		this.setMemoryByte(address, (newValue >>> 24) & 0xFF, callerID);
		this.setMemoryByte(address + 1, (newValue >>> 16) & 0xFF, callerID);
		this.setMemoryByte(address + 2, (newValue >>> 8) & 0xFF, callerID);
		this.setMemoryByte(address + 3, newValue & 0xFF, callerID);
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
	
	public setMemoryStartAddress(address: number): void {
		this.memoryStartAddress = address;
	}
	
	public clearRegisters(callerID?: number): void {
		const registerCount = this.getRegisterCount();
		for (let i = 0; i < registerCount; i++) {
			this.registers[i] = 0;
		}
		this.fireRegisterListeners(callerID);
	}
	
	public clearMemory(callerID?: number): void {
		const memoryByteCount = this.getMemoryByteCount();
		for (let i = 0; i < memoryByteCount; i++) {
			this.memory[i] = 0;
		}
		this.fireMemoryListeners(callerID);
	}
	
	public clear(): void {
		this.clearRegisters();
		this.clearMemory();
	}
	
	private fireRegisterListener(index: number, callerID?: number): void {
		if (index in this.registerListeners) {
			this.registerListeners[index].fire(this.getRegister(index), callerID);
		}
	}
	
	private fireMemoryByteListener(address: number, callerID?: number): void {
		if (address in this.memoryByteListeners) {
			this.memoryByteListeners[address].fire(this.getMemoryByte(address), callerID);
		}
	}
	
	private fireMemoryWordListener(address: number, callerID?: number): void {
		const wordAddress = this.addressOfWordAt(address);
		if (wordAddress in this.memoryWordListeners) {
			this.memoryWordListeners[wordAddress].fire(this.getMemoryWord(wordAddress), callerID);
		}
	}
	
	private fireRegisterListeners(callerID?: number): void {
		for (let index in this.registerListeners) {
			this.fireRegisterListener(+index, callerID);
		}
	}
	
	private fireMemoryListeners(callerID?: number): void {
		for (let address in this.memoryByteListeners) {
			this.fireMemoryWordListener(+address, callerID);
		}
		for (let address in this.memoryWordListeners) {
			this.fireMemoryWordListener(+address, callerID);
		}
	}
	
	public addRegisterListener(index: number, listener: Listener<number>, callerID?: number): void {
		if (!(index in this.registerListeners)) {
			this.registerListeners[index] = new ListenerList();
		}
		this.registerListeners[index].add(listener, callerID);
	}
	
	public removeRegisterListener(index: number, listener: Listener<number>): void {
		this.registerListeners[index].remove(listener);
	}
	
	private addressOfWordAt(byteAddress: number): number {
		return Math.floor(byteAddress / 4) * 4;
	}
	
	public addMemoryWordListener(address: number, listener: Listener<number>, callerID?: number): void {
		if (!(address in this.memoryWordListeners)) {
			this.memoryWordListeners[address] = new ListenerList();
		}
		this.memoryWordListeners[address].add(listener, callerID);
	}
	
	public removeMemoryWordListener(address: number, listener: Listener<number>): void {
		this.memoryWordListeners[address].remove(listener);
	}
	
	public addMemoryByteListener(address: number, listener: Listener<number>, callerID?: number): void {
		if (!(address in this.memoryByteListeners)) {
			this.memoryByteListeners[address] = new ListenerList();
		}
		this.memoryByteListeners[address].add(listener, callerID);
	}
	
	public removeMemoryByteListener(address: number, listener: Listener<number>): void {
		this.memoryByteListeners[address].remove(listener);
	}
	
	public addRegisterCountListener(listener: Listener<number>, callerID?: number): void {
		this.registerCountListeners.add(listener, callerID);
		listener(this.registers.length);
	}
	
	public removeRegisterCountListener(listener: Listener<number>): void {
		this.registerCountListeners.remove(listener);
	}
	
	public addMemoryStartAddressListener(listener: Listener<number>, callerID?: number): void {
		this.memoryStartAddressListeners.add(listener, callerID);
		listener(this.memoryStartAddress);
	}
	
	public removeMemoryStartAddressListener(listener: Listener<number>): void {
		this.memoryStartAddressListeners.remove(listener);
	}
	
	public addMemorySizeListener(listener: Listener<number>, callerID?: number): void {
		this.memorySizeListeners.add(listener, callerID);
		listener(this.memory.length);
	}
	
	public removeMemorySizeListener(listener: Listener<number>): void {
		this.memorySizeListeners.remove(listener);
	}
	
	public resizeMemory(bytes: number): void {
		const newMemory = new Int32Array(bytes);
		newMemory.set(this.memory);
		this.memory = newMemory;
		this.memorySizeListeners.fire(bytes);
	}
	
	public resizeRegisters(count: number): void {
		const newRegisters = new Int32Array(count);
		newRegisters.set(this.registers);
		this.registers = newRegisters;
		this.registerCountListeners.fire(count);
	}
}
