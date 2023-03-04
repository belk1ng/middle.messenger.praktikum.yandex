import hbs from "handlebars";

const template = `
<a
    class="form__link{{#if modificator}} form__link--{{modificator}}{{/if}}"
    {{#if href}}href="{{href}}"{{/if}}
>
    {{text}}
</a>
`

hbs.registerPartial("link", template);
