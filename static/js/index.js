const searchInput = document.getElementById("nav_search");
const searchIcon = document.getElementById("search-btn");
const main = document.querySelector("main");
const mainChildren = [];

for (const c of main.children) {
    mainChildren.push(c.cloneNode(true));
}

searchIcon?.addEventListener("click", search);
searchInput?.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        search();
        return;
    }

    debounce((ev) => {
        search();
    }, 250)();
});

function search() {
    if (!searchInput) return;

    main.innerHTML = "";

    if (searchInput.value === "") {
        for (const c of mainChildren) {
            main.appendChild(c);
        }
        return;
    }

    for (const c of mainChildren) {
        if (
            c.innerHTML.toLowerCase().includes(searchInput.value.toLowerCase())
        ) {
            main.appendChild(c);
        }
    }
}

function debounce(callback, wait) {
    let timeoutId = null;
    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
            callback.apply(null, args);
        }, wait);
    };
}
