import Block from "@core/Block/Block";
import { BlockProps } from "@core/Block/types";

class FormInput extends Block {
  constructor(props?: BlockProps) {
    super("label", props);
  }

  render() {
    return `
            <label>
                <input class="form-input"
                    {{#if name}}name="{{name}}"{{/if}}
                    {{#if placeholder}}placeholder="{{placeholder}}"{{/if}}
                    {{#if type}}type="{{type}}"{{/if}}
                />
            </label>
        `;
  }
}

export default FormInput;
