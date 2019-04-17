/**
 * Format the current or provided time according to the format template.
 * Templating is identical to PHP date().
 */
declare function date(format: string, v?: Date): string;

/**
 * Format the current or provided time in UTC/GMT according to the format
 * template. Templating is identical to PHP date().
 */
declare function gmdate(format: string, v?: Date): string;

declare module 'phpdate' {
    export { date, gmdate };
}
