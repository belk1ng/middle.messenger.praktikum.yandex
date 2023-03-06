import hbs from "handlebars";

const template = `
<input class="chat-page__search" placeholder="Search..." />
`;

hbs.registerPartial("chat-search", template);
