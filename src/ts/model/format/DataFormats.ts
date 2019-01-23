import { HexFormat } from "./HexFormat";
import { DecimalFormat } from "./DecimalFormat";
import { BinaryFormat } from "./BinaryFormat";
import { OctalFormat } from "./OctalFormat";
import { AsciiFormat } from "./AsciiFormat";

export const DATA_FORMATS = {
	"Decimal": new DecimalFormat(),
	"Hex": new HexFormat(),
	"Binary": new BinaryFormat(),
	"Octal": new OctalFormat(),
	"ASCII": new AsciiFormat()
};
