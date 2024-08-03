const Router = {
  home: () => {
    let homePage = document.getElementById("Home");
    let menuPage = document.getElementById("Menu");
    let aboutPage = document.getElementById("About");

    homePage.classList.add("--visible");
    menuPage.classList.remove("--visible");
    aboutPage.classList.remove("--visible");
  },
  menu: () => {
    let menuPage = document.getElementById("Menu");
    let homePage = document.getElementById("Home");
    let aboutPage = document.getElementById("About");
    homePage.classList.remove("--visible");
    aboutPage.classList.remove("--visible");
    menuPage.classList.add("--visible");
  },
  about: () => {
    let aboutPage = document.getElementById("About");
    let menuPage = document.getElementById("Menu");
    let homePage = document.getElementById("Home");
    homePage.classList.remove("--visible");
    menuPage.classList.remove("--visible");
    aboutPage.classList.add("--visible");
  },
};
export default Router;
