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
    "https://github.com/kmorhun": "Follow Me on Github~" ,
}

const ARE_WE_HOME = document.documentElement.classList.contains("home");
// console.log("ARE_WE_HOME", ARE_WE_HOME);
let nav = document.createElement("nav");
document.body.prepend(nav);

for (let url in pages) {
    let title = pages[url];
    console.log("RAW URL", url);

    // make the URL relative if you're not on the home page, or if deployed
    url = (ARE_WE_HOME || url.startsWith("https")) ? url : "../" + url;
    console.log("MODIFIED URL", url);
    let a = document.createElement("a");
    a.href = url;
    a.textContent = title;
    console.log("a.host", a.host, "location.host", location.host, "a.pathname", a.pathname, "location.pathname", location.pathname)
    if (a.host !== location.host) {
        a.target = "_blank";
    }
    if (a.host === location.host && a.pathname ===location.pathname) {
        a.classList.add("current-page");
    }
    nav.append(a);
    // nav.insertAdjacentHTML("beforeend", `<a href="${url}">${title}</a>`);


}