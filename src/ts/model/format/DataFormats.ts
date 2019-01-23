import { HexFormat } from "./HexFormat";
import { DecimalFormat } from "./DecimalFormat";
import { BinaryFormat } from "./BinaryFormat";
import { OctalFormat } from "./OctalFormat";

const DATA_FORMATS = {
	"Decimal": new DecimalFormat(),
	"Hex": new HexFormat(),
	"Binary": new BinaryFormat(),
	"Octal": new OctalFormat()
};
