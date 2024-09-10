import "./styles/style.css";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";

document.addEventListener("DOMContentLoaded", () => {
  const pathname = window.location.pathname;
  const $app = document.querySelector("#app");

  if (!$app) {
    console.error('No se encontró el elemento con id "app"');
    return;
  }

  switch (pathname) {
    case "/":
    case "/index.html":
      $app.appendChild(LoginPage());
      break;
    case "/register":
      $app.appendChild(RegisterPage());
      break;
    default:
      $app.innerHTML = "<h1>Página no encontrada</h1>";
  }
});
