// name: Sanitizer API
class ClosureSanitizer {
  init() {
    this.div = document.createElement("div");
  }

  parse(s) {
    this.div.setHTML(s);
    display(this.div);
  }
}
