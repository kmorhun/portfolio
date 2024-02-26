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
    // console.log("RAW URL", url);

    // make the URL relative if you're not on the home page, or if deployed
    url = (ARE_WE_HOME || url.startsWith("https")) ? url : "../" + url;
    // console.log("MODIFIED URL", url);
    let a = document.createElement("a");
    a.href = url;
    a.textContent = title;
    // console.log("a.host", a.host, "location.host", location.host, "a.pathname", a.pathname, "location.pathname", location.pathname)
    if (a.host !== location.host) {
        a.target = "_blank";
    }
    if (a.host === location.host && a.pathname ===location.pathname) {
        a.classList.add("current-page");
    }
    nav.append(a);
    // nav.insertAdjacentHTML("beforeend", `<a href="${url}">${title}</a>`);
}

// add the light/dark mode toggle
document.body.insertAdjacentHTML("afterbegin", 
    `
    <label class="switch">
        Theme:
        <select>
            <option value="light dark">Automatic</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
        </select>
    </label>
    `
);

// set the color scheme to the user's preference
if (localStorage.colorScheme) {
    document.documentElement.style.setProperty("color-scheme", localStorage.colorScheme);
    document.querySelector("select").value = localStorage.colorScheme;
}

let select = document.querySelector("select");
select.addEventListener("input", function (event) {
    // console.log("color scheme changed to", event.target.value);
    document.documentElement.style.setProperty("color-scheme", event.target.value);
    localStorage.colorScheme = event.target.value;
});

// intercept the contact form
let contact_form = document.querySelector("form");
contact_form?.addEventListener("submit", function (event) {
    // prevent the default submission
    event.preventDefault();
    let data = new FormData(contact_form);
    let url = contact_form.action + "?"
    for (let [name, value] of data) {
        url += `${name}=${encodeURIComponent(value)}&`;
        // console.log(name, encodeURIComponent(value));
    }
    location.href = url;
});