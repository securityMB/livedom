// name: iframe (with scripts vs without scripts)
class LiveDomParser {
  init() {
    this.iframe1 = document.createElement("iframe");
    document.body.appendChild(this.iframe1);
    this.iframe2 = document.createElement("iframe");
    document.body.appendChild(this.iframe2);

    this.iframe2.sandbox = ["allow-same-origin"];
    document.body.append(this.iframe1, this.iframe2);
    this.loaded = 0;
    const onload = () => {
      this.loaded++;
      if (this.loaded < 2) return;
      displayRow(
        [this.iframe1.contentDocument ?? "", "iframe with scripts"],
        [this.iframe2.contentDocument ?? "", "iframe without scripts"]
      );
    };
    this.iframe1.onload = this.iframe2.onload = onload;
  }

  /** @param {string} s */
  parse(s) {
    this.loaded = 0;
    this.iframe1.srcdoc = s;
    this.iframe2.srcdoc = s;
  }
}
