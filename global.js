console.log("IT’S ALIVE!");

function $$ (selector, context = document) {
	return Array.from(context.querySelectorAll(selector));
}

let navLinks = $$("nav a")
let currentLink = navLinks.find(a => a.host === location.host && a.pathname === location.pathname)

// add css styling class, as long as currentLink is not undefined
currentLink?.classList.add("current-page")