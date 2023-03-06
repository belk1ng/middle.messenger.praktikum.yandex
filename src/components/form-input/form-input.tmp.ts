import hbs from 'handlebars';

const template = `
<label>
    <input class="form-input"
        {{#if name}}name="{{name}}"{{/if}}
        {{#if placeholder}}placeholder="{{placeholder}}"{{/if}}
        {{#if type}}type="{{type}}"{{/if}}
    />
</label>
`

hbs.registerPartial("form-input", template);
