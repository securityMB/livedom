function display(...args) {
  const event = new CustomEvent("display", {
    detail: { args, type: "classic" },
  });
  parent.dispatchEvent(event);
}
function displayRow(...args) {
  const event = new CustomEvent("display", {
    detail: { args, type: "row" },
  });
  parent.dispatchEvent(event);
}

const parserCode = document.getElementById("parser-code").text;
try {
  const klazz = eval(`(${parserCode})`);
  const instance = new klazz();
  if (typeof instance.init === "function") {
    instance.init();
  }
  window.parser = instance;
} catch (e) {
  console.error(e);
}
