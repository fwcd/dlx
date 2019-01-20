import { ImmediateOperation } from "./ImmediateOperation";
import { Operation } from "./Operation";
import { LoadOperation } from "./LoadOperation";
import { RegisterOperation } from "./RegisterOperation";
import { JumpOperation } from "./JumpOperation";
import { BranchOperation } from "./BranchOperation";

export const OPCODES: { [code: string]: Operation; } = {
	// Arithmetic
	"ADD": new RegisterOperation((a, b) => a + b),
	"ADDI": new ImmediateOperation((a, b) => a + b),
	"SUB": new RegisterOperation((a, b) => a - b),
	"SUBI": new ImmediateOperation((a, b) => a - b),
	"MULT": new RegisterOperation((a, b) => a * b),
	
	// Shifts
	"SLL": new RegisterOperation((a, b) => a << b),
	"SLLI": new ImmediateOperation((a, b) => a << b),
	"SRL": new RegisterOperation((a, b) => a >>> b),
	"SRLI": new ImmediateOperation((a, b) => a >>> b),
	"SRA": new RegisterOperation((a, b) => a >>> b),
	"SRAI": new ImmediateOperation((a, b) => a >>> b),
	
	// Comparisons
	"SLT": new RegisterOperation((a, b) => (a < b) ? 1 : 0),
	"SLTI": new ImmediateOperation((a, b) => (a < b) ? 1 : 0),
	"SLE": new RegisterOperation((a, b) => (a <= b) ? 1 : 0),
	"SLEI": new ImmediateOperation((a, b) => (a <= b) ? 1 : 0),
	"SGT": new RegisterOperation((a, b) => (a > b) ? 1 : 0),
	"SGTI": new ImmediateOperation((a, b) => (a > b) ? 1 : 0),
	"SGE": new RegisterOperation((a, b) => (a >= b) ? 1 : 0),
	"SGEI": new ImmediateOperation((a, b) => (a >= b) ? 1 : 0),
	"SEQ": new RegisterOperation((a, b) => (a === b) ? 1 : 0),
	"SEQI": new ImmediateOperation((a, b) => (a === b) ? 1 : 0),
	"SNE": new RegisterOperation((a, b) => (a !== b) ? 1 : 0),
	"SNEI": new ImmediateOperation((a, b) => (a !== b) ? 1 : 0),
	
	// Logic
	"AND": new RegisterOperation((a, b) => a & b),
	"ANDI": new ImmediateOperation((a, b) => a & b),
	"OR": new RegisterOperation((a, b) => a | b),
	"ORI": new ImmediateOperation((a, b) => a | b),
	"XOR": new RegisterOperation((a, b) => a ^ b),
	"XORI": new ImmediateOperation((a, b) => a ^ b),
	
	// Storage
	"LW": new LoadOperation((st, addr) => st.getMemoryWord(addr)),
	"LB": new LoadOperation((st, addr) => st.getMemoryByte(addr)),
	
	// Jumps
	"J": new JumpOperation(),
	
	// Branches
	"BEQZ": new BranchOperation(v => v === 0),
	"BNEZ": new BranchOperation(v => v !== 0)
};
