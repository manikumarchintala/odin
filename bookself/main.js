document.addEventListener("DOMContentLoaded", () => {
  let arr = [];
  class Books {
    constructor(id, name, author, pages, read) {
      this.id = id;
      this.name = name;
      this.author = author;
      this.pages = pages;
      this.read = read;
    }
  }
  let formde = document.getElementById("shelf");
  formde.addEventListener("submit", (e) => {
    e.preventDefault();
  });
  let formdet = document.getElementById("add");
  formdet.addEventListener("click", () => {
    let name = document.getElementById("title").value;
    let auth = document.getElementById("author").value;
    let pageNum = document.getElementById("nums").value;
    let read = document.getElementById("read").value;
    if (name && auth && pageNum && read) {
      arr.push(new Books(arr.length, name, auth, pageNum, read));
      document.getElementById("maingrid").innerHTML = "";
      creatingElem();
      document.getElementById("title").value = "";
      document.getElementById("author").value = "";
      document.getElementById("nums").value = "";
      document.getElementById("read").value = "";
    }
    console.log(arr);
  });
  function creatingElem() {
    //GETTING Refernce to the id to append items;
    arr.forEach((elem) => {
      let maingrid = document.getElementById("maingrid");
      let subgrid = document.createElement("div");
      subgrid.setAttribute("class", "subgrid");
      let tittle = document.createElement("h3");
      tittle.innerText = elem.name;
      let authie = document.createElement("h4");
      authie.innerText = elem.author;
      let pagess = document.createElement("p");
      pagess.innerText = elem.pages;
      let reader = document.createElement("p");
      reader.innerText = elem.read;
      let but = document.createElement("button");
      but.setAttribute("class", "rmv");
      but.setAttribute("id", "rmv");
      but.innerText = "Remove!!";
      maingrid.appendChild(subgrid);
      subgrid.appendChild(tittle);
      subgrid.appendChild(authie);
      subgrid.appendChild(pagess);
      subgrid.appendChild(reader);
      subgrid.append(but);
    });
  }
  //   function removeElement() {
  let maingrid = document.getElementById("maingrid");
  maingrid.addEventListener("click", (event) => {
    const item = event.target.closest(".subgrid");
    maingrid.removeChild(item);
  });
  //   }

  //dont change these brackets
});
