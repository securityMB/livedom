function display(...args) {
  const event = new CustomEvent("display", { detail: args });
  parent.dispatchEvent(event);
}

const parserCode = document.getElementById("parser-code").text;
const klazz = eval(`(${parserCode})`);
const instance = new klazz();
if (typeof instance.init === "function") {
  instance.init();
}
window.parser = instance;
