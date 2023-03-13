import Block from "src/core/Block/Block";

export const renderDOM = (block: Block) => {
  const root = document.querySelector("#root");

  if (!root) {
    throw new Error("There are no root component");
  }

  root.appendChild(block.getContent());
  block.dispatchComponentDidMount();
};
