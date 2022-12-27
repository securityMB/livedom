export function asciiLowerCase(s: string) {
  return s.replace(/[A-Z]+/g, (r) => r.toLowerCase());
}
