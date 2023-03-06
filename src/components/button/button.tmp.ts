import hbs from "handlebars";

const template = `
<button
    class="form__button{{#if modificator}} form__button--{{modificator}}{{/if}}"
>
    {{text}}
</button>
`;

hbs.registerPartial("button", template);
