import hbs from "handlebars";
import template from "./chats.tmp";
import "../../components/chat-search/chat-search.tmp";
import "../../components/chat-item/chat-item.tmp";

const templateHBS = hbs.compile(template);

const data = {
  chats: ["Dmitry", "Alex", "Roman"],
};

const html = templateHBS(data);

export default html;
