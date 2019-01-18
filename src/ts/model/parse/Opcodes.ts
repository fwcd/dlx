import { AddInstruction } from "../instructions/AddInstruction";
import { Instruction } from "../instructions/Instruction";
import { AddImmediateInstruction } from "../instructions/AddImmediateInstruction";
import { SubInstruction } from "../instructions/SubInstruction";
import { SubImmediateInstruction } from "../instructions/SubImmediateInstruction";
import { LoadWordInstruction } from "../instructions/LoadWordInstruction";
import { LoadByteInstruction } from "../instructions/LoadByteInstruction";

const OPCODES: { [code: string]: { new(...args: number[]): Instruction; }; } = {
	"ADD": AddInstruction,
	"ADDI": AddImmediateInstruction,
	"SUB": SubInstruction,
	"SUBI": SubImmediateInstruction,
	"LW": LoadWordInstruction,
	"LB": LoadByteInstruction
};
