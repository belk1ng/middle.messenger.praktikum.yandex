import hbs from "handlebars";

const template = `
<li class="profile__row">
    <p class="profile__field">{{field}}</p>
    <p class="profile__value">{{value}}</p>
</li>

`

hbs.registerPartial("profile-row", template);
