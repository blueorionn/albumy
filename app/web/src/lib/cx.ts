/** Join class names, skipping falsy parts (clsx-lite). */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}
