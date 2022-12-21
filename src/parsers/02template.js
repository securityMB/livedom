// name: template.innerHTML
class LiveDomParser {
  init() {
    this.template = document.createElement("template");
  }

  /** @param {string} s */
  parse(s) {
    this.template.innerHTML = s;
    display(this.template.content);
  }
}
