import { BlockProps } from "src/core/Block/types";
import Block from "../../core/Block/Block";

class Button extends Block {
  constructor(props: BlockProps) {
    super("div", props);
  }

  render() {
    return `
        <button
            class="button form__button{{#if modificator}} form__button--{{modificator}}{{/if}}"
            {{#if type}}type="{{ type }}"{{/if}}
        >
            {{text}}
        </button>
        `;
  }
}

export default Button;
