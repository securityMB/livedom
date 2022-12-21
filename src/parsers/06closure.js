// name: Closure Sanitizer
class ClosureSanitizer {
  init() {
    const iframe = (this.iframe = document.createElement("iframe"));
    iframe.srcdoc = `
      <script src=https://google.github.io/closure-library/source/closure/goog/base.js><\/script>
      <script>
        goog.require('goog.html.sanitizer.HtmlSanitizer');
        goog.require('goog.dom');
      <\/script>`;
    document.body.append(iframe);
  }

  parse(s) {
    const goog = this.iframe.contentWindow.goog;
    const sanitizer = new goog.html.sanitizer.HtmlSanitizer.Builder().build();
    const sanitized = sanitizer.sanitize(s);
    const node = goog.dom.safeHtmlToNode(sanitized);
    display(node);
  }
}
