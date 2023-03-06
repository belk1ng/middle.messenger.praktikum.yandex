import LoginPage from "./pages/login/login";
import RegisterPage from "./pages/register/register";
import ProfilePage from "./pages/profile/profile";
import ChatsPage from "./pages/chats/chats";
import NotFoundPage from "./pages/404/404";
import ServerErrorPage from "./pages/500/500";

import routes from "./routes";

const root = document.getElementById("root");

if (!root) {
  throw new Error("root node not found");
}

const currentPath = window.location.pathname;

if (currentPath === routes.login) {
  root.innerHTML = LoginPage;
} else if (currentPath === routes.register) {
  root.innerHTML = RegisterPage;
} else if (currentPath === routes.profile) {
  root.innerHTML = ProfilePage;
} else if (currentPath === routes.chats) {
  root.innerHTML = ChatsPage;
} else if (currentPath === routes.error) {
  root.innerHTML = ServerErrorPage;
} else {
  root.innerHTML = NotFoundPage;
}
