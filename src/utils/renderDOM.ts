// TODO: change block type to Block

export const render = (rootSelector: string, block: any) => {
  const root = document.querySelector(rootSelector);

  if (!root) {
    throw new Error("There are no root component");
  }

  root.appendChild(block.getContent());
  block.dispatchComponentDidMount();
};
