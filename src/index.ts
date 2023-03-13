import ProfilePage from "./pages/profile/profile";
import ChatsPage from "./pages/chats/chats";
import NotFoundPage from "./pages/404/404";
import ServerErrorPage from "./pages/500/500";

import { ROUTES } from "./routes";

import { renderDOM } from "./utils/renderDOM";
import LoginPageTemplate from "./pages/login/login";
import RegisterPageTemplate from "./pages/register/register";

const root = document.getElementById("root");

if (!root) {
  throw new Error("root node not found");
}

const currentPath = window.location.pathname;

if (currentPath === ROUTES.LOGIN) {
  renderDOM(LoginPageTemplate);
} else if (currentPath === ROUTES.REGISTER) {
  renderDOM(RegisterPageTemplate);
} else if (currentPath === ROUTES.PROFILE) {
  root.innerHTML = ProfilePage;
} else if (currentPath === ROUTES.CHATS) {
  root.innerHTML = ChatsPage;
} else if (currentPath === ROUTES.SERVER_ERROR) {
  root.innerHTML = ServerErrorPage;
} else {
  root.innerHTML = NotFoundPage;
}
