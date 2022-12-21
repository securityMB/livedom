// name: iframe srcdoc (scripting enabled)
class LiveDomParser {
  init() {
    this.iframe = document.createElement("iframe");
    document.body.appendChild(this.iframe);
  }

  /** @param {string} s */
  parse(s) {
    this.iframe.srcdoc = s;
    this.iframe.onload = () => display(this.iframe.contentDocument);
  }
}
