import Router from "./services/route";
window.app = {};
app.router = Router;

window.addEventListener("DOMContentLoaded", () => {
  app.router.home();
  let hmb = document.getElementById("home_button");
  let mbb = document.getElementById("menu_button");
  let abb = document.getElementById("about_button");
  hmb.addEventListener("click", app.router.home);
  mbb.addEventListener("click", app.router.menu);
  abb.addEventListener("click", app.router.about);
});
