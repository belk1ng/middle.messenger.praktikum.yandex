import { BlockProps } from "src/core/Block/types";
import Block from "../../core/Block/Block";

class Button extends Block {
  constructor(props: BlockProps) {
    super("div", props);
  }

  render() {
    return `
        <button
            class="form__button {{#if class}} {{class}}{{/if}}"
            {{#if type}}type="{{ type }}"{{/if}}
        >
            {{text}}
        </button>
        `;
  }
}

export default Button;
