// name: Sanitizer API
class ClosureSanitizer {
  init() {
    this.available = typeof Element.prototype.setHTML === "function";
    this.div = document.createElement("div");
  }

  parse(s) {
    if (!this.available) {
      display("Your browser does not support Sanitizer API");
      return;
    }
    this.div.setHTML(s);
    display(this.div);
  }
}
