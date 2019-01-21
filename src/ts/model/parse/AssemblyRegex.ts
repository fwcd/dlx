/**
 * Matches a single line of assembly code.
 * 
 * * Group 1 captures the (optional) label
 * * Group 2 captures the opcode
 * * Group 3 captures the (optional) arguments
 */
export const ASM_LINE_REGEX = /^(?:(\w+):)?[ \t]*(\w+)[ \t]*([\w\(\)]+(?:,[ \t]*[\w\(\)#]+)*)?[ \t]*(?:\/.+)*$/;

/**
 * Matches an argument from a raw argument list.
 */
export const ASM_ARGUMENT_MATCH_REGEX = /[\w#]+/g;

/**
 * Matches a literal number argument.
 * 
 * * Group 1 captures the value
 */
export const ASM_LITERAL_ARGUMENT_REGEX = /^#?-?([0-9]+)$/;

/**
 * Matches a label name.
 * 
 * * Group 1 captures the value
 */
export const ASM_LABEL_REGEX = /^([A-Za-z_]\w*):?$/;

/**
 * Matches a register argument.
 * 
 * * Group 1 captures the value
 */
export const ASM_REGISTER_ARGUMENT_REGEX = /^\(?[Rr]([0-9]+)\)?$/;
