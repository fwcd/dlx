import { AddImmediateInstruction } from "../instructions/AddImmediateInstruction";
import { AddInstruction } from "../instructions/AddInstruction";
import { Instruction } from "../instructions/Instruction";
import { LoadByteInstruction } from "../instructions/LoadByteInstruction";
import { LoadWordInstruction } from "../instructions/LoadWordInstruction";
import { SubImmediateInstruction } from "../instructions/SubImmediateInstruction";
import { SubInstruction } from "../instructions/SubInstruction";

const OPCODES: { [code: string]: { new(...args: number[]): Instruction; }; } = {
	"ADD": AddInstruction,
	"ADDI": AddImmediateInstruction,
	"SUB": SubInstruction,
	"SUBI": SubImmediateInstruction,
	"LW": LoadWordInstruction,
	"LB": LoadByteInstruction
};
