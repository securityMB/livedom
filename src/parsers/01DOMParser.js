// name: DOMParser
class LiveDomParser {
  init() {
    this.parser = new DOMParser();
  }

  /** @param {string} s */
  parse(s) {
    display(this.parser.parseFromString(s, "text/html"), "DOMParser");
  }
}
