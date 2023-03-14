import hbs from "handlebars";
import template from "./404.tmp";
import "@components/link/link.tmp";

const templateHBS = hbs.compile(template);
const html = templateHBS({});

export default html;
