console.log("IT’S ALIVE!");

function $$ (selector, context = document) {
	return Array.from(context.querySelectorAll(selector));
}

// let navLinks = $$("nav a")
// let currentLink = navLinks.find(a => a.host === location.host && a.pathname === location.pathname)

// // add css styling class, as long as currentLink is not undefined
// currentLink?.classList.add("current-page")

let pages = {
    "": "Home",
    "projects/": "Projects",
    "cv/": "CV",
    "contact/": "Contact",

}

const ARE_WE_HOME = document.documentElement.classList.contains("home");
let nav = document.createElement("nav");
document.body.prepend(nav);

for (let url in pages) {
    let title = pages[url];
    url = (ARE_WE_HOME && !url.startsWith("http") && !url.startsWith("localhost")) ? url : "../" + url;
    nav.insertAdjacentHTML("beforeend", `<a href="${url}">${title}</a>`);
}