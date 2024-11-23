function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(element, container) {
  // TODO
}

const NReact = {
  createElement,
}

const NReactDOM = {
  render
}


/** @jsx NReact.createElement */
const element = NReact.createElement(
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);

// const element = NReact.createElement(
//   "div",
//   { id: "foo" },
//   NReact.createElement("a", null, "bar"),
//   NReact.createElement("b")
// );

const container = document.getElementById("root");
NReactDOM.render(element, container);
