const root = document.getElementById("root");
const body = document.body;

const state = {
    active: false,
}

const menu = document.createElement("a");
menu.textContent = "Клик";
menu.classList.add("Click");

root.appendChild(menu);

renderModuleMenu();
menu.addEventListener('click', () => {
    if (state.active === false) {
        const moduleMenu = document.querySelector('.ModuleMenu');
        moduleMenu.style.display = "block";
    } else {
        const moduleMenu = document.querySelector('.ModuleMenu');
        moduleMenu.style.display = "none";
    }
    state.active = !state.active;
})

document.addEventListener('click', (e) => {
    const click = document.querySelector('.Click');

    if (state.active === true) {
        const moduleMenu = document.querySelector('.ModuleMenu');
        const array = Array.from(moduleMenu.childNodes);
        if (e.target !== click &&  e.target !== moduleMenu  && e.target.tagName !== 'SPAN') {
            moduleMenu.style.display = "none";
            state.active = !state.active;
        }
    }
})

function renderModuleMenu() {
    const moduleMenu = document.createElement("div");
    moduleMenu.classList.add("ModuleMenu");
    root.appendChild(moduleMenu);

    const text = document.createElement("span");
    text.textContent = "Какой-то текст в модальном окне";
    moduleMenu.appendChild(text);

    moduleMenu.style.display = "none";
}