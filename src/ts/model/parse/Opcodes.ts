import { AddInstruction } from "../instructions/AddInstruction";
import { Instruction } from "../instructions/Instruction";
import { AddImmediateInstruction } from "../instructions/AddImmediateInstruction";

const OPCODES: { [code: string]: { new(...args: number[]): Instruction; }; } = {
	"ADD": AddInstruction,
	"ADDI": AddImmediateInstruction
};
