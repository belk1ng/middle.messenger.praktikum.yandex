import hbs from "handlebars";
import template from "./profile.tmp";
import "@components/profile-row/profile-row.tmp";
import "@components/separator/separator.tmp";
import "@components/link/link.tmp";

const templateHBS = hbs.compile(template);
const html = templateHBS({});

export default html;
