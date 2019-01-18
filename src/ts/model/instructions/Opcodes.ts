import { ImmediateInstruction } from "./ImmediateInstruction";
import { Instruction } from "./Instruction";
import { LoadInstruction } from "./LoadInstruction";
import { RegisterInstruction } from "./RegisterInstruction";

const OPCODES: { [code: string]: Instruction; } = {
	"ADD": new RegisterInstruction((a, b) => a + b),
	"ADDI": new ImmediateInstruction((a, b) => a + b),
	"SUB": new RegisterInstruction((a, b) => a - b),
	"SUBI": new ImmediateInstruction((a, b) => a - b),
	"SLL": new RegisterInstruction((a, b) => a << b),
	"SLLI": new ImmediateInstruction((a, b) => a << b),
	"SRL": new RegisterInstruction((a, b) => a >>> b),
	"SRLI": new ImmediateInstruction((a, b) => a >>> b),
	"LW": new LoadInstruction((st, addr) => st.getMemoryWord(addr)),
	"LB": new LoadInstruction((st, addr) => st.getMemoryByte(addr))
};
