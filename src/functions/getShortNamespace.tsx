export function getShortNamespace(namespace: string) {
  switch (namespace) {
    case "http://www.w3.org/1999/xhtml":
      return "html";
    case "http://www.w3.org/2000/svg":
      return "svg";
    case "http://www.w3.org/1998/Math/MathML":
      return "math";
    default:
      return namespace;
  }
}
