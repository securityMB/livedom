// name: iframe srcdoc (scripting disabled)
class LiveDomParser {
  init() {
    this.iframe = document.createElement("iframe");
    this.iframe.setAttribute("sandbox", "allow-same-origin");
    document.body.append(this.iframe);
  }

  /** @param {string} s */
  parse(s) {
    this.iframe.srcdoc = s;
    this.iframe.onload = () => display(this.iframe.contentDocument);
  }
}
