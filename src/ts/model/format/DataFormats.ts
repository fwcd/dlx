import { HexFormat } from "./HexFormat";
import { DecimalFormat } from "./DecimalFormat";
import { BinaryFormat } from "./BinaryFormat";
import { OctalFormat } from "./OctalFormat";
import { AsciiFormat } from "./AsciiFormat";
import { DataFormat } from "./DataFormat";

export const DATA_FORMATS: { [formatKey: string]: DataFormat } = {
	"dec": new DecimalFormat(),
	"hex": new HexFormat(),
	"bin": new BinaryFormat(),
	"oct": new OctalFormat(),
	"ascii": new AsciiFormat()
};
