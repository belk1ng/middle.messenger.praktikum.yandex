import hbs from "handlebars";
import template from "./login.tmp";
import "../../components/form-input/form-input.tmp";
import "../../components/link/link.tmp";

const templateHBS = hbs.compile(template);
const html = templateHBS();

export default html;
