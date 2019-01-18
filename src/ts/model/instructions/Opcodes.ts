import { ImmediateInstruction } from "./ImmediateInstruction";
import { Instruction } from "./Instruction";
import { LoadInstruction } from "./LoadInstruction";
import { RegisterInstruction } from "./RegisterInstruction";

export const OPCODES: { [code: string]: Instruction; } = {
	// Arithmetic
	"ADD": new RegisterInstruction((a, b) => a + b),
	"ADDI": new ImmediateInstruction((a, b) => a + b),
	"SUB": new RegisterInstruction((a, b) => a - b),
	"SUBI": new ImmediateInstruction((a, b) => a - b),
	"MULT": new RegisterInstruction((a, b) => a * b),
	
	// Shifts
	"SLL": new RegisterInstruction((a, b) => a << b),
	"SLLI": new ImmediateInstruction((a, b) => a << b),
	"SRL": new RegisterInstruction((a, b) => a >>> b),
	"SRLI": new ImmediateInstruction((a, b) => a >>> b),
	"SRA": new RegisterInstruction((a, b) => a >>> b),
	"SRAI": new ImmediateInstruction((a, b) => a >>> b),
	
	// Comparisons
	"SLT": new RegisterInstruction((a, b) => (a < b) ? 1 : 0),
	"SLTI": new ImmediateInstruction((a, b) => (a < b) ? 1 : 0),
	"SLE": new RegisterInstruction((a, b) => (a <= b) ? 1 : 0),
	"SLEI": new ImmediateInstruction((a, b) => (a <= b) ? 1 : 0),
	"SEQ": new RegisterInstruction((a, b) => (a === b) ? 1 : 0),
	"SEQI": new ImmediateInstruction((a, b) => (a === b) ? 1 : 0),
	"SNE": new RegisterInstruction((a, b) => (a !== b) ? 1 : 0),
	"SNEI": new ImmediateInstruction((a, b) => (a !== b) ? 1 : 0),
	
	// Logic
	"AND": new RegisterInstruction((a, b) => a & b),
	"ANDI": new ImmediateInstruction((a, b) => a & b),
	"OR": new RegisterInstruction((a, b) => a | b),
	"ORI": new ImmediateInstruction((a, b) => a | b),
	"XOR": new RegisterInstruction((a, b) => a ^ b),
	"XORI": new ImmediateInstruction((a, b) => a ^ b),
	
	// Storage
	"LW": new LoadInstruction((st, addr) => st.getMemoryWord(addr)),
	"LB": new LoadInstruction((st, addr) => st.getMemoryByte(addr))
};
