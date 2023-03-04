import hbs from "handlebars";

const template = `
<a href="../pages/404.hbs">
    <li class="chat-list__item chat-item">
        <img 
            class="chat-item__avatar"
            src="https://avatars.githubusercontent.com/u/62993219?v=4"
            alt="User avatar"
        />
        <div class="chat-item__person">
            <p class="chat-item__name">Name</p>
            <p class="chat-item__message">
                Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
            </p>
        </div>
        <div class="chat-item__info">
            <p class="chat-item__time">15:12</p>
            <p class="chat-item__unread">4</p>
        </div>
    </li>
</a>
`

hbs.registerPartial("chat-item", template);
