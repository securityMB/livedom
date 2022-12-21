// name: DOMPurify
class LiveDomParser {
  init() {
    const s = document.createElement("script");
    s.src = "https://cure53.de/purify.js";
    // s.src = 'https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.1.0/purify.min.js';
    document.head.append(s);
  }
  parse(s) {
    const sanitized = DOMPurify.sanitize(s);
    display(sanitized, "Sanitized string");
    display(
      new DOMParser().parseFromString(sanitized, "text/html"),
      "Sanitized string as DOM"
    );
  }
}
