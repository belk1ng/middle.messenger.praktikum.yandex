import LoginPage from "./pages/login/login";
import RegisterPage from "./pages/register/register";
import ProfilePage from "./pages/profile/profile";
import ChatsPage from "./pages/chats/chats";
import NotFoundPage from "./pages/404/404";
import ServerErrorPage from "./pages/500/500";

import { ROUTES } from "./routes";

const root = document.getElementById("root");

if (!root) {
  throw new Error("root node not found");
}

const currentPath = window.location.pathname;

if (currentPath === ROUTES.LOGIN) {
  root.innerHTML = LoginPage;
} else if (currentPath === ROUTES.REGISTER) {
  root.innerHTML = RegisterPage;
} else if (currentPath === ROUTES.PROFILE) {
  root.innerHTML = ProfilePage;
} else if (currentPath === ROUTES.CHATS) {
  root.innerHTML = ChatsPage;
} else if (currentPath === ROUTES.SERVER_ERROR) {
  root.innerHTML = ServerErrorPage;
} else {
  root.innerHTML = NotFoundPage;
}
